import os
import re
import shutil

src_logo = r'C:\Users\mathu\.gemini\antigravity\brain\5f70964f-2014-48c4-85cb-04adf20194d0\m_sameer_logo_1785211206722.jpg'
dest_dir = r'c:\Users\mathu\Desktop\Ca Sameer\website\public'
dest_logo = os.path.join(dest_dir, 'logo.jpg')

# Copy the logo
shutil.copy2(src_logo, dest_logo)

# The old logo URL might be the google user content one
# We will just find <img ... src="..."> inside the <div class="flex items-center gap-3"> for the brand
# Actually, the old logo URL was:
old_logo_url = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP03Aly2p7D4cP8lIvOz5Lu0nzmOIgxUGJ5_5yWuWb0NwkRlLif4ZAmlosLfTHVUY-VvQqHZkNiDY3asa4WoaMIjAeJ2iq6TIZFt4iX22Y_6EjQtJmZOwzpkhLLDBcmYMckg9_j6EtHIG_Ml_vGi2CvSHpsiOQzhaWq9plenroHftkVM1DCyQMBaw8e5nW-39AadEeJrP3wfF3jkYp7jIy909DGhy9tds7Vu8GIVaqjGkA-kCfNpLh'

for filename in os.listdir(dest_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(dest_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the specific URL or any image that looks like a logo
        if old_logo_url in content:
            content = content.replace(old_logo_url, './logo.jpg')
        else:
            # Maybe it's somewhat different, let's just replace any img src near "M Sameer & Company Logo"
            content = re.sub(r'src="[^"]+"([^>]*alt="M Sameer &amp; Company Logo")', r'src="./logo.jpg"\1', content)
            content = re.sub(r'alt="M Sameer &amp; Company Logo"([^>]*?)src="[^"]+"', r'alt="M Sameer &amp; Company Logo"\1src="./logo.jpg"', content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated logo in {filename}')

print('Logo update complete.')
