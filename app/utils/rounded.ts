export function rounded(num: number) {
  return num >= 100000 ? `${num / 100000}k` : `${num}`
}
