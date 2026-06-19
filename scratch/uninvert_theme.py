import os
import re

def rewrite_earnings_calculator():
    path = 'src/components/landing/EarningsCalculator.tsx'
    with open(path, 'r') as f: content = f.read()
    
    content = content.replace('bg-primary text-primary-foreground', 'bg-surface-container-lowest text-on-surface')
    content = content.replace('text-primary-foreground/80', 'text-on-surface-variant')
    # Change card inside to stand out
    content = content.replace('bg-surface-container-lowest text-on-surface rounded-3xl', 'bg-surface text-on-surface rounded-3xl')
    
    with open(path, 'w') as f: f.write(content)

def rewrite_welfare_insurance():
    path = 'src/components/landing/WelfareInsurance.tsx'
    with open(path, 'r') as f: content = f.read()
    
    content = content.replace('bg-primary text-primary-foreground', 'bg-surface-container-low text-on-surface')
    content = content.replace('border-primary-foreground/10', 'border-border')
    content = content.replace('bg-primary-foreground/5', 'bg-surface')
    content = content.replace('text-primary-foreground/70', 'text-on-surface-variant')
    
    # Replace the inline pattern with bg-dot-grid
    pattern_regex = r'<div\s+className="absolute inset-0 opacity-5 pointer-events-none"\s+style=\{\{\s*backgroundImage: \'radial-gradient\([^)]+\)\',\s*backgroundSize: \'[^\']+\'\s*\}\}\s*/>'
    content = re.sub(pattern_regex, '<div className="absolute inset-0 bg-dot-grid opacity-[0.03] pointer-events-none" />', content)
    
    with open(path, 'w') as f: f.write(content)

def rewrite_final_cta():
    path = 'src/components/landing/FinalCTA.tsx'
    with open(path, 'r') as f: content = f.read()
    
    content = content.replace('bg-primary text-primary-foreground', 'bg-surface-container-lowest text-on-surface')
    content = content.replace('border-primary', 'border-border')
    content = content.replace('text-primary-foreground/80', 'text-on-surface-variant')
    
    # Replace inline pattern
    pattern_regex = r'<div\s+className="absolute inset-0 opacity-10 pointer-events-none"\s+style=\{\{\s*backgroundImage: \'radial-gradient\([^)]+\)\',\s*backgroundSize: \'[^\']+\',\s*backgroundPosition: \'[^\']+\'\s*\}\}\s*/>'
    content = re.sub(pattern_regex, '<div className="absolute inset-0 bg-dot-grid opacity-[0.03] pointer-events-none" />', content)
    
    # Change button from bg-surface-container-lowest to bg-primary
    content = content.replace('bg-surface-container-lowest text-on-surface', 'bg-primary text-primary-foreground')
    
    with open(path, 'w') as f: f.write(content)

def rewrite_footer():
    path = 'src/components/layout/Footer.tsx'
    with open(path, 'r') as f: content = f.read()
    
    content = content.replace('bg-primary text-primary-foreground/80', 'bg-surface-container-lowest text-on-surface-variant')
    content = content.replace('text-primary-foreground/50', 'text-on-surface-variant/50')
    content = content.replace('border-primary-foreground/10', 'border-border')
    content = content.replace('text-primary-foreground', 'text-on-surface')
    content = content.replace('hover:text-primary-foreground', 'hover:text-primary')
    
    with open(path, 'w') as f: f.write(content)

rewrite_earnings_calculator()
rewrite_welfare_insurance()
rewrite_final_cta()
rewrite_footer()

print("Uninverted theme successfully!")
