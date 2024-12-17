export function IndexAny(s: string, chars: string): number {
  if (chars === "") {
    return -1;
  }
  if (chars.length === 1) {
    return s.indexOf(chars);
  }
  if (s.length > 8) {
    const charSet = new Set(chars);
    for (let i = 0; i < s.length; i++) {
      if (charSet.has(s[i])) {
        return i;
      }
    }
    return -1;
  }
  for (let i = 0; i < s.length; i++) {
    if (chars.includes(s[i])) {
      return i;
    }
  }
  return -1;
}
