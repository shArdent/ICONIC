import IdentityDetail from "../request/IdentityDetail";

const PendonorBox = ({ pendonor }: { pendonor: any }) => {
  return (
    <div className="bg-slate-200 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-3">Data Pendonor</h1>
      <IdentityDetail label="Nama" value={pendonor?.name} />
      <IdentityDetail label="Alamat" value={pendonor?.donorAddress} />
      <IdentityDetail
        label="Golongan Darah"
        value={pendonor?.bloodType}
      />
    </div>
  );
};

export default PendonorBox;
