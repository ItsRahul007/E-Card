import React, { FC } from 'react';
import AllProductNav from '@/app/(client)/components/common/all-products/Nav';
import Products from '@/app/(client)/components/common/all-products/Products';
import Filter from '@/app/(client)/components/common/all-products/Filter';
import { Metadata } from 'next';
import { getProductDescription } from '@/lib/gimini-AI/giminiAI';

interface I_AllProduct {
  params: { productKey: string };
  searchParams: { search: string };
}

//TODO: use AI for creating a good product description according to the search keywords

const defaultDescription = "E-Card Fragrances - Immerse yourself in the world of enchanting scents with E-Card's curated collection of perfumes. Our online fragrance boutique offers a harmonious blend of sophistication and allure, providing a diverse range of captivating fragrances to elevate your personal style. From floral bouquets to woody notes, our perfumes tell unique olfactory stories, ensuring there's a perfect fragrance for every mood and occasion. Indulge your senses with our long-lasting formulations that linger delicately on the skin. At E-Card, we understand the power of scent, and our exclusive perfumes are designed to leave an indelible mark wherever you go. Explore our website now to discover the art of fragrance and find the perfect scent that resonates with your individuality. Elevate your presence with E-Card Fragrances - where every spritz tells your unique story.";

export async function generateMetadata({ searchParams }: I_AllProduct): Promise<Metadata> {
  const description = searchParams.search ?
    await getProductDescription(searchParams.search)
    : defaultDescription;

  function capitalizeText(): string {
    if (searchParams.search) {
      let wordsArray = searchParams.search.split(/[\s-]+/);

      let capitalizedArray = wordsArray.map(word => word.charAt(0).toUpperCase() + word.slice(1));

      let capitalizedText = capitalizedArray.join(" ");

      return capitalizedText;
    } else return "";
  }

  return {
    title: `E-Card - ${capitalizeText() || "All Products"}`,
    description
  }
}

const AllProduct: FC<I_AllProduct> = async ({ params, searchParams }) => {
  return (
    <div className='h-screen w-screen bg-[#EAEAEA] flex flex-col'>
      <AllProductNav filters={ true } />
      <div className='h-[92%] sm:h-[91%] lg:h-[87%] flex gap-3 lg:mt-3'>
        <Filter />
        <Products />
      </div>
    </div>
  );
};

export default AllProduct;