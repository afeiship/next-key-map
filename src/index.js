import nx from '@jswork/next';
import str2obj from '@jswork/str2obj';

const OBJECT = 'object';
const FUNCTION = 'function';
const UNDEF = 'undefined';
const DOT = '.';

nx.keyMap = function (inTarget, inMap, inIsKeepOld) {
  let destKey;
  const result = inTarget instanceof Array ? [] : {};
  const map = typeof inMap === 'string' ? str2obj(inMap) : inMap;
  const hasDeepPath = Object.keys(map).some(function (key) {
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
