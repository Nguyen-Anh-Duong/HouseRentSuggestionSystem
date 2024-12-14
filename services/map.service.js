const api_key = "qTAxmz4bRR8K83k1G7UPmlRFYa4kAZfm4IaEgl7J";

const getLocation = async function (address) {
  const response = await fetch(
    `https://rsapi.goong.io/geocode?address=${address}&api_key=${api_key}`
  );
  const data = await response.json();

  const { lat, lng } = data.results[0].geometry.location;
  const province = data.results[0].compound.province;

  return { latitude: lat, longitude: lng, city: province };
};

const calculateDistance = async function (origin, destination) {
  //console.log({ origin, destination });
  const response = await fetch(
    `https://rsapi.goong.io/direction?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&api_key=${api_key}`
  );
  const data = await response.json();
  //const url = `https://rsapi.goong.io/direction?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&api_key=${api_key}`;


  return data.routes[0].legs[0].distance.value;
};

module.exports = { getLocation, calculateDistance };
