export function StringTrimLeft(s: string, cutset: string): string {
  if (s === "" || cutset === "") {
    return s;
  }
  let start = 0;
  while (start < s.length && cutset.includes(s[start])) {
    start++;
  }
  return s.slice(start);
}