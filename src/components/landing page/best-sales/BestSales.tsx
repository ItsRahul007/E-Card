import React from 'react'
import BestSalesSingleItem from './BestSalesSingleItem';
import Orders from '@/lib/model/ordersSchema';
import Products from '@/lib/model/productSchema';
import { I_BestSalesSingleItem } from '@/lib/types/productTyps';

const BestSales = async () => {
    const getOrders = async () => {
        try {
            const allOrders = await Orders.find();
            return allOrders;
        } catch (err: any) {
            console.log(err.message);
            throw new Error('Failed to fetch the products');
        }
    };

    const getProducts = async (productsIds: { productId: string }[]) => {
        try {
            const allProducts = await Promise.all(productsIds.map(async ({ productId }) => {
                const product = await Products.findById(productId).select('product_name _id primaryImgUrl current_price');
                return product;
            }));
            return allProducts;
        } catch (err: any) {
            console.log(err.message);
            throw new Error('Failed to fetch the products');
        }
    };

    const ordersData = await getOrders();

    const productQuantities: any = {};

    //* Iterate through each order
    ordersData.forEach(order => {
        // Iterate through each product in the order
        order.products.forEach((product: any) => {
            //? Increment the quantity for this product
            const productId = product.product_id.toString(); //? Convert ObjectId to string for easy comparison
            if (productQuantities[productId]) {
                productQuantities[productId] += product.quantity;
            } else {
                productQuantities[productId] = product.quantity;
            }
        });
    });

    //* Convert productQuantities object to an array of { productId, quantity } objects
    const productQuantitiesArray = Object.keys(productQuantities).map(productId => ({
        productId,
        quantity: productQuantities[productId]
    }));

    //* Sort products based on quantity in descending order
    productQuantitiesArray.sort((a, b) => b.quantity - a.quantity);

    //* Select top 6 products
    const top5ProductIds = productQuantitiesArray.slice(0, 6);

    const allProducts = await getProducts(top5ProductIds);


    return (
        <section className='w-screen h-auto max-w-[1540px] my-10 mx-auto min-h-[28rem] py-7 px-3 md:py-10 md:px-5 space-y-5 font-rubik' id='best-sales'>
            <div className='h-20 w-fit mx-auto capitalize font-semibold text-4xl'>best sales</div>
            <div
                className='h-auto w-full mx-auto grid md:grid-cols-3 grid-cols-2 grid-rows-[auto] gap-3'
            >
                {
                    allProducts.map((obj: I_BestSalesSingleItem) =>
                        <BestSalesSingleItem
                            key={ obj._id + '-best-sales' }
                            _id={ obj._id }
                            current_price={ obj.current_price }
                            primaryImgUrl={ obj.primaryImgUrl }
                            product_name={ obj.product_name }
                        />
                    )
                }
            </div>
        </section>
    )
}

export default BestSales;