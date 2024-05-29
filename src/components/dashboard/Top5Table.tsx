import Link from "next/link";

type top5ProductsArray = {
    id: number;
    product: string;
    price: string;
    orders: string;
    rating: string;
}

const products: top5ProductsArray[] = [
    {
        id: 1,
        product: 'product 1',
        price: 'price 1',
        orders: 'orders 1',
        rating: 'rating 1'
    },
    {
        id: 2,
        product: 'product 2',
        price: 'price 2',
        orders: 'orders 2',
        rating: 'rating 2'
    },
]

export default function Top5Table() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 max-w-full overflow-x-auto">
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr className="uppercase">
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        ID
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        product
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        price
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        orders
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        rating
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                { products.map((roduct, idx) => (
                                    <tr key={ roduct.id }>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-0">
                                            #{ idx + 1 }
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ roduct.product }</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ roduct.price }</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ roduct.orders }</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ roduct.rating }</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <Link href="#" className="text-indigo-600 hover:text-indigo-900">
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}