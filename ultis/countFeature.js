const countFeature = function (availableFeature, requireFeature) {
  let count = 0;
  requireFeature.map((e) => (availableFeature.includes(e) ? count++ : count));
  return count;
};

module.exports = countFeature;
