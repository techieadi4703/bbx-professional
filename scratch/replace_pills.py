import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Target specific button combinations
    # "rounded-full transition-colors flex items-center gap-2"
    content = re.sub(r'rounded-full([^>]*?(?:hover:bg-|bg-primary|bg-secondary|transition-colors shadow-md|uppercase tracking-widest bg-red-50 text-red-600))', r'rounded-lg\1', content)
    # Target <Button className="rounded-full"> -> <Button className="rounded-lg">
    content = re.sub(r'<Button([^>]*?)className="rounded-full"', r'<Button\1className="rounded-lg"', content)
    
    with open(filepath, 'w') as f:
        f.write(content)

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

print("Done pills!")
