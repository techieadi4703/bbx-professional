import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    changed = False
    new_content = content.replace('text-on-primary', 'text-primary-foreground')
    new_content = new_content.replace('bg-on-primary', 'bg-primary-foreground')
    new_content = new_content.replace('border-on-primary', 'border-primary-foreground')
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

print("Fixed on-primary to primary-foreground!")
