const RequestCard = () => {
  return (
    <div className="inline-flex justify-between gap-5 bg-slate-300 p-3 md:p-2 rounded w-auto">
      <div className="flex gap-3">
        <div className="aspect-square bg-white min-w-20 rounded text-center flex items-center justify-center text-4xl font-semibold">
          A+
        </div>
        <div className="flex flex-col justify-around text-sm max-w-[210px]">
          <h1 className="font-bold text-base">Diva Marshelano Ardentinnova Suhartanto</h1>
          <p>RS Hasan Sadikin</p>
          <p>23/03/2023 | 08:00</p>
        </div>
      </div>
      <button className="w-24 rounded bg-[#880808] text-white">Donor</button>
    </div>
  );
};

export default RequestCard;
