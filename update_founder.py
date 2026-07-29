import os
import re

filepath = r'c:\Users\mathu\Desktop\Ca Sameer\website\public\about.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# The original tag is: <img class="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" alt="CA Sameer Ilahi"/>
# We replace it with founder.jpg
content = re.sub(
    r'<img[^>]+alt="CA Sameer Ilahi"[^>]*>', 
    '<img class="w-full h-full object-cover rounded-xl shadow-lg" src="./founder.jpg" alt="CA Sameer"/>', 
    content
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated about.html")
