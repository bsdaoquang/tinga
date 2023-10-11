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

    return `${d.getDate()} ${monthNames[d.getMonth() + 1]} ${d.getFullYear()}`;
  };
}
