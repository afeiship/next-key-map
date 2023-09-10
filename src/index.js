import nx from '@jswork/next';
import str2obj from '@jswork/str2kv';

const OBJECT = 'object';
const FUNCTION = 'function';
const UNDEF = 'undefined';
const DOT = '.';
const ONLY_MAP = ['value', 'label'];

nx.keyMap = function (inTarget, inMap, inIsKeepOld) {
  var destKey;
  var result = inTarget instanceof Array ? [] : {};
  var isOnlyTarget = arguments.length === 1;
  var map = typeof inMap === 'string' ? str2obj(inMap) : inMap;
  map = isOnlyTarget ? ONLY_MAP : map;

  // target: [1,2,3] map: ['id','name']
  var isRawArray = Array.isArray(inTarget) && Array.isArray(map);
  if (isRawArray) {
    return inTarget.map(function (item) {
      return map.reduce(function (acc, key) {
        acc[key] = item;
        return acc;
      }, {});
    });
  }

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

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = nx.keyMap;
}

export default nx.keyMap;
