(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var str2obj = require('@jswork/str2kv/dist/cjs');
  var OBJECT = 'object';
  var FUNCTION = 'function';
  var UNDEF = 'undefined';
  var DOT = '.';

  nx.keyMap = function (inTarget, inMap, inIsKeepOld) {
    var destKey;
    var result = inTarget instanceof Array ? [] : {};
    var map = typeof inMap === 'string' ? str2obj(inMap) : inMap;
    var hasDeepPath = Object.keys(map).some(function (key) {
      return key.includes(DOT);
    });

    nx.each(inTarget, function (key, value, item, isArray) {
      destKey = (typeof map === FUNCTION ? map(key, value, item) : map[key]) || key;
      if (!hasDeepPath) {
        result[destKey] = value;
      } else {
        !isArray &&
          nx.forIn(map, function (src, dst) {
            var dstValue = nx.get(item, src);
            if (typeof dstValue === UNDEF) {
              result[key] = value;
            } else {
              result[dst] = dstValue;
            }
          });
      }

      inIsKeepOld && (result[key] = inTarget[key]);

      if (value && typeof value === OBJECT) {
        result[destKey] = nx.keyMap(value, map, inIsKeepOld);
      }
    });

    return result;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.keyMap;
  }
})();
