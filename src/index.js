(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var OBJECT = 'object';
  var FUNCTION = 'function';
  var UNDEF = 'undefined';
  var DOT = '.';

  nx.keyMap = function (inTarget, inMap, inIsKeepOld) {
    var destKey;
    var result = inTarget instanceof Array ? [] : {};
    var hasDeepPath = Object.keys(inMap).some(function (key) {
      return key.includes(DOT);
    });

    nx.each(inTarget, function (key, value, item, isArray) {
      destKey = (typeof inMap === FUNCTION ? inMap(key, value, item) : inMap[key]) || key;
      if (!hasDeepPath) {
        result[destKey] = value;
      } else {
        !isArray &&
          nx.forIn(inMap, function (src, dst) {
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
        result[destKey] = nx.keyMap(value, inMap, inIsKeepOld);
      }
    });

    return result;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.keyMap;
  }
})();
