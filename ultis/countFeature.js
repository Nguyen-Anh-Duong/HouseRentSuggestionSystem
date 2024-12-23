const countMatchingFeatures = function (room, requireFeature) {
  let count = 0;
  for (const key in requireFeature) {
    if (requireFeature[key] == true) {
      room[key] == 1 ? count++ : count;
    }
  }
  return count;
};

module.exports = countMatchingFeatures;
