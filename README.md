# unocss-preset-subgrid

```html
<div class="grid grid-cols-8 gap-x-4 gap-y-12">
  <div class="col-span-4 grid grid-cols-4 gap-x-4 gap-y-12">
    <div class="col-span-2 grid grid-cols-2 gap-x-4 gap-y-12"></div>
  </div>
</div>
```

With `unocss-preset-subgrid`:

```html
<div class="grid grid-cols-8 gap-x-4 gap-y-12">
  <div class="col-span-4 subgrid">
    <div class="col-span-2 subgrid"></div>
  </div>
</div>
```

## Installation

```shell
npm install -D unocss-preset-subgrid
```

> [!WARNING]  
> This preset is based on `@unocss/preset-wind` or `@unocss/preset-uno`, please make sure they are included in the presets, otherwise it won't work as expected.

## Features

- Infers the `grid-template-rows|columns` properties form the `row|col-span-*` utility class.
- Infers the `gap` property from the root grid.

The plugin overrides the following default rules:

- `grid-rows-subgrid`: infers the `grid-template-rows` property from the `row-span-*` utility class.
- `grid-cols-subgrid`: infers the `grid-template-columns` property from the `col-span-*` utility class.

And adds the following shortcut:

- `subgrid`: applies `grid grid-rows-subgrid grid-cols-subgrid`.

## Basic usage

### Infer everything

```html
<div class="grid grid-cols-8 gap-x-4 gap-y-12">
  <div class="col-span-4 subgrid"></div>
</div>
```

### Override the inferred gap

```html
<div class="grid grid-cols-8 gap-x-4 gap-y-12">
  <div class="col-span-4 subgrid gap-y-8"></div>
</div>
```

## License

MIT
