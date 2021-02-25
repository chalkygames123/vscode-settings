#!/bin/sh

cd "$(dirname "$0")" || return

< extensions xargs -I {} code --install-extension {}

SETTINGS_DIR=settings
VSCODE_DIR=~/Library/Application\ Support/Code/User

ln -fs "$PWD/$SETTINGS_DIR/keybindings.json" "$VSCODE_DIR"
ln -fs "$PWD/$SETTINGS_DIR/settings.json" "$VSCODE_DIR"
ln -fs "$PWD/$SETTINGS_DIR/snippets" "$VSCODE_DIR"
