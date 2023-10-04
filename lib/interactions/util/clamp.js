/**
 *
 * @param {number} val
 * @param {number} max
 * @returns
 */
export default function clamp(val, max) {
  return Math.min(Math.max(val, 0), max)
}
