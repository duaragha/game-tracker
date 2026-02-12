"""
Apply scraped IGN moon images to the moon data files.
Maps moon numbers from ign_moon_images.json to the corresponding
moon entries in src/data/moons/*.ts files.
"""
import json, re, sys, os

sys.stdout.reconfigure(encoding='utf-8')

BASE = 'C:/Users/ragha/Projects/game-tracker'
IMAGES_FILE = f'{BASE}/scripts/ign_moon_images.json'
MOONS_DIR = f'{BASE}/src/data/moons'

# Map kingdom IDs in the JSON to the moon file names
KINGDOM_FILES = {
    'sand': 'sand-moons.ts',
    'wooded': 'wooded-moons.ts',
    'metro': 'metro-moons.ts',
    'seaside': 'seaside-moons.ts',
    'luncheon': 'luncheon-moons.ts',
    'bowsers': 'bowsers-moons.ts',
    'moon': 'moon-moons.ts',
    'mushroom': 'mushroom-moons.ts',
    'darkside': 'darkside-moons.ts',
}

IGN_BASE = 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/super-mario-odyssey/'


def load_images():
    with open(IMAGES_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)


def process_kingdom(kingdom_id, moon_images, file_path):
    """Update a moon data file with IGN image URLs."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    updated_count = 0
    skipped_count = 0

    for moon_num_str, images in moon_images.items():
        moon_num = int(moon_num_str)
        if not images:
            continue

        # Find the moon entry with this order number
        # Pattern: order: <num>, followed by other fields, ending with }
        # We need to find entries where order: <moon_num>

        # Build pattern to find the specific moon entry
        # Look for: order: <num> within an object literal
        pattern = rf"(order:\s*{moon_num}\b[^}}]*?)(imageUrl:\s*'[^']*')"

        match = re.search(pattern, content)
        if match:
            # Moon has existing imageUrl - replace it and add imageUrls
            old_image_part = match.group(2)

            # Build imageUrls array
            img_urls = [img for img in images]
            image_urls_str = ', '.join(f"'{url}'" for url in img_urls)
            new_part = f"imageUrl: '{img_urls[0]}', imageUrls: [{image_urls_str}]"

            content = content[:match.start(2)] + new_part + content[match.end(2):]
            updated_count += 1
        else:
            # Try finding moon without existing imageUrl
            # Pattern: order: <num>, ...other fields... }
            pattern2 = rf"(order:\s*{moon_num}\b[^}}]*?)(,?\s*guide:\s*')"
            match2 = re.search(pattern2, content)

            if not match2:
                # Try with guide before order
                pattern3 = rf"(order:\s*{moon_num}\b[^}}]*?)(\s*\}})"
                match3 = re.search(pattern3, content)
                if match3:
                    img_urls = [img for img in images]
                    image_urls_str = ', '.join(f"'{url}'" for url in img_urls)
                    insert = f", imageUrl: '{img_urls[0]}', imageUrls: [{image_urls_str}]"
                    content = content[:match3.start(2)] + insert + content[match3.start(2):]
                    updated_count += 1
                else:
                    skipped_count += 1
            else:
                img_urls = [img for img in images]
                image_urls_str = ', '.join(f"'{url}'" for url in img_urls)
                insert = f", imageUrl: '{img_urls[0]}', imageUrls: [{image_urls_str}]"
                # Insert before guide
                content = content[:match2.start(2)] + insert + content[match2.start(2):]
                updated_count += 1

    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

    return updated_count, skipped_count


def main():
    images_data = load_images()

    total_updated = 0
    total_skipped = 0

    for kingdom_id, filename in KINGDOM_FILES.items():
        if kingdom_id not in images_data:
            print(f"  {kingdom_id}: no image data found")
            continue

        file_path = os.path.join(MOONS_DIR, filename)
        if not os.path.exists(file_path):
            print(f"  {kingdom_id}: file not found: {filename}")
            continue

        moon_images = images_data[kingdom_id]
        moons_with_images = sum(1 for imgs in moon_images.values() if imgs)

        updated, skipped = process_kingdom(kingdom_id, moon_images, file_path)
        total_updated += updated
        total_skipped += skipped

        print(f"  {kingdom_id}: {updated} updated, {skipped} skipped (of {moons_with_images} with images)")

    print(f"\nTotal: {total_updated} moons updated, {total_skipped} skipped")


if __name__ == '__main__':
    main()
