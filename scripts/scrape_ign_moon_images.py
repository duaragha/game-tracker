"""
Scrape IGN power moon pages to extract 2 images per moon.
Each individual moon page has an 'image' entity in __NEXT_DATA__ JSON
containing typically 2 images (location + collection screenshots).
"""
import subprocess, re, json, sys, time, os
from urllib.parse import quote

sys.stdout.reconfigure(encoding='utf-8')

KINGDOMS = {
    'sand': ('Sand_Kingdom_Power_Moons', 'Sand_Kingdom_Power_Moon'),
    'wooded': ('Wooded_Kingdom_Power_Moons', 'Wooded_Kingdom_Power_Moon'),
    'metro': ('Metro_Kingdom_Power_Moons', 'Metro_Kingdom_Power_Moon'),
    'seaside': ('Seaside_Kingdom_Power_Moons', 'Seaside_Kingdom_Power_Moon'),
    'luncheon': ('Luncheon_Kingdom_Power_Moons', 'Luncheon_Kingdom_Power_Moon'),
    'bowsers': ("Bowser%27s_Kingdom_Power_Moons", "Bowser%27s_Kingdom_Power_Moon"),
    'moon': ('Moon_Kingdom_Power_Moons', 'Moon_Kingdom_Power_Moon'),
    'mushroom': ('Mushroom_Kingdom_Power_Moons', 'Mushroom_Kingdom_Power_Moon'),
    'darkside': ('Dark_Side_Power_Moons', 'Dark_Side_Power_Moon'),
}

OUTPUT_FILE = 'C:/Users/ragha/Projects/game-tracker/scripts/ign_moon_images.json'


def fetch_page(url):
    """Fetch a page via curl."""
    r = subprocess.run(
        ['curl', '-s', '-L', '-A',
         'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
         url],
        capture_output=True, timeout=30
    )
    return r.stdout.decode('utf-8', errors='ignore')


def extract_next_data(html):
    """Extract __NEXT_DATA__ JSON from HTML."""
    start = html.find('__NEXT_DATA__')
    if start < 0:
        return None
    json_start = html.find('>', start) + 1
    json_end = html.find('</script>', json_start)
    try:
        return json.loads(html[json_start:json_end])
    except json.JSONDecodeError:
        return None


def get_moon_urls_from_listing(listing_html, kingdom_prefix):
    """Extract individual moon page URLs from a kingdom listing page."""
    data = extract_next_data(listing_html)
    if not data:
        return []

    entities = data['props']['pageProps']['page']['page'].get('htmlEntities', [])
    urls = {}  # moon_number -> url

    for el in entities:
        vals = el.get('values', {})
        html_val = vals.get('html', '') if isinstance(vals, dict) else ''

        # Find links to individual moon pages
        for m in re.finditer(r'href="(/wikis/super-mario-odyssey/[^"]*Power_Moon[^"]*)"', html_val):
            url = m.group(1)
            # Extract moon number
            num_match = re.search(r'Power_Moon_(\d+)', url)
            if num_match:
                num = int(num_match.group(1))
                if num not in urls:
                    urls[num] = url

    return urls


def get_images_from_moon_page(html):
    """Extract image URLs from an individual moon page."""
    data = extract_next_data(html)
    if not data:
        return []

    entities = data['props']['pageProps']['page']['page'].get('htmlEntities', [])
    images = []

    for el in entities:
        if el.get('name') == 'image':
            vals = el.get('values', {})
            if isinstance(vals, list):
                for v in vals:
                    if isinstance(v, dict) and 'src' in v:
                        # Get the highest quality URL (original without width param)
                        src = v['src']
                        # Remove width parameter for full resolution
                        clean = re.sub(r'\?width=\d+', '', src)
                        images.append(clean)
            elif isinstance(vals, dict) and 'src' in vals:
                src = vals['src']
                clean = re.sub(r'\?width=\d+', '', src)
                images.append(clean)

    return images


def main():
    all_results = {}

    # Load existing results if any (for resuming)
    if os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
            all_results = json.load(f)
        print(f"Loaded existing results with {len(all_results)} kingdoms")

    for kingdom_id, (listing_page, moon_prefix) in KINGDOMS.items():
        if kingdom_id in all_results:
            print(f"\n{'='*60}")
            print(f"SKIPPING {kingdom_id} (already scraped {len(all_results[kingdom_id])} moons)")
            continue

        print(f"\n{'='*60}")
        print(f"Processing kingdom: {kingdom_id}")
        print(f"  Fetching listing page: {listing_page}")

        listing_url = f'https://www.ign.com/wikis/super-mario-odyssey/{listing_page}'
        listing_html = fetch_page(listing_url)

        if len(listing_html) < 10000:
            print(f"  WARNING: Listing page too small ({len(listing_html)} bytes)")
            continue

        moon_urls = get_moon_urls_from_listing(listing_html, moon_prefix)
        print(f"  Found {len(moon_urls)} unique moon pages")

        kingdom_results = {}
        sorted_moons = sorted(moon_urls.items())

        for moon_num, moon_path in sorted_moons:
            moon_url = f'https://www.ign.com{moon_path}'
            print(f"    Moon {moon_num:02d}: fetching...", end='', flush=True)

            try:
                moon_html = fetch_page(moon_url)
                images = get_images_from_moon_page(moon_html)
                kingdom_results[str(moon_num)] = images
                print(f" {len(images)} images")

                if images:
                    for img in images:
                        fname = img.split('/')[-1]
                        print(f"      -> {fname}")

            except Exception as e:
                print(f" ERROR: {e}")
                kingdom_results[str(moon_num)] = []

            # Be polite - small delay between requests
            time.sleep(0.3)

        all_results[kingdom_id] = kingdom_results

        # Save after each kingdom (for resuming)
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(all_results, f, indent=2, ensure_ascii=False)
        print(f"  Saved {len(kingdom_results)} moons for {kingdom_id}")

    # Final summary
    print(f"\n{'='*60}")
    print("FINAL SUMMARY")
    print(f"{'='*60}")
    total_moons = 0
    total_images = 0
    for kid, moons in all_results.items():
        moon_count = len(moons)
        img_count = sum(len(imgs) for imgs in moons.values())
        moons_with_imgs = sum(1 for imgs in moons.values() if imgs)
        total_moons += moon_count
        total_images += img_count
        print(f"  {kid}: {moon_count} moons, {img_count} images ({moons_with_imgs} moons with images)")

    print(f"\nTotal: {total_moons} moons, {total_images} images")
    print(f"Saved to: {OUTPUT_FILE}")


if __name__ == '__main__':
    main()
