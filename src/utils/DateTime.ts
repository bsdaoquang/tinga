const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export class DateTime {
  static getDateString = (date: string) => {
    const d = new Date(date);

    return `${monthNames[d.getMonth()]} ${d.getDate()}th, ${d.getFullYear()}`;
  };
}
