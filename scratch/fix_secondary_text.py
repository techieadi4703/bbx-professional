import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    changed = False
    
    # Replace 'bg-secondary text-white' with 'bg-secondary text-secondary-foreground'
    new_content = content.replace('bg-secondary text-white', 'bg-secondary text-secondary-foreground')
    
    # In some places it might be 'text-white bg-secondary'
    new_content = new_content.replace('text-white bg-secondary', 'text-secondary-foreground bg-secondary')
    
    # Check for cases where they are separated by other classes
    # e.g. bg-secondary font-bold text-white -> bg-secondary font-bold text-secondary-foreground
    # We can just use a regex for any class attribute containing both.
    def replacer(match):
        cls_str = match.group(1)
        if 'bg-secondary ' in cls_str or ' bg-secondary' in cls_str:
            cls_str = cls_str.replace('text-white', 'text-secondary-foreground')
        return f'className="{cls_str}"'
        
    new_content = re.sub(r'className="([^"]*)"', replacer, new_content)
    # Also handle template literals className={`...`}
    def replacer_template(match):
        cls_str = match.group(1)
        if 'bg-secondary ' in cls_str or ' bg-secondary' in cls_str:
            cls_str = cls_str.replace('text-white', 'text-secondary-foreground')
        return f'className={{`{cls_str}`}}'
        
    new_content = re.sub(r'className=\{\`([^\`]*)\`\}', replacer_template, new_content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

print("Fixed secondary-foreground!")
