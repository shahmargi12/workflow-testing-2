# Text Overflow Tooltip

![npm version](https://img.shields.io/npm/v/xsada-dsadsad-dsadad-workflow)
![downloads](https://img.shields.io/npm/dt/xsada-dsadsad-dsadad-workflow.svg)
[![Contributors](https://img.shields.io/github/contributors/shahmargi12/tooltipprivate.svg)](https://github.com/shahmargi12/tooltipprivate/graphs/contributors)

## Table of Contents

-   [Description](#description)
-   [Prerequisites](#prerequisites)
-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Props](#props)
-   [Examples](#examples)
-   [License](#license)

## Description

TextOverflowTooltip is a lightweight React component library for displaying tooltips on text overflow. It shows a tooltip when the text overflows its container, providing a better user experience for handling long text strings.

## Prerequisites

Make sure you're using below mentioned versions:

- **Node.js**: >= 16.0.0
- **React**: >= 17.0.0

## Features:

-   Overflowed tooltip (tooltip is visible on hover only if hovered element is overflowed.)
-   Normal tooltip (tooltip is visible on hover)
-   Show/Hide Arrow in tooltip
-   Adjust tooltip position based on your needs (tooltipPosition prop)
-   Adjust arrow position (arrowPosition prop)
-   Follows [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) standards

## Installation

```sh
npm install text-overflow-tooltip
```

or

```sh
yarn add text-overflow-tooltip
```

## Usage

1 . Import `text-overflow-tooltip` after installation.

```js
import { Tooltip } from 'text-overflow-tooltip';
```

2 . Use Tooltip.

```js
import { Tooltip } from 'text-overflow-tooltip';

const Demo = () => {
    return (
        <Tooltip title="You are checking how to use text-overflow-tooltip">
            {/* Overflowed text */}
            <div>You are checking how to use text-overflow-tooltip</div>
        </Tooltip>
    );
};
```

## Props

| Prop Name           | Type                   | Default    | Required | Description                                                                                                                              |
| ------------------- | ---------------------- | ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `title`             | `React.ReactNode`      | `-`        | `true`   | React node element to display in tooltip                                                                                                 |
| `children`          | `JSX.Element`          | `-`        | `true`   | Children element which triggers the tooltip on hover                                                                                     |
| `arrow`             | `boolean`              | `false`    | `false`  | To show / hide the tooltip arrow                                                                                                         |
| `tooltipPosition`   | `TooltipPosition`      | `"bottom"` | `false`  | Position of the tooltip. Options: `"top"`, `"bottom"`, `"left"`, `"right"`, `"top-start"`, `"bottom-start"`, `"top-end"`, `"bottom-end"` |
| `className`         | `string`               | `''`       | `false`  | className to override style of tooltip                                                                                                   |
| `tooltipOnOverflow` | `boolean`              | `true`     | `false`  | Tooltip is visible when content is overflowed                                                                                            |
| `arrowPosition`     | `TooltipArrowPosition` | `"center"` | `false`  | Position of the arrow in tooltip. Works only if arrow prop is set to true. Options: `"center"`, `"left"`, `"right"`                      |

## Examples

### Overflow Tooltip

```js
import { Tooltip } from 'text-overflow-tooltip';

const Demo = () => {
    return (
        <Tooltip title="Tooltip title" tooltipOnOverflow={false}>
            {/* Overflowed text */}
            <div>You are checking how to use text-overflow-tooltip</div>
        </Tooltip>
    );
};
```

### Normal Tooltip

```js
import { Tooltip } from 'text-overflow-tooltip';

const Demo = () => {
    return (
        <Tooltip title="Tooltip Title" tooltipOnOverflow={false}>
            <div>Hover me</div>
        </Tooltip>
    );
};
```

### Tooltip With Arrow

```js
import { Tooltip } from 'text-overflow-tooltip';

const Demo = () => {
    return (
        <Tooltip title="Tooltip Title" tooltipOnOverflow={false} arrow={true}>
            <div>Hover me</div>
        </Tooltip>
    );
};
```

### Tooltip Position

```js
import { Tooltip } from 'text-overflow-tooltip';

const Demo = () => {
    return (
        <Tooltip title="Tooltip Title" tooltipOnOverflow={false} arrow={true} tooltipPosition="top">
            <div>Hover me</div>
        </Tooltip>
    );
};
```

### Tooltip Arrow Position

```js
import { Tooltip } from 'text-overflow-tooltip';

const Demo = () => {
    return (
        <Tooltip
            title="Tooltip Title"
            tooltipOnOverflow={false}
            arrow={true}
            tooltipPosition="top"
            arrowPosition="left"
        >
            <div>Hover me</div>
        </Tooltip>
    );
};
```

## License

[Apache](LICENSE.md)
