# next-key-map
> Recursion replace object key use map.


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

```
