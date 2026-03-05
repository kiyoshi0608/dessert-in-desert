#!/usr/bin/env python3
import os
import shutil

# Source images
src1 = "/Users/kawamatakiyoshi1/.gemini/antigravity/brain/4f609614-eeae-4148-ba7f-2cab2b7079ed/media__1771209311457.jpg"
src2 = "/Users/kawamatakiyoshi1/.gemini/antigravity/brain/4f609614-eeae-4148-ba7f-2cab2b7079ed/media__1771209311458.jpg"

# Destination
script_dir = os.path.dirname(os.path.abspath(__file__))
media_dir = os.path.join(script_dir, "media")
os.makedirs(media_dir, exist_ok=True)

if os.path.exists(src1):
    shutil.copy(src1, os.path.join(media_dir, "cover.jpg"))
    print("✅ cover.jpg をコピーしました")
else:
    print("❌ cover.jpg が見つかりません")

if os.path.exists(src2):
    shutil.copy(src2, os.path.join(media_dir, "tour.jpg"))
    print("✅ tour.jpg をコピーしました")
else:
    print("❌ tour.jpg が見つかりません")

print("\n完了！index.html をブラウザで開いてください。")
input("Enterキーを押して閉じる...")
