export interface Score {
  id: string
  total: number,
  date: string
  dataScore: DataScore
}

interface DataScore {
  good: number
  great: number
  limit: number
}