import { SectionNode, BlockType } from '../hooks/useSectionsTree';

export function isSectionNode(obj: any): obj is SectionNode {
  return (
    typeof obj === 'object' && obj !== null &&
    'id' in obj &&
    BlockType.If in obj &&
    BlockType.Then in obj &&
    BlockType.Else in obj
  );
}
