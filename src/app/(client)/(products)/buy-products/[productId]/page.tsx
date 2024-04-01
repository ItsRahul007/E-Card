import React, { FC } from 'react';

interface I_SingleProductPage {
    params: { productId: string };
};

const BuyProducts: FC<I_SingleProductPage> = ({ params }) => {
    return (
        <div>{ params.productId }</div>
    );
};

export default BuyProducts;