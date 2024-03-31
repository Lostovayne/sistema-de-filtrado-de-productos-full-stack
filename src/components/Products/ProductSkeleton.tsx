const ProductSkeleton = () => {
  return (
    <div className="relative transition-all animate-pulse duration-700">
      <div className="bg-gray-200 rounded-md w-full lg:h-80 overflow-hidden aspect-square lg:aspect-none">
        <div className="bg-gray-200 size-full" />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="bg-gray-200 w-full h-4" />
        <div className="bg-gray-200 w-full h-5" />
      </div>
    </div>
  );
};
export default ProductSkeleton;
