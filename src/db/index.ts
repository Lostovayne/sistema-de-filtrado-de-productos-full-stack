import { Index } from "@upstash/vector";

type Product = {
  id: string;
  imageId: string;
  name: string;
  size: "S" | "M" | "L";
  color: "white" | "beige" | "blue" | "green" | "purple";
  price: number;
};

export const db = new Index<Product>();

// const res = await db.query({})
// res.map((vector) => vector.metadata)