#!/bin/sh

cd "$(dirname "$0")" || return

< extensions.json xargs -I {} code --install-extension {}

VSCODE_DIR=~/Library/Application\ Support/Code/User

ln -fs "$PWD/settings.json" "$VSCODE_DIR"
ln -fs "$PWD/keybindings.json" "$VSCODE_DIR"
ln -fs "$PWD/snippets/global.code-snippets" "$VSCODE_DIR/snippets"
