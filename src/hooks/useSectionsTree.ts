import { useState } from 'react';
import { SelectedTextareaData } from '../MessageEditor';

export enum BlockType {
  If = 'ifBlock',
  Then = 'thenBlock',
  Else = 'elseBlock',
}

export type SectionNode = {
  id: number;
  [BlockType.If]: BlockNode;
  [BlockType.Then]: BlockNode;
  [BlockType.Else]: BlockNode;
};

export enum BlockPart {
  First = 'firstPart',
  Middle = 'middlePart',
  Last = 'lastPart',
}

export type BlockNode = {
  [BlockPart.First]?: string;
  [BlockPart.Middle]?: SectionNode;
  [BlockPart.Last]?: string;
};

export type RootSection = {
  [BlockPart.First]?: string;
  [BlockPart.Last]?: string;
};

export type Template = {
  availableId: number;
  rootSection: RootSection;
  sections?: SectionNode;
};

const getFirstSubstring = (textarea: HTMLTextAreaElement) => textarea.value.substring(0, textarea.selectionStart);
const getSecondSubsting = (textarea: HTMLTextAreaElement) => textarea.value.substring(textarea.selectionEnd);
const mergeParts = (first?: string, second?: string) => (first ?? '') + (second ?? '');

const START_AVAILABLE_ID = 1;

export function useSectionsTree(template: Template | null) {
  const [availableId, setAvailableId] = useState<Template['availableId']>(template?.availableId ?? START_AVAILABLE_ID);
  const [rootSection, setRootSection] = useState<Template['rootSection']>(template?.rootSection ?? {});
  const [sectionsTree, setSectionsTree] = useState<Template['sections']>(template?.sections);

  const getSerializedTemplate = (): string => {
    const template: Template = { availableId, rootSection, sections: sectionsTree };
    return JSON.stringify(template);
  };

  const findNode = (id: number, node?: SectionNode): SectionNode | undefined => { // recursive private function
    if (!node) return undefined;
    if (node && node.id === id) return node;

    for (const blockType of Object.values(BlockType)) {
      const foundNode = findNode(id, node[blockType][BlockPart.Middle]);
      if (foundNode) return foundNode;
    }

    return undefined;
  };

  const deleteNode = (id: number, node?: SectionNode) => { // recursive private function (modifies node)
    if (!node) return false;
    if (node.id === id) return true;

    for (const blockType of Object.values(BlockType)) { // for each block of section
      if (deleteNode(id, node[blockType][BlockPart.Middle])) { // if required id found
        delete node[blockType][BlockPart.Middle];
        node[blockType][BlockPart.First] = mergeParts( // merge first and last texts
          node[blockType][BlockPart.First],
          node[blockType][BlockPart.Last]
        );
      }
    }

    return false;
  };


  // Updates text in textarea of sections tree
  const setText = (
    text: string,
    parentBlockPart: Exclude<BlockPart, BlockPart.Middle>,
    parentBlockType?: BlockType,
    id?: number
  ) => {
    if (parentBlockType && id) {
      setSectionsTree(prevTree => {
        if (!prevTree) return prevTree; // if prevTree is undefined
        const newSectionsTree = { ...prevTree }; /// deep clone
        const foundNode = findNode(id, newSectionsTree);
        if (!foundNode) return prevTree; // if node is not found

        if (text) {
          foundNode[parentBlockType][parentBlockPart] = text;
        } else {
          delete foundNode[parentBlockType][parentBlockPart]; // prevents blank strings ('') in tree
        }
        return newSectionsTree;
      });
    } else { // if parentBlockType && id is undefined, then it's root section
      setRootSection(prev => ({ ...prev, [parentBlockPart]: text }));
    }
  };


  const addSection = ({ sectionId, blockType, textarea }: SelectedTextareaData) => {
    const emptySectionNode: SectionNode = {
      id: availableId,
      ifBlock: {},
      thenBlock: {},
      elseBlock: {},
    };

    if (sectionsTree && sectionId && blockType && textarea) {
      setSectionsTree(prevTree => {
        if (!prevTree) return prevTree; // if prevTree is undefined
        const newSectionsTree = { ...prevTree };
        const foundNode = findNode(sectionId, newSectionsTree);
        // If node not found or SectionNode already created
        if (!foundNode || foundNode[blockType][BlockPart.Middle]) return prevTree;

        foundNode[blockType][BlockPart.First] = getFirstSubstring(textarea); // set first part of splitted string
        foundNode[blockType][BlockPart.Middle] = emptySectionNode; // add new SectionNode
        foundNode[blockType][BlockPart.Last] = getSecondSubsting(textarea); // set last part of splitted string
        return newSectionsTree;
      });
      setAvailableId(prev => prev + 1); // increase available id
    } else if (!sectionsTree) { // if rootSection chosen
      setSectionsTree(emptySectionNode); // creates empty section
      if (textarea) { // if textarea selected, then we need divide text
        setRootSection({
          [BlockPart.First]: getFirstSubstring(textarea),
          [BlockPart.Last]: getSecondSubsting(textarea),
        });
      }
      setAvailableId(prev => prev + 1); // increase available id
    }
  };


  const deleteSection = (id: number) => {
    if (id === START_AVAILABLE_ID) { // if rootSection chosen
      setRootSection(prev => ({ // merge first and last texts
        [BlockPart.First]: mergeParts(prev[BlockPart.First], prev[BlockPart.Last]),
        [BlockPart.Last]: undefined,
      }));
      setSectionsTree(undefined); // clear sections tree
      setAvailableId(START_AVAILABLE_ID); // reset available id
    } else {
      setSectionsTree(prevTree => {
        if (!prevTree) return prevTree; // if prevTree is undefined
        const newSectionsTree = { ...prevTree };
        deleteNode(id, newSectionsTree);
        return newSectionsTree;
      })
    }
  };


  return { rootSection, setRootSection, sectionsTree, getSerializedTemplate, setText, addSection, deleteSection };
}
