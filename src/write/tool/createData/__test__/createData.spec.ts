import { createData } from '../index';

describe('mock data', () => {
  it('create data deep and breadth', () => {
    const data = createData(2, 3); // { data: { '0': 0, '1': 1, '2': 2, data: { '0': 0, '1': 1, '2': 2 } } }
    expect(Object.keys(data).length).toBe(1);
  });
});
