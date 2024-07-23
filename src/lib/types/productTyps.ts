export interface itemProps {
  _id?: string;
  product_name: string;
  product_category: string;
  price: number;
  product_type: string;
  search_keys: string[];
  brand_name: string;
  primaryImgUrl: string;
}

export interface ProductType extends itemProps {
  id: string;
  secondaryImgUrls: string[];
  ratings: {
    ratingBy: string;
    ratingNumber: number;
    _id?: string;
  }[];
  discount_percentage: number;
  current_price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type T_SearchKeys = {
  label: string;
  link: string;
};

export interface I_BestSalesSingleItem {
  _id: string;
  product_name: string;
  primaryImgUrl: string;
  current_price: number;
  quantity?: number | any;
  ratingNumber?: number | string;
}

export interface I_BestSaleGetProducts extends I_BestSalesSingleItem {
  ratings: {
    ratingBy: string;
    ratingNumber: number;
  }[];
}
