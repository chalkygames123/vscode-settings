# vscode-settings

## Prerequisites

- Install the `code` command with the `Shell Command: install 'code' command in PATH` in the VS Code's Command Palette.

## Getting started

Symlink settings from the backup to the VS Code's user settings file location:

```shell
./link
```

> [!WARNING]
> This script will overwrite the existing settings.

## Usage

### Install extensions from the backup

```shell
./install_extensions [-n|--dry-run]
```

`-n`, `--dry-run`: Run without making any actual changes.

### Prune extensions that are not included in the backup

```shell
./prune_extensions [-n|--dry-run]
```

`-n`, `--dry-run`: Run without making any actual changes.

### Back up a list of your extensions into `extensions`

```shell
./dump_extensions
```
