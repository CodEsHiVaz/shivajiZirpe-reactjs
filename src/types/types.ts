export interface ProductObj {
  _id: string;
  name?: string | null;
  avatar: string;
  description: string;
  price: number;
  category: string;
  developerEmail: string;
  createdAt: string;
  updatedAt: string;
  __v?: string;
}
export type ProductArr = {
  productList: Array<Object>;
};

export interface CategotyObj {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v?: string;
}
export interface FormData {
  name?: string;
  price?: string;
  avatar?: string;
  category?: string;
  developerEmail?: string;
  description?: string;
}
