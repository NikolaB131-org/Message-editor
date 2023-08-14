import { isEmptyObject } from '../utils/isEmptyObject';

describe('isEmptyObject', () => {
  it('Should return true if object is empty', () => {
    expect(isEmptyObject({})).toBe(true);
  });

  it('Should return false if object is not empty', () => {
    expect(isEmptyObject({ abc: 123 })).toBe(false);
  });
});
