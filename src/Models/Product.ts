export interface Product {
  id: number;
  name: string;
  old_price: string;
  price: string;
  created_on: number;
  shopname: string;
  image: string;
  product_id?: number;
  thumb_color: string;
  thumb_type: string;
  is_addedtolist?: 0 | 1;
  shop_id: number;
}

export interface ProductDetail {
  allergies: Allergy[];
  code: string;
  description: string;
  diets: Diet[];
  id: number;
  image: string;
  ingridients: string;
  is_addedtolist: number;
  name: string;
  nutrition: Nutrition[];
  old_price: string;
  price: string;
  rating: string;
  reviews: string;
  shop_id: number;
  shopname: string;
  size: string;
  thumb_color: string;
  thumb_type: string;
  upc: string;
}

export interface Allergy {
  name: string;
}

export interface Diet {
  name: string;
}

export interface Nutrition {
  calcium: string;
  calcium_color: string;
  calories: number;
  carbohydrate: string;
  carbohydrate_color: string;
  cholesterol: string;
  cholesterol_color: string;
  fat: string;
  fat_color: string;
  fiber: string;
  fiber_color: string;
  iron: string;
  iron_color: string;
  potassium: string;
  potassium_color: string;
  protein: string;
  protein_color: string;
  sodium: string;
  sodium_color: string;
  sugar: string;
  sugar_color: string;
  vitamin_a: string;
  vitamin_a_color: string;
  vitamin_c: string;
  vitamin_c_color: string;
}

export interface HistoryProduc {
  created_on: number;
  id: number;
  image: string;
  name: string;
  old_price: string;
  price: string;
  qty: number;
  shopname: string;
}

export interface AddProduct {
  id: number;
  shop_id: number;
  display_name: string;
  front_image: string;
  ingredient_image: string;
  nutrition_image: string;
  barcode_image: string;
}
