---
applyTo: '**'
---

この環境の Node.js ランタイムは pnpm 11 の `pnpm runtime set node …` でインストールされており、`npm` と `npx` はバンドルされていません。代わりに `pnpm` と `pnx` を使用してください。

依存関係の管理は、ファイルの直接編集ではなく `pnpm` コマンドで行ってください。pnpm の `minimumReleaseAge` 設定によって依存関係の追加が拒否されたときは、`minimumReleaseAgeExclude` 設定を追加するのではなく、より古いバージョンの使用を試みてください。
