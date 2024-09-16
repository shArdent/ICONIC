import IdentityDetail from "../request/IdentityDetail";

const PendonorBox = ({ pendonor }: { pendonor: any }) => {
  return (
    <div className=" p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-3 w-44 border-b-2 border-b-slate-500">Data Pendonor</h1>
      <IdentityDetail label="Nama" value={pendonor?.donor_name} />
      <IdentityDetail label="Alamat" value={pendonor?.donor_address} />
      <IdentityDetail label="No Handphone" value={pendonor?.phone} />
      <IdentityDetail
        label="Golongan Darah"
        value={pendonor?.blood_type}
      />
    </div>
  );
};

export default PendonorBox;
