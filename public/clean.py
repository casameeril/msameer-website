import os, glob
for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace('style="background:#1A1612;', 'style="background:#FFFFFF;')
    c = c.replace('style="background:#2C2520"', 'style="background:#FFFFFF"')
    c = c.replace('style="background:#221D18"', 'style="background:#FFFFFF"')
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(c)
