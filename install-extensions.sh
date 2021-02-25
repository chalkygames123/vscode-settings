#!/bin/sh

cd "$(dirname "$0")" || return

set -o xtrace

< extensions xargs -I {} -P 0 code --install-extension {}
