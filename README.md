# next-key-map
> Recursion replace object key use map.

## installation
```bash
npm install -S @feizheng/next-key-map
```

## apis
| API    | TYPE                    | DESCRIPTION          |
|--------|-------------------------|----------------------|
| keyMap | { sourceKey: targetKey} | Map source to target |

## usage
```js
import '@feizheng/next-key-map';

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
  desc: 'lsjdflsjdflsdjflsjdf'
};
```
