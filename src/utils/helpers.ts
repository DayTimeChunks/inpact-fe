
export const roundToDigits = (amount: number, digits: number = 2) => {
  return Math.round(amount * 10**digits)/10**digits
}