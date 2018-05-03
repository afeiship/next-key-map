(function () {

  var global = global || this || self || window;
  var nx = global.nx || require('next-js-core2');
  var OBJECT = 'object';


  nx.keyMap = function (inTarget, inMap, inIsKeepOld) {
    var destKey;
    var result = (inTarget instanceof Array) ? [] : {};

    nx.each(inTarget, function (key, value) {
      destKey = inMap[key] || key;
      result[destKey] = value;
      inIsKeepOld && (result[key] = inTarget[key])

      if (value && typeof value === OBJECT) {
        result[destKey] = nx.keyMap(value, inMap);
      }
    });

    return result;
  };


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.keyMap;
  }

}());
