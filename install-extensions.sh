#!/bin/sh

cd "$(dirname "$0")" || return

set -o xtrace

< extensions xargs -I {} code --install-extension {}
