import Table from "../Table";

type T_Top5ProductsArray = {
  id: number;
  product: string;
  price: string;
  sales: string;
  rating: string | number;
};

export default function Top5Table({ top5bestSales }: { top5bestSales: any[] }) {
  const top5ProductsArray: T_Top5ProductsArray[] = top5bestSales.map(
    (obj, i) => ({
      id: obj._id,
      rank: "#" + (i + 1),
      product: obj.product_name,
      price: obj.current_price,
      sales: obj.quantity,
      rating: obj.ratingNumber,
    })
  );
  return (
    <Table
      isEditOption
      bodyData={top5ProductsArray}
      headers={["ID", "product", "price", "sales", "rating"]}
      tableScreenName="Top5Table"
    />
  );
}
