# vscode-settings

My personal VS Code settings and extensions.

## Prerequisites

Make sure you have VS Code's `code` command installed in your PATH. To install it, open VS Code and run `Shell Command: Install 'code' command in PATH` from the Command Palette.

## Usage

The following scripts help you manage your VS Code settings and extensions.

### Symlinking settings from the backup

To symlink [settings](./settings/) from the backup to your user settings file location, run:

```shell
./link
```

> [!WARNING]
> This script will overwrite your existing settings.

### Backing up your extensions

To back up your currently installed extensions to the [`extensions`](./extensions) file, run:

```shell
./dump_extensions [-i|--insiders]
```

**Options**:

- `-i`, `--insiders`: Use VS Code Insiders instead of stable VS Code.

### Installing extensions

To install extensions listed in the [`extensions`](./extensions) file, run:

```shell
./install_extensions [-n|--dry-run] [-i|--insiders]
```

**Options**:

- `-n`, `--dry-run`: Preview changes without applying them.
- `-i`, `--insiders`: Use VS Code Insiders instead of stable VS Code.

### Uninstalling extra extensions

To uninstall extensions not listed in the [`extensions`](./extensions) file, run:

```shell
./prune_extensions [-n|--dry-run] [-i|--insiders]
```

**Options**:

- `-n`, `--dry-run`: Preview changes without applying them.
- `-i`, `--insiders`: Use VS Code Insiders instead of stable VS Code.
