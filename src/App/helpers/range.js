export default function range(start, end) {
  return Array.from(
    {
      length: 1 + Math.abs(end - start)
    },
    (_, i) => (end > start ? start + i : start - i)
  );
}
