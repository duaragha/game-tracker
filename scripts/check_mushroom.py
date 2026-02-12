import re

with open('C:/Users/ragha/Projects/game-tracker/mushroom_page.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Find all oyster image URLs - various patterns
pattern = r'https://oyster\.ignimgs\.com/mediawiki/apis\.ign\.com/super-mario-odyssey/[^\s"\'\\><]+\.(?:jpg|png)'
urls = re.findall(pattern, html)
unique = list(dict.fromkeys(urls))
print(f'Total unique image URLs: {len(unique)}')
for u in unique:
    print(u)

# Also check what context they appear in
print('\n--- Checking context around first few images ---')
for u in unique[:3]:
    idx = html.find(u)
    if idx >= 0:
        context = html[max(0,idx-80):idx+len(u)+30]
        print(f'\n...{context}...')
