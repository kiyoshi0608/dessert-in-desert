#!/bin/bash
# このファイルをダブルクリックして実行してください
# （初回はシステム環境設定 > セキュリティで許可が必要な場合があります）

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SRC="/Users/kawamatakiyoshi1/.gemini/antigravity/brain/4f609614-eeae-4148-ba7f-2cab2b7079ed/media__1771209311457.jpg"
DEST="$SCRIPT_DIR/media/cover.jpg"

mkdir -p "$SCRIPT_DIR/media"

if [ -f "$SRC" ]; then
    cp "$SRC" "$DEST"
    echo "✅ 画像をコピーしました: $DEST"
else
    echo "❌ 元の画像が見つかりません: $SRC"
fi

echo ""
echo "完了しました。このウィンドウを閉じてください。"
read -p "Enterキーを押して終了..."
