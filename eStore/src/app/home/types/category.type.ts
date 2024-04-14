export interface Category {
  id: number;
  category: string;
  parentCategory?: Category;
}
