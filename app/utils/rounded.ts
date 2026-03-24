export function rounded(num: number) {
  return num >= 1000 ? `${num / 1000}k` : `${num}`
}
