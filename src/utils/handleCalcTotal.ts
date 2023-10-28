export const handleCalcTotal = (data: any[]) => {
  let sum = 0;
  const total = data.reduce((a, b) => a + b.price * b.count, sum);
  return total ? total : 0;
};

export const handleCalcTotalByTarget = (data: any[], target: string) => {
  let sum = 0;
  const total = data.reduce(
    (a: any, b: any) => a * 1 + b[`${target}`] * 1,
    sum,
  );

  return total ? total.toFixed(2) : 0;
};
