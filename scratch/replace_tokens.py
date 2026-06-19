import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replacements based on exact classes usually found
    replacements = [
        # Hex codes
        (r'bg-\[\#1c1c1a\]', 'bg-primary'),
        (r'text-\[\#1c1c1a\]', 'text-on-surface'),
        (r'border-\[\#1c1c1a\]', 'border-primary'),
        (r'from-\[\#1c1c1a\]', 'from-primary'),
        (r'to-\[\#1c1c1a\]', 'to-primary'),
        (r'bg-\[\#735c00\]', 'bg-secondary'),
        (r'text-\[\#735c00\]', 'text-secondary'),
        (r'border-\[\#735c00\]', 'border-secondary'),
        (r'text-\[\#74777d\]', 'text-on-surface-variant'),
        (r'bg-\[\#74777d\]', 'bg-on-surface-variant'),
        (r'border-\[\#74777d\]', 'border-on-surface-variant'),
        (r'border-\[\#e5e2df\]', 'border-border'),
        (r'bg-\[\#e5e2df\]', 'bg-surface-container'),
        (r'text-\[\#e5e2df\]', 'text-outline-variant'),
        (r'bg-\[\#f6f3f0\]', 'bg-surface-container-low'),
        (r'bg-\[\#fcf9f6\]', 'bg-surface'),
        (r'text-\[\#c4c6cc\]', 'text-outline-variant'),
        (r'bg-\[\#c4c6cc\]', 'bg-surface-container-highest'),
        (r'border-\[\#c4c6cc\]', 'border-surface-container-highest'),
        (r'text-\[\#C5A572\]', 'text-secondary-light'),
        (r'bg-\[\#C5A572\]', 'bg-secondary-light'),
        (r'border-\[\#C5A572\]', 'border-secondary-light'),
        (r'bg-white', 'bg-surface-container-lowest'),
        
        # Shadows
        (r'shadow-2xl', 'shadow-sm'),
        (r'shadow-xl', 'shadow-sm'),
        
        # Buttons pill -> lg (this one is tricky, will try to target specific button/Link classes or rounded-full generally where appropriate, or maybe just replace rounded-full with rounded-lg on certain tags. Actually, let's do rounded-full -> rounded-lg manually using regex for button/Link if possible, or just skip it here and do it in next pass)
    ]
    
    for old, new in replacements:
        content = re.sub(old, new, content)
        
    # Extra fix for rounded-full on buttons and links (heuristic)
    # If a class string contains 'rounded-full' and also 'px-' and 'py-', it's probably a button/pill.
    # Wait, the prompt says "reserve rounded-full for genuine pills: status badges, avatar containers, the small dot indicators... Primary/CTA buttons should use rounded-lg".
    # I'll just change `rounded-full` to `rounded-lg` where it also has `bg-primary`, `bg-secondary`, `hover:bg-`, etc.
    # Actually, a simpler regex: 
    content = re.sub(r'rounded-full([^>]*?(?:px-\d|py-\d|bg-primary|bg-secondary|hover:bg-|text-sm font-body font-bold))', r'rounded-lg\1', content)
    # Also reverse replace for small badges if we messed them up? Maybe safer to just do the hex replace first.
    
    with open(filepath, 'w') as f:
        f.write(content)

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

print("Done replacements!")
