# next-key-map
> Recursion replace object key use map.

## install:
```bash
npm install -S afeiship/next-key-map --registry=https://registry.npm.taobao.org
```

## apis:
| API    | TYPE                    | DESCRIPTION          |
|--------|-------------------------|----------------------|
| keyMap | { sourceKey: targetKey} | Map source to target |

## usage:
```js
var data = {
  key: '1',
  name: 'Zhong Hua Men',
  desc: 'lsjdflsjdflsdjflsjdf'
};

var rs = nx.keyMap( data,{
  key:'id',
  name:'value',
  desc:'description'
});

// results:
var data = {
  id: '1',
  value: 'Zhong Hua Men',
  desc: 'lsjdflsjdflsdjflsjdf'
};
```
