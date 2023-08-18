import { VariablesObject } from '../MessagePreview';
import { isEmptyObject } from './isEmptyObject';
import { formatVariable, unformatVariable } from './formatVariable';
import { BlockNode, BlockType, SectionNode, Template } from '../hooks/useSectionsTree';
import { isSectionNode } from './isSectionNode';

const replaceVariables = (text: string, variables: VariablesObject): string => {
  if (isEmptyObject(variables)) return text;

  const formattedVariables = Object.keys(variables).map(key => formatVariable(key));
  const regex = new RegExp(formattedVariables.join('|'), 'g'); // regex with all variables: firstname|lastname|...
  // Replaces all variables simultaneously
  return text.replace(regex, match => variables[unformatVariable(match)]);
};

const processBlock = (block: BlockNode, values: VariablesObject): string => { // recursive
  let sum = '';
  for (const part of block) { // sum all parts together
    sum += isSectionNode(part) ? processSection(values, part) : part;
  }
  return sum;
};

const processSection = (values: VariablesObject, section: SectionNode): string => { // recursive
  let ifBlock = processBlock(section[BlockType.If], values);
  ifBlock = replaceVariables(ifBlock, values); // replace variables in if block

  if (ifBlock) { // if ifBlock is not empty string
    return processBlock(section[BlockType.Then], values);
  } else {
    return processBlock(section[BlockType.Else], values);
  }
};

export function generateMessage(template: Template, values: VariablesObject): string {
  const message = processBlock(template.rootBlock, values);
  return replaceVariables(message, values);
}
