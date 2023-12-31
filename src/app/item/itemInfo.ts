interface itemProps {
    imgUrl: string;
    product_name: string;
    product_category: string;
    price: string | number;
    product_type: string;
    search_keys: string[] | string;
    brand_name: string;    
};

const itemArr: itemProps[] = [
    {
        imgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe3.jpg",
        product_name: "DNK Yellow Shoes",
        product_category: "men",
        price: 120,
        brand_name: "DNK",
        search_keys: ["shoes", "boot", "boots"],
        product_type: "shoes",
    },
    {
        imgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe1.jpg",
        product_name: "DNK Blue Shoes",
        product_category: "men",
        price: 200,
        brand_name: "DNK",
        search_keys: ["shoes", "boot", "boots"],
        product_type: "shoes",
    },
    {
        imgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-m-jeans1.jpg",
        product_name: "Dark Brown Jeans",
        product_category: "men",
        price: 150.00,
        brand_name: "Unknown",
        product_type: "jeans",
        search_keys: ["jeans", "pants", "denim"],
    },
    {
        imgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-w-jeans2.jpg",
        product_name: "Blue Denim Jeans",
        product_category: "women",
        price: 150.00,
        brand_name: "Unknown",
        product_type: "jeans",
        search_keys: ["jeans", "pants", "denim"],
    },
    {
        imgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-w-jeans4.jpg",
        product_name: "Basic Gray Jeans",
        product_category: "women",
        price: 150.00,
        brand_name: "Unknown",
        product_type: "jeans",
        search_keys: ["jeans", "pants", "denim"],
    },
    {
        imgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-w-jeans1.jpg",
        product_name: "Blue Denim Shorts",
        product_category: "women",
        price: 130.00,
        brand_name: "Unknown",
        product_type: "shorts",
        search_keys: ["shorts", "short pants", "pants"],
    },
    {
        imgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-accessory2.jpg",
        product_name: "Anchor Bracelet",
        product_category: "women",
        price: 180.00,
        brand_name: "Unknown",
        product_type: "bracelet",
        search_keys: ["bracelet", "accessories"],
    },
    {
        imgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-accessory1.jpg",
        product_name: "Boho Bangle Bracelet",
        product_category: "women",
        price: 170.00,
        brand_name: "Unknown",
        product_type: "bracelet",
        search_keys: ["bracelet", "accessories"],
    },
    {
        imgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag1.jpg",
        product_name: "Light Brown Purse",
        product_category: "women",
        price: 150.00,
        brand_name: "Unknown",
        product_type: "bag",
        search_keys: ["bag", "purse", "venity bag"],
    },
    {
        imgUrl: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag3.jpg",
        product_name: "Bright Red Bag",
        product_category: "women",
        price: 100.00,
        brand_name: "Unknown",
        product_type: "bag",
        search_keys: ["bag", "purse", "venity bag"],
    }
];

export default itemArr;