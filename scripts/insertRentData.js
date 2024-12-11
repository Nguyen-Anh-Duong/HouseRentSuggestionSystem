const RentInfor = require("../models/rentInfor.model");

const rentMockData = require("../sampleDatas/sampleRentData");

(async () => {
  try {
    await RentInfor.bulkCreate(rentMockData);
    console.log("Mock data inserted successfully!");
  } catch (error) {
    console.error("Error inserting mock data:", error);
  }
})();
