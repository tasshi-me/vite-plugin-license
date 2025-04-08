# vite-plugin-license

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
