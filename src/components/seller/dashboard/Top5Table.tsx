import Link from "next/link";
import Table from "../Table";

type top5ProductsArray = {
  id: number;
  product: string;
  price: string;
  orders: string;
  rating: string | number;
};

const products: top5ProductsArray[] = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 1,
  rank: "#" + (i + 1),
  product: "product " + (i + 1),
  price: "price " + (i + 1),
  orders: "orders " + (i + 1),
  rating: i + 1,
}));

export default function Top5Table() {
  return (
    <Table
      isEditOption
      bodyData={products}
      headers={["ID", "product", "price", "orders", "rating"]}
      tableScreenName="Top5Table"
    />
  );
}
