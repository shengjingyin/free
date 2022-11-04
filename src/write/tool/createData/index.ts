/**
 *
 * @param {}  -
 * @returns {}
 * @example createData(2, 3) -> { data: { '0': 0, '1': 1, '2': 2, data: { '0': 0, '1': 1, '2': 2 } } }
 */
export function createData(deep, breadth) {
  const data = {};
  let temp = data;

  for (let i = 0; i < deep; i++) {
    temp = temp['data'] = {};
    for (let j = 0; j < breadth; j++) {
      temp[j] = j;
    }
  }

  return data;
}
