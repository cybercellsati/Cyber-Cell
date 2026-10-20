import os
from PIL import Image, ImageDraw, ImageFont

def generate_template():
    width = 1920
    height = 1080
    
    # Deep midnight navy background #070a13
    img = Image.new("RGBA", (width, height), (7, 10, 19, 255))
    draw = ImageDraw.Draw(img)
    
    # 1. Subtle radial gradient effect or grid background
    for y in range(0, height, 40):
        draw.line([(0, y), (width, y)], fill=(15, 23, 42, 40), width=1)
    for x in range(0, width, 40):
        draw.line([(x, 0), (x, height)], fill=(15, 23, 42, 40), width=1)
        
    # 2. Luxury Golden Outer Border
    gold = (212, 175, 55, 255)
    gold_dim = (180, 140, 40, 180)
    cyan = (56, 189, 248, 255)
    
    # Outer frame
    draw.rectangle([40, 40, width - 40, height - 40], outline=gold, width=4)
    # Inner thin frame
    draw.rectangle([55, 55, width - 55, height - 55], outline=gold_dim, width=1)
    draw.rectangle([70, 70, width - 70, height - 70], outline=(255, 255, 255, 30), width=1)
    
    # Corner ornaments
    corner_size = 50
    corners = [
        (40, 40, 1, 1),
        (width - 40, 40, -1, 1),
        (40, height - 40, 1, -1),
        (width - 40, height - 40, -1, -1)
    ]
    for cx, cy, dx, dy in corners:
        draw.line([(cx, cy), (cx + dx * corner_size, cy)], fill=gold, width=4)
        draw.line([(cx, cy), (cx, cy + dy * corner_size)], fill=gold, width=4)
        draw.rectangle([cx + dx * 15 - 5, cy + dy * 15 - 5, cx + dx * 15 + 5, cy + dy * 15 + 5], fill=gold)

    # 3. Header Texts
    try:
        # Fallback system fonts if available
        font_large = ImageFont.truetype("arial.ttf", 46)
        font_mid = ImageFont.truetype("arial.ttf", 26)
        font_sub = ImageFont.truetype("arial.ttf", 18)
        font_small = ImageFont.truetype("arial.ttf", 16)
    except:
        font_large = ImageFont.load_default()
        font_mid = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # Institute title
    draw.text((width // 2, 115), "SAMRAT ASHOK TECHNOLOGICAL INSTITUTE (SATI), VIDISHA", fill=(203, 213, 225, 255), font=font_sub, anchor="mm")
    draw.text((width // 2, 145), "CENTRAL CODING CLUB • CYBER CELL", fill=cyan, font=font_small, anchor="mm")
    
    # Main Title
    draw.text((width // 2, 220), "CERTIFICATE OF EXCELLENCE", fill=gold, font=font_large, anchor="mm")
    draw.line([(width // 2 - 250, 260), (width // 2 + 250, 260)], fill=gold_dim, width=2)
    
    # Conferred text
    draw.text((width // 2, 330), "THIS IS PROUDLY PRESENTED TO", fill=(148, 163, 184, 255), font=font_sub, anchor="mm")
    
    # Name baseline placeholder guide (very subtle gold dotted line)
    draw.line([(width // 2 - 380, 560), (width // 2 + 380, 560)], fill=(212, 175, 55, 80), width=1)
    
    # Recognition text
    draw.text((width // 2, 650), "for active participation and outstanding technical contribution in the", fill=(148, 163, 184, 255), font=font_sub, anchor="mm")
    draw.text((width // 2, 690), "NATIONAL CYBER DEFENSE WARGAME & ETHICAL HACKING SUMMIT", fill=(241, 245, 249, 255), font=font_mid, anchor="mm")
    draw.text((width // 2, 735), "Demonstrating high competence in threat defense, application security, and ethical cyber protocols.", fill=(100, 116, 139, 255), font=font_small, anchor="mm")
    
    # Signatures & Seals
    # Left: Faculty
    draw.line([(280, 930), (520, 930)], fill=(148, 163, 184, 180), width=2)
    draw.text((400, 955), "FACULTY CONVENOR", fill=(241, 245, 249, 255), font=font_small, anchor="mm")
    draw.text((400, 980), "Cyber Cell & Central Coding Club", fill=(100, 116, 139, 255), font=font_small, anchor="mm")

    # Center: Security Seal
    draw.ellipse([(width // 2 - 50, 880), (width // 2 + 50, 980)], outline=gold, width=2)
    draw.ellipse([(width // 2 - 42, 888), (width // 2 + 42, 972)], outline=gold_dim, width=1)
    draw.text((width // 2, 920), "OFFICIAL", fill=gold, font=font_small, anchor="mm")
    draw.text((width // 2, 940), "★ SEAL ★", fill=gold, font=font_small, anchor="mm")

    # Right: Student Lead
    draw.line([(width - 520, 930), (width - 280, 930)], fill=(148, 163, 184, 180), width=2)
    draw.text((width - 400, 955), "LEAD COORDINATOR", fill=(241, 245, 249, 255), font=font_small, anchor="mm")
    draw.text((width - 400, 980), "Cyber Cell, SATI Vidisha", fill=(100, 116, 139, 255), font=font_small, anchor="mm")

    out_path = os.path.join("public", "templates", "certificate-template.png")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    img.save(out_path, "PNG")
    print(f"Generated default template: {out_path} ({os.path.getsize(out_path)} bytes)")

if __name__ == "__main__":
    generate_template()
