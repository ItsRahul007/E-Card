interface itemProps {
    _id?: string | number;
    primaryImgUrl: string;
    product_name: string;
    product_category: string;
    price: number;
    product_type: string;
    search_keys: string[];
    brand_name: string;
};

interface newItemProp extends itemProps {
    secondaryImgUrls: string[];
    ratings: {
        ratingBy: String,
        ratingNumber: Number,
    }[];
    discount_percentage: number;
}

const itemArr: itemProps[] = [
    {
        _id: 1,
        primaryImgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe3.jpg",
        product_name: "DNK Yellow Shoes",
        product_category: "men",
        price: 120,
        brand_name: "DNK",
        search_keys: ["shoes", "boot", "boots"],
        product_type: "shoes",
    },
    {
        _id: 2,
        primaryImgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe1.jpg",
        product_name: "DNK Blue Shoes",
        product_category: "men",
        price: 200,
        brand_name: "DNK",
        search_keys: ["shoes", "boot", "boots"],
        product_type: "shoes",
    },
    {
        _id: 3,
        primaryImgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-m-jeans1.jpg",
        product_name: "Dark Brown Jeans",
        product_category: "men",
        price: 150.00,
        brand_name: "Unknown",
        product_type: "jeans",
        search_keys: ["jeans", "pants", "denim"],
    },
    {
        _id: 4,
        primaryImgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-w-jeans2.jpg",
        product_name: "Blue Denim Jeans",
        product_category: "women",
        price: 150.00,
        brand_name: "Unknown",
        product_type: "jeans",
        search_keys: ["jeans", "pants", "denim"],
    },
    {
        _id: 5,
        primaryImgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-w-jeans4.jpg",
        product_name: "Basic Gray Jeans",
        product_category: "women",
        price: 150.00,
        brand_name: "Unknown",
        product_type: "jeans",
        search_keys: ["jeans", "pants", "denim"],
    },
    {
        _id: 6,
        primaryImgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-w-jeans1.jpg",
        product_name: "Blue Denim Shorts",
        product_category: "women",
        price: 130.00,
        brand_name: "Unknown",
        product_type: "shorts",
        search_keys: ["shorts", "short pants", "pants"],
    },
    {

        _id: 7,
        primaryImgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-accessory2.jpg",
        product_name: "Anchor Bracelet",
        product_category: "women",
        price: 180.00,
        brand_name: "Unknown",
        product_type: "bracelet",
        search_keys: ["bracelet", "accessories"],
    },
    {
        _id: 8,
        primaryImgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-accessory1.jpg",
        product_name: "Boho Bangle Bracelet",
        product_category: "women",
        price: 170.00,
        brand_name: "Unknown",
        product_type: "bracelet",
        search_keys: ["bracelet", "accessories"],
    },
    {
        _id: 9,
        primaryImgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag1.jpg",
        product_name: "Light Brown Purse",
        product_category: "women",
        price: 150.00,
        brand_name: "Unknown",
        product_type: "bag",
        search_keys: ["bag", "purse", "venity bag"],
    },
    {
        _id: 10,
        primaryImgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag3.jpg",
        product_name: "Bright Red Bag",
        product_category: "women",
        price: 100.00,
        brand_name: "Unknown",
        product_type: "bag",
        search_keys: ["bag", "purse", "venity bag"],
    }
];

export const newItems: newItemProp[] = [
    {
        "product_name": "",
        "product_category": "",
        "price": 50,
        "product_type": "",
        "brand_name": "Unknown",
        "search_keys": [],
        "primaryImgUrl": "",
        "secondaryImgUrls": [

        ],
        "ratings": [
            {
                "ratingBy": "system",
                "ratingNumber": 3
            }
        ],
        "discount_percentage": 10
    },
];

export default itemArr;