export default function breakLineEveryPosition(
  str: string,
  position: number,
): string {
  const a: string[] = [];
  let start = 0;
  while (start < str.length) {
    a.push(str.slice(start, start + position));
    start += position;
  }
  return a.join('\n');
}
