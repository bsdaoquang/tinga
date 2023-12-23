export interface Score {
  id: string;
  total: number;
  date: string;
  dataScore: DataScore;
}

interface DataScore {
  good: number;
  great: number;
  limit: number;
}

export interface ProfileScore {
  difference: number;
  green_line: number;
  last_update: string;
  list_score: number;
  orange_line: number;
  red_line: number;
}
