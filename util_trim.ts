export function TrimLeft(s: string, cutset: string): string {
  const regex = new RegExp(`^[${cutset}]+`);
  return s.replace(regex, '');
}