export interface Product {
  id: string;
  title: string;
  description: string
  rating: number
  mart: string
  price: number;
  imageUrl: string;
  count?: number;
}