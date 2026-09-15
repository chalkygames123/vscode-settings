---
applyTo: '**'
---

`npm` ではなく `pnpm`、`npx` ではなく `pnx`（エイリアス: `pnpm dlx`、`pnpx`）を使用する。現在の環境の Node.js ランタイムは pnpm 11 以降の `pnpm runtime` でインストールされており、`npm` と `npx` は展開されていない。

Git のコミットまたはタグの作成が 1Password 連携で失敗した時は、回避策を探さず作業を中断する。現在の環境では 1Password SSH agent を経由した自動署名が有効化されており、コミット時の SSH キーアクセス要求をユーザーが承認する必要がある。
