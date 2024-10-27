import type { Theme } from "@unocss/preset-mini"
import { h } from "@unocss/preset-mini/utils"
import type { RuleContext } from "unocss"
import { definePreset } from "unocss"

// From https://github.com/unocss/unocss/blob/main/packages/preset-mini/src/_rules/gap.ts
const directions: Record<string, string> = {
  x: "column-",
  y: "row-",
  col: "column-",
  row: "row-",
  "": "",
}

// From https://github.com/unocss/unocss/blob/main/packages/preset-mini/src/_rules/gap.ts
function handleGap([, d = "", s]: string[], { theme }: RuleContext<Theme>) {
  const v = theme.spacing?.[s] ?? h.bracket.cssvar.global.rem(s)

  if (v != null) {
    const gap = `${directions[d]}gap`

    switch (d) {
      case "x":
      case "row":
        return {
          [gap]: v,
          ["--subgrid-row-gap"]: v,
        }
      case "y":
      case "column":
        return {
          [gap]: v,
          ["--subgrid-column-gap"]: v,
        }
      default:
        return {
          [gap]: v,
          ["--subgrid-row-gap"]: v,
          ["--subgrid-column-gap"]: v,
        }
    }
  }
}

// From https://github.com/unocss/unocss/blob/main/packages/preset-mini/src/_rules/grid.ts
function rowCol(s: string) {
  return s.replace("col", "column")
}

export const presetSubgrid = definePreset<undefined, Theme>(() => ({
  name: "unocss-preset-subgrid",
  rules: [
    [
      /^(?:flex-|grid-)?gap-?()(.+)$/,
      handleGap,
      { autocomplete: ["gap-$spacing", "gap-<num>"] },
    ],
    [
      /^(?:flex-|grid-)?gap-([xy])-?(.+)$/,
      handleGap,
      { autocomplete: ["gap-(x|y)-$spacing", "gap-(x|y)-<num>"] },
    ],
    [
      /^(?:flex-|grid-)?gap-(col|row)-?(.+)$/,
      handleGap,
      { autocomplete: ["gap-(col|row)-$spacing", "gap-(col|row)-<num>"] },
    ],
    [
      /^(?:grid-)?(rows|cols)-(\d+)$/,
      ([, c, d]) => ({
        [`grid-template-${rowCol(c)}`]: `repeat(${d},minmax(0,1fr))`,
        [`--subgrid-root-template-${rowCol(c)}`]: d,
      }),
      { autocomplete: "(grid-rows|grid-cols|rows|cols)-<num>" },
    ],
    [
      /^(?:grid-)?(row|col)-span-(.+)$/,
      ([, c, s]) => {
        if (s === "full") {
          return {
            [`grid-${rowCol(c)}`]: "1/-1",
            [`--subgrid-${rowCol(c)}-span`]: `var(--subgrid-root-template-${rowCol(c)}s)`,
          }
        }

        const v = h.bracket.number(s)

        if (v != null) {
          return {
            [`grid-${rowCol(c)}`]: `span ${v}/span ${v}`,
            [`--subgrid-${rowCol(c)}-span`]: v,
          }
        }
      },
      { autocomplete: "(grid-row|grid-col|row|col)-span-<num>" },
    ],
    [
      "grid-rows-subgrid",
      {
        "grid-template-rows": "repeat(var(--subgrid-row-span), minmax(0, 1fr))",
        gap: "var(--subgrid-column-gap) var(--subgrid-row-gap)",
      },
    ],
    [
      "grid-cols-subgrid",
      {
        "grid-template-columns":
          "repeat(var(--subgrid-column-span), minmax(0, 1fr))",
        gap: "var(--subgrid-column-gap) var(--subgrid-row-gap)",
      },
    ],
  ],
  shortcuts: {
    subgrid: "grid grid-rows-subgrid grid-cols-subgrid",
  },
}))
