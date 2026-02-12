"""
Apply IGN scraped data (descriptions + images) to smo-purple-coins.ts.
Replaces entire locations arrays for each kingdom.
"""
import json

with open('C:/Users/ragha/Projects/game-tracker/ign_full_data.json', 'r', encoding='utf-8') as f:
    ign_data = json.load(f)

ts_file = 'C:/Users/ragha/Projects/game-tracker/src/data/smo-purple-coins.ts'
with open(ts_file, 'r', encoding='utf-8') as f:
    content = f.read()

# For each kingdom in IGN data, generate the locations array and replace in TS
for kingdom_id, sections in ign_data.items():
    # Generate TypeScript locations array
    lines = []
    for s in sections:
        guide = s['guide'].replace("'", "\\'")
        img = s.get('imageUrl', '')
        if img:
            lines.append(f"      {{ count: {s['count']}, guide: '{guide}', imageUrl: '{img}' }},")
        else:
            lines.append(f"      {{ count: {s['count']}, guide: '{guide}' }},")

    new_locations = "locations: [\n" + "\n".join(lines) + "\n    ]"

    # Find the kingdom block in the TS file and replace its locations
    # Search for kingdomId: 'xxx' ... locations: [ ... ]
    import re

    # Escape the kingdom ID for regex
    if kingdom_id == 'bowsers':
        id_pattern = r"kingdomId: 'bowsers'"
    else:
        id_pattern = rf"kingdomId: '{kingdom_id}'"

    # Find the position of this kingdom's locations array
    kingdom_match = re.search(id_pattern, content)
    if not kingdom_match:
        print(f"WARNING: Could not find kingdom '{kingdom_id}' in TS file")
        continue

    # Find "locations: [" after this kingdom
    loc_start_match = re.search(r'locations: \[', content[kingdom_match.start():])
    if not loc_start_match:
        print(f"WARNING: Could not find locations for '{kingdom_id}'")
        continue

    loc_start = kingdom_match.start() + loc_start_match.start()

    # Find the matching closing bracket - count brackets
    bracket_count = 0
    pos = loc_start + len('locations: [')
    bracket_count = 1
    while pos < len(content) and bracket_count > 0:
        if content[pos] == '[':
            bracket_count += 1
        elif content[pos] == ']':
            bracket_count -= 1
        pos += 1

    loc_end = pos
    old_locations = content[loc_start:loc_end]

    # Replace
    content = content[:loc_start] + new_locations + content[loc_end:]

    total_coins = sum(s['count'] for s in sections)
    imgs = sum(1 for s in sections if s.get('imageUrl'))
    print(f"  {kingdom_id}: {len(sections)} sections, {total_coins} coins, {imgs} images")

# Write back
with open(ts_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("\nDone! Updated smo-purple-coins.ts")
