# vscode-settings

## Prerequisites

Make sure you have the `code` command installed. If not, run the command `Shell Command: install 'code' command in PATH` from the Command Palette in VS Code.

## Usage

- Run `./dump-extensions` to backup extensions
- Run `./install-extensions` to install extensions from the backup
- Run `./prune-extensions` to prune extensions that are not included in the backup (Prepend `DRY_RUN=1 ` to dry run)
- Run `./link` to symlink settings from the backup to the VS Code's user settings file location
