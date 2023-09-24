export interface UserChoose {
  id: number;
  name: string;
  code: string;
  is_deleted?: string;
  deleted_on?: any;
  created_at?: string;
  updated_at?: string;
}

export interface UserSelected {
  allergies: any[];
  diets: Diet[];
  dislikes: Dislike[];
  shops: any[];
}

export interface Diet {
  id: number;
  name: string;
}

export interface Dislike {
  allergy_dislike: string;
  id: number;
}
