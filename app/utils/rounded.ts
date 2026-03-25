export function rounded(num: number) {
  return num >= 100000 ? `${num / 1000}k` : `${num}`
}
