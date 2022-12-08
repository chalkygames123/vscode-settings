# vscode-settings

## Prerequisites

Make sure you have the `code` command installed. If not, run the command `Shell Command: install 'code' command in PATH` from the Command Palette in VS Code.

## Usage

- Run `./dump_extensions` to back up your extensions
- Run `./install_extensions` to install extensions from the backup (Use `-n` or `--dry-run` option to do a dry run)
- Run `./prune_extensions` to prune extensions that are not included in the backup (Use `-n` or `--dry-run` option to do a dry run)
- Run `./link` to symlink settings from the backup to the VS Code's user settings file location
