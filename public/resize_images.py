import os
import sys
import subprocess

# Install Pillow if it's not already installed
try:
    from PIL import Image
except ImportError:
    print("Installing required image processing library (Pillow)...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

# The images directory
IMAGE_DIR = r"c:\Users\Win-10\OneDrive\Desktop\trendmedi1\trendmedi_1\images"
MAX_WIDTH = 1200

def compress_images():
    print(f"Scanning directory: {IMAGE_DIR}")
    for filename in os.listdir(IMAGE_DIR):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            filepath = os.path.join(IMAGE_DIR, filename)
            original_size = os.path.getsize(filepath) / 1024 # KB
            
            try:
                img = Image.open(filepath)
                # Convert RGBA to RGB for JPEG if needed
                if img.mode in ("RGBA", "P") and filename.lower().endswith(('.jpg', '.jpeg')):
                    img = img.convert("RGB")
                    
                # Resize if width is larger than MAX_WIDTH
                if img.width > MAX_WIDTH:
                    ratio = MAX_WIDTH / float(img.width)
                    new_height = int((float(img.height) * float(ratio)))
                    img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
                
                # Save and compress (overwriting the original)
                if filename.lower().endswith(('.jpg', '.jpeg')):
                    img.save(filepath, "JPEG", optimize=True, quality=75)
                elif filename.lower().endswith('.png'):
                    img.save(filepath, "PNG", optimize=True)
                
                new_size = os.path.getsize(filepath) / 1024 # KB
                savings = original_size - new_size
                print(f"Compressed {filename}: {original_size:.1f}KB -> {new_size:.1f}KB (Saved {savings:.1f}KB)")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    compress_images()
    print("Done processing all images!")
