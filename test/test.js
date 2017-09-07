var assert = require('assert');
var nx = require('next-js-core2');
require('../src/next-key-map');

describe('next/keyMap', function () {

  it('nx.keyMap -> for array', function () {
    var data = [{
      key: 'zhejiang',
      name: 'Zhejiang',
      child: [{
        key: 'hangzhou',
        name: 'Hangzhou',
        child: [{
          key: 'xihu',
          name: 'West Lake',
        }],
      }],
    }, {
      key: 'jiangsu',
      name: 'Jiangsu',
      child: [{
        key: 'nanjing',
        name: 'Nanjing',
        child: [{
          key: 'zhonghuamen',
          name: 'Zhong Hua Men',
        }],
      }],
    }];

    var rs = nx.keyMap( data,{
      key:'label__value',
    });

    console.log(rs);

    assert.deepEqual(rs[0].child,[{
      label__value: 'hangzhou',
      name: 'Hangzhou',
      child: [{
        label__value: 'xihu',
        name: 'West Lake',
      }],
    }] );
  });



  it('nx.keyMap -> for object', function () {
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

    console.log(rs);

    assert.deepEqual(rs[0].child,{
      id: '1',
      value: 'Zhong Hua Men',
      description: 'lsjdflsjdflsdjflsjdf'
    } );
  });

});

