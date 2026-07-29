import os
import re
import shutil

src_dir = r'c:\Users\mathu\Desktop\Ca Sameer\website\stitch_m_sameer_company_portal'
dest_dir = r'c:\Users\mathu\Desktop\Ca Sameer\website\public'

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

page_mapping = {
    'home_m_sameer_company': 'index.html',
    'about_us_m_sameer_company': 'about.html',
    'our_services_m_sameer_company': 'services.html',
    'online_tools_m_sameer_company': 'tools.html',
    'who_we_help_m_sameer_company': 'who_we_help.html',
    'resources_m_sameer_company': 'resources.html',
    'contact_m_sameer_company': 'contact.html',
    'aurelian_trust': 'aurelian_trust.html',
    'neon_tokyo': 'neon_tokyo.html',
    'm_sameer_company_logo': 'logo.html'
}

# The navigation text to filename mapping
nav_mapping = {
    'Home': 'index.html',
    'About': 'about.html',
    'Services': 'services.html',
    'Online Tools': 'tools.html',
    'Who We Help': 'who_we_help.html',
    'Resources': 'resources.html',
    'Contact': 'contact.html'
}

for folder in os.listdir(src_dir):
    folder_path = os.path.join(src_dir, folder)
    if os.path.isdir(folder_path):
        code_path = os.path.join(folder_path, 'code.html')
        if os.path.exists(code_path):
            with open(code_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace navigation links
            # The links are something like: <a ... href="#">Home</a>
            for nav_text, html_file in nav_mapping.items():
                # Regex to match the a tag with the specific text
                # We need to replace the href="#" with href="html_file"
                # We'll use a regex that matches `<a ...>nav_text</a>`
                # A safer way is to just replace href="#" if the text matches
                
                def replacer(match):
                    full_match = match.group(0)
                    if f">{nav_text}<" in full_match:
                        return re.sub(r'href="[^"]*"', f'href="{html_file}"', full_match)
                    return full_match
                
                content = re.sub(r'<a[^>]*>.*?</a>', replacer, content, flags=re.DOTALL)
            
            # Update 'active' class on navigation items
            # E.g. <a class="... active" href="...">Home</a>
            # Remove 'active' and 'border-b-2' 'border-primary' 'pb-1' from all links
            content = content.replace(' border-b-2 border-primary pb-1 active', '')
            content = content.replace(' text-primary', ' text-secondary') # Make all text secondary first
            
            # Now add active class to the current page's link
            dest_filename = page_mapping.get(folder, f"{folder}.html")
            
            def add_active_class(match):
                full_match = match.group(0)
                if f'href="{dest_filename}"' in full_match:
                    # Make it primary and add borders
                    full_match = full_match.replace('text-secondary hover:text-primary transition-colors hover:opacity-90 hover:translate-y-[-2px] duration-300', 'text-primary border-b-2 border-primary pb-1 active')
                    full_match = full_match.replace('text-secondary', 'text-primary border-b-2 border-primary pb-1 active')
                return full_match
            
            content = re.sub(r'<a[^>]*href="[^"]*"[^>]*>.*?</a>', add_active_class, content, flags=re.DOTALL)
            
            # Write out the modified content
            dest_path = os.path.join(dest_dir, dest_filename)
            with open(dest_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Created {dest_filename} from {folder}')
            
            # Move images if any (e.g. screen.png -> folder_screen.png)
            # Actually, the html files might not even reference local images, they usually use remote CDNs.
            # Let's check for any local image references.
            if 'src="' in content:
                for img_match in re.finditer(r'src="([^"]+)"', content):
                    src_val = img_match.group(1)
                    if not src_val.startswith('http') and not src_val.startswith('data:'):
                        print(f"  Warning: Local asset referenced: {src_val}")

print("Done arranging website.")
