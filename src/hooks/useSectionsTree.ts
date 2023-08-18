import { useState } from 'react';
import { isSectionNode } from '../utils/isSectionNode';
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

export type BlockNode = (SectionNode | string)[];

export type Template = {
  availableId: number;
  rootBlock: BlockNode;
};

const getFirstSubstring = (textarea: HTMLTextAreaElement) => textarea.value.substring(0, textarea.selectionStart);
const getSecondSubsting = (textarea: HTMLTextAreaElement) => textarea.value.substring(textarea.selectionEnd);

const START_AVAILABLE_ID = 1;

export function useSectionsTree(template: Template | null) {
  // ID for next new section node
  const [availableId, setAvailableId] = useState<Template['availableId']>(template?.availableId ?? START_AVAILABLE_ID);
  const [rootBlock, setRootBlock] = useState<Template['rootBlock']>(template?.rootBlock ?? ['']);

  const getSerializedTemplate = (): string => {
    const template: Template = { availableId, rootBlock };
    return JSON.stringify(template);
  };

  const getTemplate = (): Template => ({ availableId, rootBlock });

  const findNode = (id: number, node: SectionNode): SectionNode | null => { // recursive private function
    if (node.id === id) return node;

    for (const blockType of Object.values(BlockType)) { // recursive search in each block of section
      for (const section of node[blockType]) {
        if (!isSectionNode(section)) continue;

        const foundNode = findNode(id, section);
        if (foundNode) return foundNode;
      }
    }

    return null;
  };

  const deleteNode = (id: number, block: BlockNode) => { // recursive private function (modifies node)
    for (let i = 0; i < block.length; i++) {
      const section = block[i];
      if (!isSectionNode(section)) continue;

      if (section.id === id) {
        block[i - 1] = (block[i - 1] as string) + (block[i + 1] as string); // replace first text with merged text
        block.splice(i, 2); // delete SectionNode and text after from block
        break;
      }
      // Run deleteNode recursively for each block
      Object.values(BlockType).forEach(blockType => deleteNode(id, section[blockType]));
    };
  };


  // Updates text in textarea in tree
  const setText = (
    text: string,
    positionIndex: number,
    sectionId?: number,
    parentBlockType?: BlockType,
  ) => {
    setRootBlock(prev => {
      const newRoot: BlockNode = JSON.parse(JSON.stringify(prev)); // deep clone

      if (sectionId && parentBlockType) {
          for (const section of newRoot) {
            if (!isSectionNode(section)) continue;

            const foundNode = findNode(sectionId, section);
            if (foundNode) {
              foundNode[parentBlockType][positionIndex] = text; // set text (modifies section)
              break;
            }
          }
      } else { // if (sectionId && parentBlockType) is undefined, then selected textarea on first level
        newRoot[positionIndex] = text;
      }

      return newRoot;
    });
  };


  const addVariable = (variable: string, selectedTextareaData?: SelectedTextareaData) => {
    if (selectedTextareaData) {
      const { textarea, parentPositionIndex, sectionId, parentBlockType } = selectedTextareaData;

      const newText = getFirstSubstring(textarea) + variable + getSecondSubsting(textarea);
      setText(newText, parentPositionIndex, sectionId, parentBlockType);
    } else {
      setText(rootBlock[0] + variable, 0);
    }
  };


  const addSection = ({ sectionId, parentBlockType, parentPositionIndex, textarea }: SelectedTextareaData) => {
    const emptyNode: SectionNode = {
      id: availableId,
      ifBlock: [],
      thenBlock: [],
      elseBlock: [],
    };

    setRootBlock(prev => {
      const newRoot: BlockNode = JSON.parse(JSON.stringify(prev)); // deep clone

      if (sectionId && parentBlockType) {
        for (const section of newRoot) {
          if (!isSectionNode(section)) continue;

          const foundNode = findNode(sectionId, section);
          // If node not found or SectionNode already created, exit
          if (!foundNode || foundNode[parentBlockType][parentPositionIndex + 1]) continue;

          foundNode[parentBlockType][parentPositionIndex] = getFirstSubstring(textarea); // set first part of splitted string
          foundNode[parentBlockType].push(emptyNode); // add new SectionNode
          foundNode[parentBlockType].push(getSecondSubsting(textarea)); // add last part of splitted string

          setAvailableId(prev => prev + 1); // increase available id
          break;
        }
      } else if (!prev[parentPositionIndex + 1]) { // if textarea on first level selected and node not already created
        newRoot[parentPositionIndex] = getFirstSubstring(textarea); // set first part of splitted string
        newRoot.push(emptyNode); // add new SectionNode
        newRoot.push(getSecondSubsting(textarea)); // add last part of splitted string

        setAvailableId(prev => prev + 1); // increase available id
      }

      return newRoot;
    });
  };


  const deleteSection = (id: number) => {
    setRootBlock(prev => {
      const newRoot: BlockNode = JSON.parse(JSON.stringify(prev)); // deep clone
      deleteNode(id, newRoot); // deletes in place
      if (newRoot.length === 1) { // if length = 1, then there is no sections
        setAvailableId(START_AVAILABLE_ID); // reset available id
      }
      return newRoot;
    });
  };

  return {
    rootBlock,
    getSerializedTemplate,
    getTemplate,
    setText,
    addVariable,
    addSection,
    deleteSection,
  };
}
