const IdentityDetail = ({
  label,
  value,
}: {
  label: string;
  value: string | null | number;
}) => {
  return (
    <div className="grid grid-cols-2">
      <h1 className="p-1">{label}</h1>
      {label.includes("Kantung Darah") ? (
        <p>: {value ? `${value} labu` : "0 labu"}</p>
      ) : (
        <p>: {value ? value : "-"}</p>
      )}
    </div>
  );
};

export default IdentityDetail;
