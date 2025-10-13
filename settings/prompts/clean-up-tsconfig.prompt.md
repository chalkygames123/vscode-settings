---
description: Clean up TSConfig by removing redundant compiler options.
---

# TSConfig コンパイラーオプションの暗示関係一覧

以下は、TypeScript 5.9 の TSConfig において、あるコンパイラーオプションの設定値が他のコンパイラーオプションのデフォルト値を暗示（imply）するケースの網羅的なリストです。これらに基づいて、冗長なオプションの指定を完全に削除してください。

## 1. `strict: true` による暗示

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

## 2. `target` による `module` の暗示

<!-- Language and Environment → Modules -->

| `target` 値 | 暗示される `module` 値 |
| :---------- | :--------------------- |
| `es5`       | `commonjs`             |
| その他      | `es6`/`es2015`         |

## 3. `module` による `target` の暗示

<!-- Modules → Language and Environment -->

| `module` 値 | 暗示される `target` 値 |
| :---------- | :--------------------- |
| `node20`    | `es2023`               |
| `nodenext`  | `esnext`               |
| その他      | `es5`                  |

## 4. `module` による `moduleResolution` の暗示

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

## 5. `moduleResolution` による `resolvePackageJsonExports` の暗示

<!-- Modules → Modules -->

| `moduleResolution` 値         | 暗示される `resolvePackageJsonExports` 値 |
| :---------------------------- | :---------------------------------------- |
| `node16`/`nodenext`/`bundler` | `true`                                    |

## 6. `moduleResolution` による `resolvePackageJsonImports` の暗示

<!-- Modules → Modules -->

| `moduleResolution` 値         | 暗示される `resolvePackageJsonImports` 値 |
| :---------------------------- | :---------------------------------------- |
| `node16`/`nodenext`/`bundler` | `true`                                    |

## 7. `rewriteRelativeImportExtensions: true` による暗示

<!-- Modules -->

| 暗示されるオプション         | 暗示される値 |
| :--------------------------- | :----------- |
| `allowImportingTsExtensions` | `true`       |

## 8. `module` による `esModuleInterop` の暗示

<!-- Modules → Interop Constraints -->

| `module` 値                    | 暗示される `esModuleInterop` 値 |
| :----------------------------- | :------------------------------ |
| `node16`/`nodenext`/`preserve` | `true`                          |

## 9. `esModuleInterop: true` による暗示

<!-- Interop Constraints -->

| 暗示されるオプション           | 暗示される値 |
| :----------------------------- | :----------- |
| `allowSyntheticDefaultImports` | `true`       |

## 10. `module` による `allowSyntheticDefaultImports` の暗示

<!-- Modules → Interop Constraints -->

| `module` 値 | 暗示される `allowSyntheticDefaultImports` 値 |
| :---------- | :------------------------------------------- |
| `system`    | `true`                                       |

## 11. `moduleResolution` による `allowSyntheticDefaultImports` の暗示

<!-- Modules → Interop Constraints -->

| `moduleResolution` 値 | 暗示される `allowSyntheticDefaultImports` 値 |
| :-------------------- | :------------------------------------------- |
| `bundler`             | `true`                                       |

## 12. `verbatimModuleSyntax: true` による暗示

<!-- Interop Constraints -->

| 暗示されるオプション | 暗示される値 |
| :------------------- | :----------- |
| `isolatedModules`    | `true`       |

## 13. `isolatedModules: true` による暗示

<!-- Interop Constraints -->

| 暗示されるオプション | 暗示される値 |
| :------------------- | :----------- |
| `preserveConstEnums` | `true`       |

## 14. `target` による `lib` の暗示

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
| `esnext`       | `["ESNext", "DOM", "WebWorker.ImportScripts, "ScriptHost", "DOM.Iterable", "DOM.AsyncIterable"]` |

出典: https://deepwiki.com/search/tsconfig-target-es3-es5-es6es2_f3e6dcb0-7a13-4046-80dc-1f4b588e3a6c

## 15. `target` による `useDefineForClassFields` の暗示

<!-- Language and Environment → Language and Environment -->

| `target` 値                      | 暗示される `useDefineForClassFields` 値 |
| :------------------------------- | :-------------------------------------- |
| `es2022` 以上（`esnext` を含む） | `true`                                  |

## 16. `composite: true` による暗示

<!-- Projects -->

| 暗示されるオプション | 暗示される値                             |
| :------------------- | :--------------------------------------- |
| `declaration`        | `true`                                   |
| `incremental`        | `true`                                   |
| `rootDir`            | `tsconfig.json` が存在するディレクトリー |
