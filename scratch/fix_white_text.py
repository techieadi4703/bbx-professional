import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # If the file has 'bg-primary' in it, it might have text-white that needs to be text-on-primary
    # But wait, let's just do targeted replacements.
    
    # Dashboard, Setup, Auth buttons
    content = content.replace('bg-primary text-white', 'bg-primary text-on-primary')
    content = content.replace('text-white/80', 'text-on-primary/80')
    content = content.replace('text-white/70', 'text-on-primary/70')
    content = content.replace('text-white/50', 'text-on-primary/50')
    
    # Specifically for WelfareInsurance and FinalCTA, Footer
    if 'WelfareInsurance.tsx' in filepath or 'FinalCTA.tsx' in filepath or 'Footer.tsx' in filepath:
        content = content.replace('text-white', 'text-on-primary')
        content = content.replace('border-white', 'border-on-primary')
        content = content.replace('hover:text-white', 'hover:text-on-primary')

    with open(filepath, 'w') as f:
        f.write(content)

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

print("Fixed text-white issues!")
