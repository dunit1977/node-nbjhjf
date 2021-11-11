export function createId() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    .toString(36)
    .slice(-10);
}
