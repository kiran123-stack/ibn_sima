# -*- coding: utf-8 -*-
"""
convert_images.py
-----------------
Converts all .jfif files in public/IMAGES to .png
Then resizes any image (png or jpg) wider than MAX_WIDTH.
Run from: c:/Projects/ibnsima/public/
"""

import os
import sys
import subprocess

# Fix Windows console encoding
sys.stdout.reconfigure(encoding='utf-8', errors='replace') if hasattr(sys.stdout, 'reconfigure') else None

try:
    from PIL import Image
except ImportError:
    print("Installing Pillow...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

IMAGE_DIR = os.path.join(os.path.dirname(__file__), "IMAGES")
MAX_WIDTH = 1200
MAX_HEIGHT = 1200
MAX_SIZE_KB = 500  # Resize if file is bigger than this after first pass

def process_images():
    print(f"Scanning: {IMAGE_DIR}\n")
    for filename in os.listdir(IMAGE_DIR):
        filepath = os.path.join(IMAGE_DIR, filename)
        ext = filename.lower().split(".")[-1]

        # Step 1: Convert .jfif to .png
        if ext in ("jfif", "jfi", "jpe"):
            try:
                img = Image.open(filepath)
                # Convert to RGB (PNG supports RGBA too, but keep RGB for smaller size)
                if img.mode in ("RGBA", "P", "LA"):
                    img = img.convert("RGBA")
                elif img.mode != "RGB":
                    img = img.convert("RGB")
                
                new_name = os.path.splitext(filename)[0] + ".png"
                # Sanitize filename: replace spaces with underscores
                new_name = new_name.replace(" ", "_")
                new_path = os.path.join(IMAGE_DIR, new_name)
                img.save(new_path, "PNG", optimize=True)
                os.remove(filepath)  # Remove old .jfif
                print(f"  Converted: {filename} → {new_name}")
                filename = new_name
                filepath = new_path
                ext = "png"
            except Exception as e:
                print(f"  ERROR converting {filename}: {e}")
                continue

        # Step 2: Rename PNGs with spaces to use underscores
        if ext in ("png", "jpg", "jpeg"):
            clean_name = filename.replace(" ", "_").replace("(", "").replace(")", "").replace(",", "")
            if clean_name != filename:
                new_path = os.path.join(IMAGE_DIR, clean_name)
                os.rename(filepath, new_path)
                print(f"  Renamed: {filename} → {clean_name}")
                filename = clean_name
                filepath = new_path

        # Step 3: Resize large images
        if ext in ("png", "jpg", "jpeg"):
            try:
                img = Image.open(filepath)
                original_size_kb = os.path.getsize(filepath) / 1024
                changed = False

                if img.width > MAX_WIDTH or img.height > MAX_HEIGHT:
                    ratio = min(MAX_WIDTH / img.width, MAX_HEIGHT / img.height)
                    new_w = int(img.width * ratio)
                    new_h = int(img.height * ratio)
                    img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                    changed = True

                if changed or original_size_kb > MAX_SIZE_KB:
                    if ext in ("jpg", "jpeg"):
                        img.save(filepath, "JPEG", optimize=True, quality=80)
                    else:
                        img.save(filepath, "PNG", optimize=True)
                    new_size_kb = os.path.getsize(filepath) / 1024
                    print(f"  Resized:  {filename}: {original_size_kb:.0f}KB → {new_size_kb:.0f}KB ({img.width}x{img.height})")
                else:
                    print(f"  OK:       {filename} ({original_size_kb:.0f}KB, {img.width}x{img.height})")
            except Exception as e:
                print(f"  ERROR processing {filename}: {e}")

    print("\nDone!")

if __name__ == "__main__":
    process_images()
