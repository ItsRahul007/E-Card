export interface itemProps {
    _id?: string;
    product_name: string;
    product_category: string;
    price: number;
    product_type: string;
    search_keys: string[];
    brand_name: string;
    primaryImgUrl: string;
};

export interface ProductType extends itemProps {
    id: string;
    secondaryImgUrls: string[];
    ratings: {
        ratingBy: string,
        ratingNumber: number,
        _id: string;
    }[];
    discount_percentage: number;
    current_price: number;
    createdAt: Date;
    updatedAt: Date;
}