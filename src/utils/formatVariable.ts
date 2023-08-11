export function formatVariable(variable: string): string {
  return `{${variable}}`;
}

export function unformatVariable(formattedVariable: string): string {
  return formattedVariable.slice(1, -1); // deletes '{' and '}'
}
