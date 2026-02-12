import re

with open('C:/Users/ragha/Projects/game-tracker/src/data/smo-purple-coins.ts', 'r', encoding='utf-8') as f:
    content = f.read()

kingdoms = ['cap', 'cascade', 'sand', 'lake', 'wooded', 'lost', 'metro', 'snow', 'seaside', 'luncheon', 'bowsers', 'moon', 'mushroom']
for k in kingdoms:
    search = f"kingdomId: '{k}'"
    idx = content.find(search)
    if idx < 0:
        print(f'{k}: NOT FOUND')
        continue
    loc_idx = content.find('locations: [', idx)
    bracket = 1
    pos = loc_idx + len('locations: [')
    while bracket > 0 and pos < len(content):
        if content[pos] == '[':
            bracket += 1
        elif content[pos] == ']':
            bracket -= 1
        pos += 1
    loc_text = content[loc_idx:pos]
    counts = re.findall(r'count: (\d+)', loc_text)
    total = sum(int(c) for c in counts)
    imgs = len(re.findall(r'imageUrl:', loc_text))
    print(f'{k}: {len(counts)} sections, {total} coins, {imgs} images')
