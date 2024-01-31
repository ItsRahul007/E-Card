export interface itemProps {
    _id?: string;
    primaryImgUrl: string;
    product_name: string;
    product_category: string;
    price: number;
    product_type: string;
    search_keys: string[];
    brand_name: string;
};

export interface ProductType extends itemProps {
    id: string;
    secondaryImgUrls: string[];
    ratings: {
        ratingBy: string,
        ratingNumber: number,
        _id: string;
    }[];
}