import { VariablesObject } from '../MessagePreview';
import { isEmptyObject } from './isEmptyObject';
import { formatVariable, unformatVariable } from './formatVariable';
import { BlockType, BlockPart, SectionNode, Template } from '../hooks/useSectionsTree';

const replaceVariables = (text: string, variables: VariablesObject): string => {
  if (isEmptyObject(variables)) return text;

  const formattedVariables = Object.keys(variables).map(key => formatVariable(key));
  const regex = new RegExp(formattedVariables.join('|'), 'g'); // regex with all variables: firstname|lastname|...
  // Replaces all variables simultaneously
  return text.replace(regex, match => variables[unformatVariable(match)]);
};

const processBlock = (blockType: BlockType, values: VariablesObject, section: SectionNode): string => { // recursive
  const firstPart = section[blockType][BlockPart.First] ?? '';
  const middlePart = section[blockType][BlockPart.Middle];
  const lastPart = section[blockType][BlockPart.Last] ?? '';
  return firstPart + processSection(values, middlePart) + lastPart; // sum all parts together
};

const processSection = (values: VariablesObject, section?: SectionNode, ): string => { // recursive
  if (!section) return '';

  let ifBlock = processBlock(BlockType.If, values, section);
  ifBlock = replaceVariables(ifBlock, values); // replace variables in if block

  if (ifBlock) { // if ifBlock is not empty string
    return processBlock(BlockType.Then, values, section);
  } else {
    return processBlock(BlockType.Else, values, section);
  }
};

export function generateMessage(template: Template, values: VariablesObject): string {
  const message = (
    (template.rootSection[BlockPart.First] ?? '') +
    processSection(values, template.sections) +
    (template.rootSection[BlockPart.Last] ?? '')
  );

  return replaceVariables(message, values);
}
