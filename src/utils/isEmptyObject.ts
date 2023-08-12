export function isEmptyObject(obj: object) {
  for (const i in obj) return false;
  return true;
}
