function SkeletonBox({ className }) {
  return (
    <div className={`bg-gray-200 rounded ${className}`} />
  );
}


function Loader() {
  return (
    <div className="animate-pulse space-y-4">

      {/* Header */}
      <div className="flex justify-between">
        <SkeletonBox className="h-7 w-48" />
        <SkeletonBox className="h-9 w-32 rounded-lg" />
      </div>


      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1,2,3,4].map((item)=>(
          <SkeletonBox 
            key={item}
            className="h-20 rounded-xl"
          />
        ))}
      </div>


      {/* Chart */}
      <SkeletonBox className="h-64 rounded-xl" />


      {/* Table */}
      <div className="space-y-2">
        {[1,2,3,4,5].map((item)=>(
          <SkeletonBox
            key={item}
            className="h-12 rounded-lg"
          />
        ))}
      </div>

    </div>
  );
}

export default Loader;