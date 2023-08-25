const monthNames =[
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export class DateTime {
  static getDateString = (date: string) => {
    const d = new Date(date)

    return `${d.getDate()} ${monthNames[d.getMonth() + 1]} ${d.getFullYear()}`
  };

  
}