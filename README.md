# vscode-settings

My personal VS Code settings and extensions.

## Prerequisites

Make sure you have VS Code's `code` command installed. If you haven't already, run `Shell Command: Install 'code' command in PATH` in the Command Palette.

## Usage

There are a few scripts to help you manage your VS Code settings and extensions.

### Symlink settings from the backup to VS Code's user settings file location

```shell
./link
```

> [!WARNING]
> This script will overwrite your existing settings.

### Back up your currently installed extensions to the `extensions` file

```shell
./dump_extensions [-i|--insiders]
```

`-i`, `--insiders`: Use VS Code Insiders instead of stable VS Code.

### Install extensions listed in the `extensions` file

```shell
./install_extensions [-n|--dry-run] [-i|--insiders]
```

`-n`, `--dry-run`: Run without making any actual changes.

`-i`, `--insiders`: Use VS Code Insiders instead of stable VS Code.

### Uninstall extensions not listed in the `extensions` file

```shell
./prune_extensions [-n|--dry-run] [-i|--insiders]
```

`-n`, `--dry-run`: Run without making any actual changes.

`-i`, `--insiders`: Use VS Code Insiders instead of stable VS Code.
