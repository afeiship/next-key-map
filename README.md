# next-key-map
> Recursion replace object key use map.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-key-map
```

## apis
| API    | TYPE                    | DESCRIPTION          |
| ------ | ----------------------- | -------------------- |
| keyMap | { sourceKey: targetKey} | Map source to target |

## usage
```js
import '@jswork/next-key-map';

const data = {
  key: '1',
  name: 'Zhong Hua Men',
  desc: 'lsjdflsjdflsdjflsjdf'
};

const rs = nx.keyMap( data,{
  key:'id',
  name:'value',
  desc:'description'
});

// results:
const data = {
  id: '1',
  value: 'Zhong Hua Men',
  description: 'lsjdflsjdflsdjflsjdf'
};
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-key-map/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-key-map
[version-url]: https://npmjs.org/package/@jswork/next-key-map

[license-image]: https://img.shields.io/npm/l/@jswork/next-key-map
[license-url]: https://github.com/afeiship/next-key-map/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-key-map
[size-url]: https://github.com/afeiship/next-key-map/blob/master/dist/next-key-map.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-key-map
[download-url]: https://www.npmjs.com/package/@jswork/next-key-map
