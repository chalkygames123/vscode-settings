---
name: clean-up-tsconfig
description: Clean up TSConfig by removing redundant compiler options.
---

TypeScript コンパイラーオプションの暗示関係がまとめられた以下のリファレンスに基づき、冗長なオプション指定を完全に削除せよ。

## `strict: true` による暗示

<!-- Type Checking -->

| 暗示されるオプション           | 暗示される値 |
| :----------------------------- | :----------- |
| `alwaysStrict`                 | `true`       |
| `strictNullChecks`             | `true`       |
| `strictBindCallApply`          | `true`       |
| `strictBuiltinIteratorReturn`  | `true`       |
| `strictFunctionTypes`          | `true`       |
| `strictPropertyInitialization` | `true`       |
| `noImplicitAny`                | `true`       |
| `noImplicitThis`               | `true`       |
| `useUnknownInCatchVariables`   | `true`       |

## `target` による `module` の暗示

<!-- Language and Environment → Modules -->

| `target` 値 | 暗示される `module` 値 |
| :---------- | :--------------------- |
| `es5`       | `commonjs`             |
| その他      | `es6`/`es2015`         |

## `module` による `target` の暗示

<!-- Modules → Language and Environment -->

| `module` 値 | 暗示される `target` 値 |
| :---------- | :--------------------- |
| `node20`    | `es2023`               |
| `nodenext`  | `esnext`               |
| その他      | `es5`                  |

## `module` による `moduleResolution` の暗示

<!-- Modules → Modules -->

| `module` 値 | 暗示される `moduleResolution` 値 |
| :---------- | :------------------------------- |
| `commonjs`  | `node10`                         |
| `node16`    | `node16`                         |
| `node18`    | `node16`                         |
| `node20`    | `node16`                         |
| `nodenext`  | `nodenext`                       |
| `preserve`  | `bundler`                        |
| その他      | `classic`                        |

## `moduleResolution` による `resolvePackageJsonExports` の暗示

<!-- Modules → Modules -->

| `moduleResolution` 値         | 暗示される `resolvePackageJsonExports` 値 |
| :---------------------------- | :---------------------------------------- |
| `node16`/`nodenext`/`bundler` | `true`                                    |

## `moduleResolution` による `resolvePackageJsonImports` の暗示

<!-- Modules → Modules -->

| `moduleResolution` 値         | 暗示される `resolvePackageJsonImports` 値 |
| :---------------------------- | :---------------------------------------- |
| `node16`/`nodenext`/`bundler` | `true`                                    |

## `rewriteRelativeImportExtensions: true` による暗示

<!-- Modules -->

| 暗示されるオプション         | 暗示される値 |
| :--------------------------- | :----------- |
| `allowImportingTsExtensions` | `true`       |

## `module` による `esModuleInterop` の暗示

<!-- Modules → Interop Constraints -->

| `module` 値                    | 暗示される `esModuleInterop` 値 |
| :----------------------------- | :------------------------------ |
| `node16`/`nodenext`/`preserve` | `true`                          |

## `esModuleInterop: true` による暗示

<!-- Interop Constraints -->

| 暗示されるオプション           | 暗示される値 |
| :----------------------------- | :----------- |
| `allowSyntheticDefaultImports` | `true`       |

## `module` による `allowSyntheticDefaultImports` の暗示

<!-- Modules → Interop Constraints -->

| `module` 値 | 暗示される `allowSyntheticDefaultImports` 値 |
| :---------- | :------------------------------------------- |
| `system`    | `true`                                       |

## `moduleResolution` による `allowSyntheticDefaultImports` の暗示

<!-- Modules → Interop Constraints -->

| `moduleResolution` 値 | 暗示される `allowSyntheticDefaultImports` 値 |
| :-------------------- | :------------------------------------------- |
| `bundler`             | `true`                                       |

## `verbatimModuleSyntax: true` による暗示

<!-- Interop Constraints -->

| 暗示されるオプション | 暗示される値 |
| :------------------- | :----------- |
| `isolatedModules`    | `true`       |

## `isolatedModules: true` による暗示

<!-- Interop Constraints -->

| 暗示されるオプション | 暗示される値 |
| :------------------- | :----------- |
| `preserveConstEnums` | `true`       |

## `target` による `lib` の暗示

<!-- Language and Environment → Language and Environment -->

| `target` 値    | 暗示される `lib` 値                                                                              |
| :------------- | :----------------------------------------------------------------------------------------------- |
| `es3`          | `["ES5", "DOM", "WebWorker.ImportScripts, "ScriptHost"]`                                         |
| `es5`          | `["ES5", "DOM", "WebWorker.ImportScripts, "ScriptHost"]`                                         |
| `es6`/`es2015` | `["ES2015", "DOM", "WebWorker.ImportScripts, "ScriptHost"]`                                      |
| `es2016`       | `["ES2016", "DOM", "WebWorker.ImportScripts, "ScriptHost", "DOM.Iterable", "DOM.AsyncIterable"]` |
| `es2017`       | `["ES2017", "DOM", "WebWorker.ImportScripts, "ScriptHost", "DOM.Iterable", "DOM.AsyncIterable"]` |
| `es2018`       | `["ES2018", "DOM", "WebWorker.ImportScripts, "ScriptHost", "DOM.Iterable", "DOM.AsyncIterable"]` |
| `es2019`       | `["ES2019", "DOM", "WebWorker.ImportScripts, "ScriptHost", "DOM.Iterable", "DOM.AsyncIterable"]` |
| `es2020`       | `["ES2020", "DOM", "WebWorker.ImportScripts, "ScriptHost", "DOM.Iterable", "DOM.AsyncIterable"]` |
| `es2021`       | `["ES2021", "DOM", "WebWorker.ImportScripts, "ScriptHost", "DOM.Iterable", "DOM.AsyncIterable"]` |
| `es2022`       | `["ES2022", "DOM", "WebWorker.ImportScripts, "ScriptHost", "DOM.Iterable", "DOM.AsyncIterable"]` |
| `es2023`       | `["ES2023", "DOM", "WebWorker.ImportScripts, "ScriptHost", "DOM.Iterable", "DOM.AsyncIterable"]` |
| `es2024`       | `["ES2024", "DOM", "WebWorker.ImportScripts, "ScriptHost", "DOM.Iterable", "DOM.AsyncIterable"]` |
| `es2025`       | `["ES2025", "DOM", "WebWorker.ImportScripts, "ScriptHost", "DOM.Iterable", "DOM.AsyncIterable"]` |
| `esnext`       | `["ESNext", "DOM", "WebWorker.ImportScripts, "ScriptHost", "DOM.Iterable", "DOM.AsyncIterable"]` |

出典: https://deepwiki.com/search/tsconfig-target-es3-es5-es6es2_f3e6dcb0-7a13-4046-80dc-1f4b588e3a6c

## `target` による `useDefineForClassFields` の暗示

<!-- Language and Environment → Language and Environment -->

| `target` 値                      | 暗示される `useDefineForClassFields` 値 |
| :------------------------------- | :-------------------------------------- |
| `es2022` 以上（`esnext` を含む） | `true`                                  |

## `composite: true` による暗示

<!-- Projects -->

| 暗示されるオプション | 暗示される値                             |
| :------------------- | :--------------------------------------- |
| `declaration`        | `true`                                   |
| `incremental`        | `true`                                   |
| `rootDir`            | `tsconfig.json` が存在するディレクトリー |

## TypeScript 6.0

TypeScript 6.0 を使用するプロジェクトでは以下の変更を考慮する。

### `DOM` ライブラリー

`DOM.Iterable` および `DOM.AsyncIterable` の内容は `DOM` に統合された。

### デフォルト値

| オプション                     | 旧デフォルト | 新デフォルト |
| :----------------------------- | :----------- | :----------- |
| `strict`                       | `false`      | `true`       |
| `module`                       | `es6`        | `esnext`     |
| `target`                       | `es5`        | `es2025`     |
| `noUncheckedSideEffectImports` | `false`      | `true`       |
| `rootDir`                      | 推論         | `.`          |
| `libReplacement`               | `true`       | `false`      |
| `types`                        | `["*"]`      | `[]`         |

### 非推奨

- `target: "es5"`
- `moduleResolution: "node"` / `"node10"` / `"classic"`
- `module: "amd"` / `"umd"` / `"systemjs"` / `"none"`
- `baseUrl`
- `esModuleInterop: false`
- `allowSyntheticDefaultImports: false`
- `alwaysStrict: false`
- `outFile`
- `downlevelIteration`
