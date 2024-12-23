const { calculateDistance } = require("../services/map.service");
const countMatchingFeatures = require("./countFeature");

//chuan hoa mot so gia tri
const normalizeRooms = async function (rooms, userLocation, requiredFeatures) {
  console.log(requiredFeatures)
  const normalizedRooms = await Promise.all(
    rooms.map(async (room) => {
      const roomDistance = await calculateDistance(userLocation, {
        latitude: room.latitude,
        longitude: room.longitude,
      });
      const feature_satisfied = countMatchingFeatures(room, requiredFeatures);
      return {
        ...room,
        distance: roomDistance,
        feature_satisfied,
      };
    })
  );
  return normalizedRooms;
};

module.exports = normalizeRooms;
