#!/bin/sh

cd "$(dirname "$0")" || return

code --list-extensions > extensions
