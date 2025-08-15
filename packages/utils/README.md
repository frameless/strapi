# Utilities

## `outputToFilesystem` warning

```log
(!) Plugin typescript: @rollup/plugin-typescript: outputToFilesystem option is defaulting to true.
```

The build contains a warning about `outputToFilesystem`. After reading the comments in the following GitHub Issue, it appears the warning can be avoided by either configuring Rollup or tsconfig.json differently, but both approaches have undesired side effects. The warning can be ignored.

<https://github.com/rollup/plugins/issues/1227>
