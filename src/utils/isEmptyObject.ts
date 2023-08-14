export function isEmptyObject(obj: object): boolean {
  for (const i in obj) return false;
  return true;
}
