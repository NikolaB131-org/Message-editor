import { formatVariable, unformatVariable } from '../utils/formatVariable';

describe('formatVariable', () => {
  it('should return formatted variable', () => {
    const variable = 'firstname';
    expect(formatVariable(variable)).toBe(`{${variable}}`);
  });

  it('should return unformatted variable', () => {
    const variable = '{firstname}';
    expect(unformatVariable(variable)).toBe(variable.slice(1, -1));
  });
});
