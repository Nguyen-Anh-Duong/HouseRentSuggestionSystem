const { distance } = require("../services/map.service");
const countFeature = require("./countFeature");

const normalize = async function (suggestRoom, origin, requireFeature) {
  const updateDistance = await Promise.all(
    suggestRoom.map(async (room, index) => {
      const dist = await distance(origin, room.address);
      return {
        ...room,
        distance: dist,
        feature_satisfied:
          !requireFeature || !requireFeature.length
            ? suggestRoom[index].feature.length
            : countFeature(suggestRoom[index].feature, requireFeature),
      };
    })
  );
  return updateDistance;
};

module.exports = normalize;
