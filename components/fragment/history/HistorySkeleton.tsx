const HistorySkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-full animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-slate-200 p-3 md:p-2 rounded w-full h-20"
        ></div>
      ))}
    </div>
  );
};

export default HistorySkeleton;
