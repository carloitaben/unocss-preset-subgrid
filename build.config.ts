import { defineBuildConfig } from "unbuild"

export default defineBuildConfig({
  entries: ["src/index"],
  clean: true,
  declaration: true,
  externals: [
    "@unocss/core",
    "@unocss/preset-mini",
    "@unocss/preset-mini/utils",
  ],
  rollup: {
    emitCJS: true,
    dts: {
      respectExternal: false,
    },
    inlineDependencies: true,
  },
  failOnWarn: false,
})
