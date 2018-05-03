var assert = require('assert');
var nx = require('next-js-core2');
require('../src/next-key-map');

describe('next/keyMap', function () {


  it('nx.keyMap -> replace array keys', function () {
    var data = [
      {"code":"A_T_01","name":"藏传"},
      {"code":"A_T_02","name":"珠玉"},
      {"code":"A_T_03","name":"钱币"}
    ];

    var rs = nx.keyMap( data, {
      code: 'route',
      name: 'content'
    });


    assert.deepEqual( rs ,
      [
        {"route":"A_T_01","content":"藏传"},
        {"route":"A_T_02","content":"珠玉"},
        {"route":"A_T_03","content":"钱币"}
      ]
    );
  });


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


    assert.deepEqual(
      rs[0].child[0].child,
      [{
        label__value: 'xihu',
        name: 'West Lake',
      }]
    );
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

    assert.deepEqual(rs,{
      id: '1',
      value: 'Zhong Hua Men',
      description: 'lsjdflsjdflsdjflsjdf'
    } );
  });



  it('nx.keyMap -> create a new object, but not change the data', function () {
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

    assert.equal( data === rs, false );
  });

  it('nx.keyMap -> with null key', function () {
    var data = {
      key: '1',
      name: null,
      desc: 'lsjdflsjdflsdjflsjdf'
    };

    var rs = nx.keyMap( data,{
      key:'id',
      name:'value',
      desc:'description'
    });

    assert.deepEqual(rs,{
      id: '1',
      value: null,
      description: 'lsjdflsjdflsdjflsjdf'
    } );
  });


  it('nx.keyMap replace & keep old value - target:object', function () {
    var obj = {
      id: '1',
      name: 'fei',
      otherValue: 'test value'
    };
    var rs = nx.keyMap(obj, {
      id: 'value',
      name: 'label'
    });

    assert.deepEqual(
      rs,
      {
        id: '1',
        name: 'fei',
        otherValue: 'test value',
        value: '1',
        label: 'fei'
      },
      true
    )
  });


  it('nx.keyMap replace & keep old value - target:array', function () {
    var arr = [
      {
        id: '1',
        name: 'fei',
        otherValue: 'test value'
      },
      {
        id: '2',
        name: 'afeiship',
        otherValue: 'test value by array'
      }
    ];
    var rs = nx.keyMap(arr, {
      id: 'value',
      name: 'label'
    },true);

    assert.deepEqual(
      rs,
      {
        id: '1',
        name: 'fei',
        otherValue: 'test value',
        value: '1',
        label: 'fei'
      },
      {
        id: '2',
        name: 'fei',
        otherValue: 'test value',
        value: '2',
        label: 'afeiship'
      }
    )
  });

});

