import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replacements
    # Inline grids
    grid_pattern = r'style=\{\{\s*backgroundImage:\s*\'linear-gradient\([^)]+\),\s*linear-gradient\([^)]+\)\',\s*backgroundSize:\s*\'[^\']+\',\s*opacity:\s*[\d.]+\s*\}\}'
    content = re.sub(grid_pattern, 'className="bg-blueprint opacity-30"', content)
    
    # Fix the div class merge where style was replaced
    # <div className="absolute inset-0 pointer-events-none" className="bg-blueprint opacity-30" /> -> <div className="absolute inset-0 pointer-events-none z-0 bg-blueprint opacity-30" />
    content = re.sub(r'className="([^"]+)"\s*className="bg-blueprint opacity-30"', r'className="\1 z-0 bg-blueprint opacity-30"', content)
    # If the original already had z-0, z-0 z-0 is fine, or we can just clean it
    content = content.replace(" z-0 z-0 ", " z-0 ")

    # Hex codes missed
    content = content.replace('border-t-[#735c00]', 'border-t-secondary')
    content = content.replace('shadow-[#735c00]/20', 'shadow-secondary/20')
    content = content.replace('text-[#44474c]', 'text-on-surface-variant')
    content = content.replace('border-[#fcf9f6]', 'border-surface')
    
    with open(filepath, 'w') as f:
        f.write(content)

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

print("Done edge cases!")
