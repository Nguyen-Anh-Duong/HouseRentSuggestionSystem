const Vtype = function (a, b, q) {
  if (a - b <= 0) return 0;
  else if (a - b <= q) return (a - b) / q;
  else return 1;
};

const Binary = function (a, b) {
  if (a - b <= 0) return 0;
  else return 1;
};

const Utype = function (a, b, q){
  if (a - b <=q) return 0;
  else return 1 
}

const LevelType = function(a,b){
  if (a - b <= 0) return 0;
  else if(a - b <= 1) return 0.25;
  else if( a - b <= 2) return 0.5;
  else if( a - b <= 3) return 0.75;
  else return 1;
}

const diffFunctions = {
  price: (a, b, q) => Vtype(-a, -b, q), // Chênh lệch giá (giá thấp tốt hơn)
  area: (a, b) => Binary(a, b), // Chênh lệch diện tích (diện tích lớn tốt hơn)
  max_people: (a, b) => Utype(a,b, 1), // Số người tối đa (nhiều người hơn tốt hơn)
  distance: (a, b) => LevelType(-a,-b), // Khoảng cách (ngắn hơn tốt hơn)
  feature_satisfied: (a, b) => Binary(a, b), // Đặc điểm (được thỏa mãn nhiều hơn tốt hơn)
  electricity_price: (a, b) => Utype(-a,-b, 2000),
  water_price: (a, b) => Utype(-a,-b, 2000)
};

const calculatePromethee = function (normalizedRooms, criteriaWeights, priceRange) {
  //số phương án
  const numOptions = normalizedRooms.length;

  // Chỉ giữ các tiêu chí cần thiết trong `normalizedRooms`
  const decisionMatrix = normalizedRooms.map((room) => {
    const { price, area, max_people, distance, feature_satisfied, electricity_price, water_price } = room;
    return { price, area, max_people, distance, feature_satisfied, electricity_price, water_price };
  });

  // Tính ma trận ưu tiên `preferenceMatrix`
  // console.log(decisionMatrix);
  const preferenceMatrix = decisionMatrix.map((optionA) =>
    decisionMatrix.map((optionB) => {
      const preferenceScores = {};
      for (const criterion in diffFunctions) {
        // Tính mức độ khác biệt (d)
        if ((criterion != "price")){
          const difference = diffFunctions[criterion](
            optionA[criterion],
            optionB[criterion]
          );
          preferenceScores[criterion] = difference;
        } 
        preferenceScores["price"] = diffFunctions["price"](optionA["price"],optionB["price"],priceRange)
      }
      return preferenceScores;
    })
  );

  // console.log(preferenceMatrix);
  // Tính ma trận ưu tiên trung bình `averagePreferenceMatrix`
  const averagePreferenceMatrix = preferenceMatrix.map((optionA) =>
    optionA.map((optionB) => {
      let totalPreference = 0;
      let index = 0;
      for (const criterion in optionB) {
        totalPreference += optionB[criterion] * criteriaWeights[index++];
      }
      return totalPreference;
    })
  );

  
 

  // Tính các giá trị phi cộng (phiPlus)
  const phiPlus = averagePreferenceMatrix.map((preferencesForOption) =>
    preferencesForOption.reduce((total, preference) => total + preference, 0)
  );


  // Tính các giá trị phi trừ (phiMinus)
  const phiMinus = Array(numOptions).fill(0);
  for (let i = 0; i < numOptions; i++) {
    for (let j = 0; j < numOptions; j++) {
      phiMinus[i] += averagePreferenceMatrix[j][i];
    }
  }

  // console.log(phiMinus)

  // Tính giá trị phi tổng hợp (phi)
  const netPhi = phiPlus.map(
    (positivePhi, index) => positivePhi - phiMinus[index]
  );

  return {
    rooms: normalizedRooms,
    decisionMatrix,
    preferenceMatrix,
    averagePreferenceMatrix,
    phi: { phiPlus, phiMinus, netPhi },
  };
};

module.exports = calculatePromethee;
