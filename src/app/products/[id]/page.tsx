import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import SingleProductClient from "./SingleProductClient";

export function generateStaticParams() {
  return products
    .filter((p) => p.id !== "starter")
    .map((p) => ({
      id: p.id,
    }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return <SingleProductClient product={product} />;
}
