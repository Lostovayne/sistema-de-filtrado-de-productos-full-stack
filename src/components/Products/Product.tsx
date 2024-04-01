/* eslint-disable @next/next/no-img-element */
import type { Product } from "@/db";

/**
 * Renders a product card with the provided product data.
 * @param {Object} props - The properties of the product.
 * @param {Product} props.product - The product data to be rendered.
 * @returns {JSX.Element} The rendered product card.
 */
const ProductCard = ({ product }: { product: Product }): JSX.Element => {
  return (
    <article className="relative group">
      <figure className="bg-gray-200 group-hover:opacity-75 rounded-md w-full lg:h-80 overflow-hidden aspect-square lg:aspect-none">
        <img
          src={product.imageId}
          alt={`Image of ${product.name}`}
          className="w-full h-full object-center object-contain"
        />
        <figcaption className="sr-only">Image of {product.name}</figcaption>
      </figure>

      <section className="flex justify-between mt-4">
        <header>
          <h3 className="text-gray-700 text-sm">{product.name}</h3>
          <p className="mt-1 text-gray-500 text-sm">
            Size {product.size.toUpperCase()}, {product.color}
          </p>
        </header>

        <p className="font-medium text-gray-900 text-sm">{product.price}</p>
      </section>
    </article>
  );
};
export default ProductCard;
