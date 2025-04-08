# vite-plugin-license

[![npm version](https://badge.fury.io/js/vite-plugin-license.svg)](https://badge.fury.io/js/vite-plugin-license)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CI](https://github.com/tasshi-me/vite-plugin-license/actions/workflows/ci.yaml/badge.svg)](https://github.com/tasshi-me/vite-plugin-license/actions/workflows/ci.yaml)

Vite plugin to add license banner to bundled output.

This is a tiny wrapper for [rollup-plugin-license](https://github.com/mjeanroy/rollup-plugin-license/) to solve some problem in using with Vite.

## Usage

```typescript
// vite.config.ts
import path from "node:path";

import { defineConfig } from "vite";
import license from "vite-plugin-license";

const config = defineConfig({
  plugins: [
    license({
      banner: {
        commentStyle: "regular",
        content: {
          file: path.join(__dirname, "LICENSE"),
        },
      },
    }),
  ],
});
export default config;
```

See [rollup-plugin-license](https://github.com/mjeanroy/rollup-plugin-license/) for more details.

## License

[MIT](./LICENSE)
