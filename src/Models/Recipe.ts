import {Product} from './Product';

export interface Recipe {
  cook_time: string;
  id: number;
  meal_title: string;
  noservings: number;
  type: string;
  recent_added?: 0 | 1;
}
export interface RecipeDetail {
  cook_time: string;
  cooking_details: string;
  cooking_instruction: string[];
  description: string;
  id: number;
  ingredients: string[];
  is_favourite: string;
  meal_title: string;
  noservings: number;
  type: string;
}

export interface RecipeIngredient {
  instore: ProductStore[];
  notinstore: string[];
  ingrocerylist: ProductStore[];
  notallergyfree: string[];
  allergyfree: string[];
}

export interface ProductStore {
  code: string;
  color: string;
  font: string;
  id: number;
  image: any;
  name: string;
  price: string;
  shop_id: number;
  shop_name: string;
  size: string;
  thumb_score: number;
  thumb_type: number;
  upc: string;
}

export interface Quote {
  title: string;
  description: string;
}
