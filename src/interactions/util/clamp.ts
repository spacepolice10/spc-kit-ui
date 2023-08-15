export default function clamp(val: number, max: number) {
  return Math.min(Math.max(val, 0), max);
}
