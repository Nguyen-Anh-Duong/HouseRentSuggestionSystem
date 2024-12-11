const Utype = function (a, b, q) {
  if (a - b <= 0) return 0;
  else if (a - b <= q) return (a - b) / q;
  else return 1;
};

const Vtype = function (a, b, direction) {
  if (a - b <= 0) return 0;
  else return 1;
};
const diffFunctions = {
  price: (a, b) => Utype(-a, -b, 1000000), // Chênh lệch giá (giá thấp tốt hơn)
  area: (a, b) => Utype(a, b, 5), // Chênh lệch diện tích (diện tích lớn tốt hơn)
  max_people: (a, b) => Vtype(a, b), // Số người tối đa (nhiều người hơn tốt hơn)
  distance: (a, b) => Vtype(-a, -b), // Khoảng cách (ngắn hơn tốt hơn)
  feature_satisfied: (a, b) => Vtype(a, b), // Đặc điểm (được thỏa mãn nhiều hơn tốt hơn)
};

const promethee = function (suggestRoom) {
  const len = suggestRoom.length;
  const matrix = [];
  for (let i = 0; i < len; i++) {
    const solution = {};
    const { price, area, max_people, distance, feature_satisfied } =
      suggestRoom[i];
    Object.assign(solution, {
      price,
      area,
      max_people,
      distance,
      feature_satisfied,
    });
    matrix.push(solution);
  }

  //   console.log(matrix);

  // for (let i = 0; i < len; i++) {
  //   for (let j = 0; j != i && j < len; j++) {
  //     const preferences = {};
  //     // for (const [key, direction] of Object.entries(criteria)){
  //     //     const diff = matrix[i][key] - matrix[j][key];
  //     //     preferences[key] = x``
  //     // }
  //     for (const key in diffFunctions) {
  //         const diff = diffFunctions[key](matrix[i][key] , matrix[j][key]);
  //         preferences[key] = diff; // Ưu tiên chỉ nhận giá trị >= 0
  //       }
  //   }
  // }
  const preferenceMatrix = matrix.map((optionA) =>
    matrix.map((optionB) => {
      const preferences = {};
      for (const key in diffFunctions) {
        const diff = diffFunctions[key](optionA[key], optionB[key]);
        preferences[key] = diff;
      }
      return preferences;
    })
  );

  const phiPlus = matrix.map((_, i) =>
    preferenceMatrix[i].reduce(
      (acc, prefs) =>
        acc + Object.values(prefs).reduce((sum, val) => sum + val, 0),
      0
    )
  );

  const phiMinus = matrix.map((_, i) =>
    preferenceMatrix.reduce(
      (acc, row) =>
        acc + Object.values(row[i]).reduce((sum, val) => sum + val, 0),
      0
    )
  );

  const phi = phiPlus.map((plus, i) => plus - phiMinus[i]);

  return suggestRoom
    .map((room, index) => ({ room, phi: phi[index] }))
    .sort((a, b) => b.phi - a.phi);
};

module.exports = promethee;
