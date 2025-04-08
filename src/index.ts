import type { Plugin } from "vite";
import rollup from "rollup";
import type { Options } from "rollup-plugin-license";
import license from "rollup-plugin-license";

// To avoid incorrect default export
const rollupPluginLicenseFn = (license.default ?? license) satisfies (
  options: Options,
) => rollup.Plugin as unknown as (
  options: Options,
) => rollup.Plugin & rollup.PluginContext;

const vitePluginLicense: (options: Options) => Plugin = (options) => {
  const rollupPluginLicense = rollupPluginLicenseFn(options);

  const generateCodeWithBanner: (
    code: Parameters<rollup.RenderChunkHook>[0],
    chunk: Parameters<rollup.RenderChunkHook>[1],
    outputOptions: Parameters<rollup.RenderChunkHook>[2],
    meta?: Parameters<rollup.RenderChunkHook>[3],
  ) => Promise<string> = async (
    code,
    chunk,
    outputOptions,
    meta = undefined,
  ) => {
    if (typeof rollupPluginLicense.renderChunk !== "function") {
      throw new Error(
        "Failed to run rollup-plugin-license internally: renderChunk is not defined",
      );
    }

    const output = await rollupPluginLicense.renderChunk(
      code,
      chunk,
      outputOptions,
      meta as any, // We don't need meta
    );
    if (output == null) {
      throw new Error(
        "Failed to run rollup-plugin-license internally: output of renderChunk is null",
      );
    }
    if (typeof output === "object" && "code" in output) {
      return output.code;
    }
    return output;
  };

  const renderChunk: Plugin["renderChunk"] = async (
    code,
    chunk,
    outputOptions,
    meta,
  ) => {
    // Call original renderChunk hook
    if (typeof rollupPluginLicense.renderChunk === "function") {
      return rollupPluginLicense.renderChunk(code, chunk, outputOptions, meta);
    }
    return undefined;
  };

  const generateBundle: Plugin["generateBundle"] = async (
    outputOptions,
    bundle,
    isWrite,
  ) => {
    // Call original generateBundle hook
    if (typeof rollupPluginLicense.generateBundle === "function") {
      await rollupPluginLicense.generateBundle(outputOptions, bundle, isWrite);
    }

    // Add banner
    for (const [_fileName, file] of Object.entries(bundle)) {
      if (file.type === "chunk") {
        file.code = await generateCodeWithBanner(
          file.code,
          file,
          outputOptions,
        );
      }
    }
  };

  return {
    name: "vite-plugin-license",
    renderChunk: renderChunk,
    generateBundle: generateBundle,
  };
};

export default vitePluginLicense;
