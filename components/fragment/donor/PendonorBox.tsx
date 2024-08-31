import IdentityDetail from "../request/IdentityDetail";

const PendonorBox = ({ pendonor }: { pendonor: any }) => {
  return (
    <div className="bg-slate-200 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-3">Data Pendonor</h1>
      <IdentityDetail label="Nama" value={pendonor?.donor_name} />
      <IdentityDetail label="Alamat" value={pendonor?.donor_address} />
      <IdentityDetail
        label="Golongan Darah"
        value={pendonor?.blood_type}
      />
    </div>
  );
};

export default PendonorBox;
