/*!
 * name: @feizheng/next-key-map
 * url: https://github.com/afeiship/next-key-map
 * version: 1.0.0
 * date: 2019-11-25T09:12:49.841Z
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var OBJECT = 'object';
  var FUNCTION = 'function';

  nx.keyMap = function(inTarget, inMap, inIsKeepOld) {
    var destKey;
    var result = inTarget instanceof Array ? [] : {};

    nx.each(inTarget, function(key, value, item) {
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

//# sourceMappingURL=next-key-map.js.map