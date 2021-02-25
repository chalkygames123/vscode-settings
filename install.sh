#!/bin/sh

cd "$(dirname "$0")" || return

< extensions xargs -I {} code --install-extension {}
