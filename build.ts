import * as esbuild from "npm:esbuild";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader";

const result = await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: ["./index.ts"],
  outfile: "./dist/lute.js",
  sourcemap:true,
  minify: false,
  bundle: true,
  platform: "browser",
  format: "esm",
});

esbuild.stop();
