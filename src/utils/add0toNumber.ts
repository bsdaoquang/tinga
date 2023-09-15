export const add0toNumber = (num: number) => {
  if (num < 10) {
    return '0' + num;
  } else {
    return `${num}`;
  }
};
