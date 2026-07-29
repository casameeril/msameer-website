import glob
for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        c = f.read()
    
    c = c.replace('class="page-hero px-6', 'class="page-hero pt-32 pb-16 px-6 text-center')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(c)
