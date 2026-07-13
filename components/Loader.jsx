// A single gray placeholder box — the basic building block
function SkeletonBox({ className }) {
  return <div className={`bg-gray-200 rounded ${className}`} />;
}

// The top row: title placeholder + button placeholder
function HeaderSkeleton() {
  return (
    <div className="flex items-center justify-between mb-1">
      <SkeletonBox className="h-7 w-48" />
      <SkeletonBox className="h-9 w-32 rounded-lg" />
    </div>
  );
}

// The 4 summary cards placeholder
function CardsSkeleton() {
  const cardNumbers = [1, 2, 3, 4];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cardNumbers.map((num) => (
        <SkeletonBox key={num} className="h-20 rounded-xl" />
      ))}
    </div>
  );
}

// The 2 charts placeholder (bar chart + pie chart)
function ChartsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <SkeletonBox className="lg:col-span-2 h-64 rounded-xl" />
      <SkeletonBox className="h-64 rounded-xl" />
    </div>
  );
}

// The "All Employees" title row + search bar placeholder
function TableHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between mb-4">
      <SkeletonBox className="h-6 w-32" />
      <SkeletonBox className="h-9 w-64 rounded-lg" />
    </div>
  );
}

// The 5 table rows placeholder
function TableRowsSkeleton() {
  const rowNumbers = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-2">
      {rowNumbers.map((num) => (
        <SkeletonBox key={num} className="h-12 rounded-lg" />
      ))}
    </div>
  );
}

function Loader() {
  return (
    <div className="animate-pulse">
      <HeaderSkeleton />
      <SkeletonBox className="h-4 w-64 mt-2 mb-6" />
      <CardsSkeleton />
      <ChartsSkeleton />
      <TableHeaderSkeleton />
      <TableRowsSkeleton />
    </div>
  );
}

export default Loader;