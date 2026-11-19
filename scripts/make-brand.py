"""Draws the placeholder brand assets (favicons, social card) from the same
navy roundel + gold arch + "P" mark as components/ui/Logo.jsx.

Run once: python3 scripts/make-brand.py. Output is committed.
TODO(client): replace with the school's real logo artwork.
"""
from PIL import Image, ImageDraw, ImageFont

NAVY, GOLD, IVORY = (18, 40, 74), (200, 162, 74), (255, 253, 248)
FONT = "/System/Library/Fonts/Supplemental/Georgia.ttf"


def mark(size, bg=None):
    s = 4  # supersample for smooth edges
    big = size * s
    img = Image.new("RGBA", (big, big), bg or (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    pad = big * 0.03
    d.ellipse([pad, pad, big - pad, big - pad], fill=NAVY, outline=GOLD, width=max(2, int(big * 0.03)))
    # arch
    cx, w = big / 2, big * 0.40
    top, bottom = big * 0.2, big * 0.75
    d.arc([cx - w / 2, top, cx + w / 2, top + w], 180, 360, fill=GOLD, width=max(2, int(big * 0.022)))
    d.line([cx - w / 2, top + w / 2, cx - w / 2, bottom], fill=GOLD, width=max(2, int(big * 0.022)))
    d.line([cx + w / 2, top + w / 2, cx + w / 2, bottom], fill=GOLD, width=max(2, int(big * 0.022)))
    font = ImageFont.truetype(FONT, int(big * 0.42))
    d.text((cx, big * 0.58), "P", font=font, fill=IVORY, anchor="mm")
    return img.resize((size, size), Image.LANCZOS)


for size in (32, 48):
    mark(size).save(f"public/brand/icon-{size}.png")
# iOS ignores alpha on the touch icon, so flatten onto ivory.
flat = Image.new("RGB", (180, 180), IVORY)
flat.paste(mark(180), (0, 0), mark(180))
flat.save("public/brand/icon-180.png")

card = Image.new("RGB", (1200, 630), NAVY)
d = ImageDraw.Draw(card)
card.paste(mark(300), (110, 165), mark(300))
d.text((480, 270), "Pragathi School", font=ImageFont.truetype(FONT, 86), fill=IVORY, anchor="lm")
d.line([480, 330, 620, 330], fill=GOLD, width=3)
d.text((480, 385), "Virajpet, Kodagu  ·  LKG to Class 10", font=ImageFont.truetype(FONT, 38), fill=(228, 211, 168), anchor="lm")
card.save("public/og-default.jpg", quality=88)
print("ok")
