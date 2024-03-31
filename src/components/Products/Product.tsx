/* eslint-disable @next/next/no-img-element */
import type { Product } from "@/db";

const ProductCard = ({ product }: { product: Product  }) => {
  return (
    <div className="relative group">
      <div className="bg-gray-200 group-hover:opacity-75 rounded-md aspect-w-1 w-full aspect-h-1 lg:h-80 overflow-hidden lg:aspect-none">
        <img
          src={product.imageId}
          alt="product image"
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="flex justify-between mt-4">
        <div>
          <h3 className="text-gray-700 text-sm">{product.name}</h3>
          <p className="mt-1 text-gray-500 text-sm">
            Size {product.size.toUpperCase()}, {product.color}
          </p>
        </div>

        <p className="font-medium text-gray-900 text-sm">{product.price}</p>
      </div>
    </div>
  );
};
export default ProductCard;
