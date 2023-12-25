export interface Score {
  difference: number;
  green_line: number;
  last_update: string;
  list_score: number;
  orange_line: number;
  red_line: number;
}

export interface ListScore {
  created_at: string;
  id: number;
  scoredetails: Scoredetails;
}

export interface Scoredetails {
  green_line: number;
  green_quantity: number;
  list_score: number;
  orange_line: number;
  orange_quantity: number;
  red_line: number;
  red_quantity: number;
}

export interface ProfileScore {
  difference: number;
  green_line: number;
  last_update: string;
  list_score: number;
  orange_line: number;
  red_line: number;
}
