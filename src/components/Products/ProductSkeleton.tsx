const ProductSkeleton = () => {
  return (
    <div className="relative animate-pulse">
      <div className="bg-gray-200 rounded-md aspect-w-1 w-full aspect-h-1 lg:h-80 overflow-hidden lg:aspect-none">
        <div className="bg-gray-200 size-full" />
      </div>
      <div className="flex flex-col gap-2 mt-4" >
        <div className="bg-gray-200" />
      </div>
      
    </div>
  );
};
export default ProductSkeleton;
