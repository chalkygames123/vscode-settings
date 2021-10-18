# vscode-settings

## Prerequisites

Make sure you have the `code` command installed. If not, run the command `Shell Command: install 'code' command in PATH` from the Command Palette in VS Code.

## Usage

- Run `./dump-extensions` to backup extensions
- Run `./install-extensions` to install extensions from the backup
  - Run `DRY_RUN=1 ./install-extensions` instead to do a dry run
- Run `./prune-extensions` to prune extensions that are not included in the backup
  - Run `DRY_RUN=1 ./prune-extensions` instead to do a dry run
- Run `./link` to symlink settings from the backup to the VS Code's user settings file location
