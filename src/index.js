(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var OBJECT = 'object';
  var FUNCTION = 'function';

  nx.keyMap = function (inTarget, inMap, inIsKeepOld) {
    var destKey;
    var result = inTarget instanceof Array ? [] : {};

    nx.each(inTarget, function (key, value, item) {
      destKey = (typeof inMap === FUNCTION ? inMap(key, value, item) : inMap[key]) || key;
      result[destKey] = value;
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
