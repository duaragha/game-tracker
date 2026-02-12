"""
Scrape IGN purple coin pages - extract structured WikiPageElement data.
Each section has: heading (coin range) -> image -> description paragraph
"""
import subprocess, re, json, sys, html as html_mod

sys.stdout.reconfigure(encoding='utf-8')

kingdoms = {
    'sand': ('Sand_Kingdom_Purple_Coins', 'Sand Kingdom'),
    'wooded': ('Wooded_Kingdom_Purple_Coins', 'Wooded Kingdom'),
    'metro': ('Metro_Kingdom_Purple_Coins', 'Metro Kingdom'),
    'luncheon': ('Luncheon_Kingdom_Purple_Coins', 'Luncheon Kingdom'),
    'bowsers': ("Bowser%27s_Kingdom_Purple_Coins", "Bowser's Kingdom"),
    'mushroom': ('Mushroom_Kingdom_Purple_Coins', 'Mushroom Kingdom'),
}

def fetch_page(page_name):
    url = f'https://www.ign.com/wikis/super-mario-odyssey/{page_name}'
    r = subprocess.run(
        ['curl', '-s', '-L', '-A',
         'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
         url],
        capture_output=True
    )
    return r.stdout.decode('utf-8', errors='ignore')

def strip_html(text):
    """Remove HTML tags and decode entities."""
    text = re.sub(r'<[^>]+>', '', text)
    text = html_mod.unescape(text)
    text = text.replace('\n', ' ').strip()
    return text

def extract_sections(page_html, kingdom_display_name):
    """Extract coin sections from WikiPageElement JSON structure."""
    sections = []

    # The page contains WikiPageElement objects in a JSON array
    # Find all WikiPageElement blocks
    elements = re.findall(
        r'\{"__typename":"WikiPageElement","name":"(\w+)","values":(\{[^}]*\}|\[[^\]]*\])',
        page_html
    )

    # Actually, the JSON is more complex. Let me find each section by looking for
    # heading patterns followed by image and paragraph patterns

    # Strategy: Find all coin headings, then for each, find the next image and paragraph
    heading_pattern = rf'{re.escape(kingdom_display_name)}.*?Coins?\s*(\d+)[-\u2013](\d+)'

    # Find all h2/h3 headings with coin ranges
    heading_regex = r'"html":"\\u003ch[23]\\u003e.*?Coins?\s*(\d+)[-\\u2013](\d+).*?\\u003c/h[23]\\u003e"'
    heading_matches = list(re.finditer(heading_regex, page_html))

    if not heading_matches:
        # Try simpler pattern
        heading_regex = r'Coins?\s*(\d+)[-\u2013–](\d+).*?\\u003c/h[23]\\u003e'
        heading_matches = list(re.finditer(heading_regex, page_html))

    # Deduplicate by coin range
    seen = set()
    unique_headings = []
    for m in heading_matches:
        coin_start = int(m.group(1))
        coin_end = int(m.group(2))
        key = (coin_start, coin_end)
        if key not in seen:
            seen.add(key)
            unique_headings.append((m, coin_start, coin_end))

    print(f"  Found {len(unique_headings)} unique coin headings")

    for i, (m, coin_start, coin_end) in enumerate(unique_headings):
        count = coin_end - coin_start + 1
        section_pos = m.end()

        # Determine end of this section (next heading or end)
        if i + 1 < len(unique_headings):
            section_end = unique_headings[i + 1][0].start()
        else:
            section_end = min(section_pos + 5000, len(page_html))

        section_text = page_html[section_pos:section_end]

        # Find image in this section - try multiple patterns
        # Pattern 1: "original":"url" (most kingdoms)
        img_match = re.search(
            r'"original":"(https://oyster\.ignimgs\.com/mediawiki/apis\.ign\.com/super-mario-odyssey/[^"]+\.(?:jpg|png))"',
            section_text
        )
        image_url = img_match.group(1) if img_match else None

        # Pattern 2: src="url" inline images (Mushroom Kingdom)
        if not image_url:
            img_match = re.search(
                r'src=(?:\\"|")(https://oyster\.ignimgs\.com/mediawiki/apis\.ign\.com/super-mario-odyssey/[^"\\]+\.(?:jpg|png))(?:\?[^"\\]*)?(?:\\"|")',
                section_text
            )
            image_url = img_match.group(1) if img_match else None

        # Skip map/overview images
        if image_url:
            fname = image_url.split('/')[-1].lower()
            if any(skip in fname for skip in ['coinmap', 'kingdom1', 'kingdom2b', 'kingdomcoins', 'mushroomkingdom']):
                # Try next image with both patterns
                remaining = section_text[img_match.end():]
                img2 = re.search(
                    r'(?:"original"|src=(?:\\"|"))(https://oyster\.ignimgs\.com/mediawiki/apis\.ign\.com/super-mario-odyssey/[^"\\]+\.(?:jpg|png))',
                    remaining
                )
                image_url = img2.group(1) if img2 else None

        # Find description paragraph
        # Pattern: "html":"\\u003cp\\u003e...text...\\u003c/p\\u003e"
        desc_matches = re.findall(
            r'"html":"(\\u003cp\\u003e.*?\\u003c/p\\u003e)"',
            section_text
        )

        description = ''
        for dm in desc_matches:
            # Decode unicode escapes
            decoded = dm.encode().decode('unicode_escape')
            text = strip_html(decoded)
            # Skip checkbox lines and very short text
            if text and len(text) > 15 and 'checkbox' not in text.lower() and 'Coins' not in text[:20]:
                description = text
                break

        if not description:
            description = f'Coins {coin_start}-{coin_end}'

        # Clean up description - truncate if needed
        if len(description) > 250:
            # Find last sentence within limit
            truncated = description[:250]
            last_period = truncated.rfind('.')
            if last_period > 100:
                description = truncated[:last_period + 1]
            else:
                description = truncated + '...'

        sections.append({
            'start': coin_start,
            'end': coin_end,
            'count': count,
            'guide': description,
            'imageUrl': image_url
        })

    return sections

results = {}
for kid, (page, display_name) in kingdoms.items():
    print(f"\n{'='*60}")
    print(f"Processing: {kid} ({display_name})")
    page_html = fetch_page(page)
    print(f"  Page size: {len(page_html)} bytes")

    if len(page_html) < 50000:
        print(f"  WARNING: Page too small, likely JS-rendered only")
        continue

    sections = extract_sections(page_html, display_name)

    if sections:
        results[kid] = sections
        total_coins = sum(s['count'] for s in sections)
        imgs_found = sum(1 for s in sections if s['imageUrl'])
        print(f"  Total coins: {total_coins}")
        print(f"  Sections: {len(sections)}, with images: {imgs_found}")
        for s in sections[:5]:
            guide_preview = s['guide'][:80]
            img_preview = s['imageUrl'][:60] + '...' if s['imageUrl'] else 'None'
            print(f"    [{s['start']}-{s['end']}] ({s['count']}): {guide_preview}")
            print(f"      img: {img_preview}")
    else:
        print(f"  No sections extracted!")

# Save results
with open('C:/Users/ragha/Projects/game-tracker/ign_full_data.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print(f"\n\nSaved {len(results)} kingdoms to ign_full_data.json")
