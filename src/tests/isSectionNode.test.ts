import { isSectionNode } from '../utils/isSectionNode';

describe('isSectionNode', () => {
  it('Should return true if value is SectionNode', () => {
    const section = {
      id: 1,
      ifBlock: [],
      thenBlock: [],
      elseBlock: [],
    };
    expect(isSectionNode(section)).toBe(true);
  });

  it('Should return false if value is not SectionNode', () => {
    expect(isSectionNode(null)).toBe(false);
    expect(isSectionNode('123')).toBe(false);
    expect(isSectionNode({ id: 123, abc: 123 })).toBe(false);
  });
});
