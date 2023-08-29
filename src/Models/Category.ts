export interface Category {
  id: string;
  title: string;
  imageUrl: string;
  childrens?: Category[];
}