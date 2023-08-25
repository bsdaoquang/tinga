
export const handleCalcTotal = (data: any[]) => {
  let sum = 0;
  const total = data.reduce((a, b) => a + b.price, sum);
  return total ? total : 0;
};
