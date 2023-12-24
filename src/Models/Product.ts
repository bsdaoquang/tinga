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
  id: number;
  name: string;
  description: string;
  size: string;
  price: string;
  old_price: string;
  upc: string;
  code: string;
  calories: string;
  fat: string;
  carbohydrate: string;
  protein: string;
  rating: string;
  reviews: string;
  ingridients: string;
  shopname: string;
  image: string;
  is_addedtolist: 0 | 1;
  shop_id: number;
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
