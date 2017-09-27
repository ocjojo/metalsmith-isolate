# metalsmith-isolate

A [Metalsmith](https://github.com/segmentio/metalsmith) plugin that isolates files by a pattern. This allows you to apply other metalsmith plugins only to specific files.

  - can match files by pattern

## Installation

    $ npm install metalsmith-isolate

## Usage

**by pattern** - this is just passing a globing pattern. The passed pattern can be a single pattern (as a string) or an array of globing patterns. For more information read the [multimatch patterns documentation](https://www.npmjs.com/package/multimatch#how-multiple-patterns-work).

```js
var isolate = require('metalsmith-isolate'),
	permalinks  = require('metalsmith-permalinks');

metalsmith.use(isolate(["*.md"]))
// apply other plugins only to *.md files
// e.g. permalinks
.use(permalinks({
	pattern: ':date/:title',
}))
// use empty selector to reset
.use(isolate());
```
