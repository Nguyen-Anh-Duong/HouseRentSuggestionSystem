const Vtype = function (a, b, q) {
  if (a - b <= 0) return 0;
  else if (a - b <= q) return (a - b) / q;
  else return 1;
};

const Usualtype = function (a, b, direction) {
  if (a - b <= 0) return 0;
  else return 1;
};
const diffFunctions = {
  price: (a, b) => Vtype(-a, -b, 1000000), // Chênh lệch giá (giá thấp tốt hơn)
  area: (a, b) => Vtype(a, b, 5), // Chênh lệch diện tích (diện tích lớn tốt hơn)
  max_people: (a, b) => Usualtype(a, b), // Số người tối đa (nhiều người hơn tốt hơn)
  distance: (a, b) => Usualtype(-a, -b), // Khoảng cách (ngắn hơn tốt hơn)
  feature_satisfied: (a, b) => Usualtype(a, b), // Đặc điểm (được thỏa mãn nhiều hơn tốt hơn)
};

const calculatePromethee = function (normalizedRooms, criteriaWeights) {
  //số phương án
  const numOptions = normalizedRooms.length;

  // Chỉ giữ các tiêu chí cần thiết trong `normalizedRooms`
  const decisionMatrix = normalizedRooms.map((room) => {
    const { price, area, max_people, distance, feature_satisfied } = room;
    return { price, area, max_people, distance, feature_satisfied };
  });

  // Tính ma trận ưu tiên `preferenceMatrix`
  const preferenceMatrix = decisionMatrix.map((optionA) =>
    decisionMatrix.map((optionB) => {
      const preferenceScores = {};
      for (const criterion in diffFunctions) {
        // Tính mức độ khác biệt (d)
        const difference = diffFunctions[criterion](
          optionA[criterion],
          optionB[criterion]
        );
        preferenceScores[criterion] = difference;
      }
      return preferenceScores;
    })
  );

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
