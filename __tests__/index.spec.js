require('../src');

describe('api.basic test', () => {
  test('nx.keyMap -> replace array keys', function () {
    var data = [
      { code: 'A_T_01', name: '藏传' },
      { code: 'A_T_02', name: '珠玉' },
      { code: 'A_T_03', name: '钱币' }
    ];

    var rs = nx.keyMap(data, {
      code: 'route',
      name: 'content'
    });

    expect(rs).toEqual([
      { route: 'A_T_01', content: '藏传' },
      { route: 'A_T_02', content: '珠玉' },
      { route: 'A_T_03', content: '钱币' }
    ]);
  });

  test('nx.keyMap -> for array', function () {
    var data = [
      {
        key: 'zhejiang',
        name: 'Zhejiang',
        child: [
          {
            key: 'hangzhou',
            name: 'Hangzhou',
            child: [
              {
                key: 'xihu',
                name: 'West Lake'
              }
            ]
          }
        ]
      },
      {
        key: 'jiangsu',
        name: 'Jiangsu',
        child: [
          {
            key: 'nanjing',
            name: 'Nanjing',
            child: [
              {
                key: 'zhonghuamen',
                name: 'Zhong Hua Men'
              }
            ]
          }
        ]
      }
    ];

    var rs = nx.keyMap(data, {
      key: 'label__value'
    });

    expect(rs[0].child[0].child).toEqual([
      {
        label__value: 'xihu',
        name: 'West Lake'
      }
    ]);
  });

  test('nx.keyMap -> for object', function () {
    var data = {
      key: '1',
      name: 'Zhong Hua Men',
      desc: 'lsjdflsjdflsdjflsjdf'
    };

    var rs = nx.keyMap(data, {
      key: 'id',
      name: 'value',
      desc: 'description'
    });

    expect(rs).toEqual({
      id: '1',
      value: 'Zhong Hua Men',
      description: 'lsjdflsjdflsdjflsjdf'
    });
  });

  test('nx.keyMap -> create a new object, but not change the data', function () {
    var data = {
      key: '1',
      name: 'Zhong Hua Men',
      desc: 'lsjdflsjdflsdjflsjdf'
    };

    var rs = nx.keyMap(data, {
      key: 'id',
      name: 'value',
      desc: 'description'
    });

    expect(data === rs).toBe(false);
  });

  test('nx.keyMap -> with null key', function () {
    var data = {
      key: '1',
      name: null,
      desc: 'lsjdflsjdflsdjflsjdf'
    };

    var rs = nx.keyMap(data, {
      key: 'id',
      name: 'value',
      desc: 'description'
    });

    expect(rs).toEqual({
      id: '1',
      value: null,
      description: 'lsjdflsjdflsdjflsjdf'
    });
  });

  test('nx.keyMap replace & keep old value - target:object', function () {
    var obj = {
      id: '1',
      name: 'fei',
      otherValue: 'test value'
    };
    var rs = nx.keyMap(
      obj,
      {
        id: 'value',
        name: 'label'
      },
      true
    );

    expect(rs).toEqual({
      id: '1',
      name: 'fei',
      otherValue: 'test value',
      value: '1',
      label: 'fei'
    });
  });

  test('nx.keyMap replace & keep old value - target:array', function () {
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

    var rs = nx.keyMap(
      arr,
      {
        id: 'value',
        name: 'label'
      },
      true
    );

    expect(rs).toEqual([
      {
        id: '1',
        name: 'fei',
        otherValue: 'test value',
        value: '1',
        label: 'fei'
      },
      {
        id: '2',
        name: 'afeiship',
        otherValue: 'test value by array',
        value: '2',
        label: 'afeiship'
      }
    ]);
  });

  test('nx.keyMap replace with function', function () {
    var map = {
      'src/pages/customer/home/app': '././src/pages/customer/home/app.js',
      'src/pages/home/app': '././src/pages/home/app.js'
    };

    var rs = nx.keyMap(map, function (key) {
      return key.slice(10, -4);
    });

    expect(rs).toEqual({
      'customer/home': '././src/pages/customer/home/app.js',
      home: '././src/pages/home/app.js'
    });
  });

  test('nx.keyMap support dot.path', () => {
    const items = [
      {
        id: 15,
        status: 'W',
        student: { id: 3, realname: '小明', photo: 'default-avatar.png' }
      },
      {
        id: 65,
        status: 'R',
        student: { id: 7, realname: '测试3号', photo: 'default-avatar.png' }
      },
      { id: 115, status: 'R', student: { id: 8, realname: 'H彩', photo: 'default-avatar.png' } }
    ];

    const res1 = nx.keyMap(items, {
      'student.id': 'value',
      'student.realname': 'label'
    });

    const res2 = nx.keyMap(
      items,
      {
        'student.id': 'value',
        'student.realname': 'label'
      },
      true
    );

    expect(res1).toEqual([
      {
        value: 3,
        label: '小明',
        student: { id: 3, realname: '小明', photo: 'default-avatar.png' }
      },
      {
        value: 7,
        label: '测试3号',
        student: { id: 7, realname: '测试3号', photo: 'default-avatar.png' }
      },
      {
        value: 8,
        label: 'H彩',
        student: { id: 8, realname: 'H彩', photo: 'default-avatar.png' }
      }
    ]);
    expect(res2).toEqual([
      {
        value: 3,
        label: '小明',
        id: 15,
        status: 'W',
        student: { id: 3, realname: '小明', photo: 'default-avatar.png' }
      },
      {
        value: 7,
        label: '测试3号',
        id: 65,
        status: 'R',
        student: { id: 7, realname: '测试3号', photo: 'default-avatar.png' }
      },
      {
        value: 8,
        label: 'H彩',
        id: 115,
        status: 'R',
        student: { id: 8, realname: 'H彩', photo: 'default-avatar.png' }
      }
    ]);
  });

  test('keymap can be in kv string', () => {
    var obj = { id: 1, name: 'fei' };
    var rs = nx.keyMap(obj, 'id:value; name:label');
    expect(rs).toEqual({ value: 1, label: 'fei' });
  });

  test('raw string [] shoud be mapping to kv pairs', () => {
    var names = ['fei', 'afei', 'ship'];
    var rs = nx.keyMap(names, ['value', 'label']);
    expect(rs).toEqual([
      { value: 'fei', label: 'fei' },
      { value: 'afei', label: 'afei' },
      { value: 'ship', label: 'ship' }
    ]);
  });
});
