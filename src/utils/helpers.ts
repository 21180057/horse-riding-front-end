export function isPositiveInteger(idString: string | undefined) {
  if (idString === undefined) return false
  const num = Number(idString)
  return Number.isInteger(num) && num > 0
}
