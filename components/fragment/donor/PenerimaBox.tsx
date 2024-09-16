import IdentityDetail from "../request/IdentityDetail"

const PenerimaBox = ({ penerima } : { penerima : any}) => {
  return (
    <div className=" p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-3 w-44 border-b-2 border-b-slate-500">Data Penerima</h1>
        <IdentityDetail label="Nama" value={penerima?.name}/>
        <IdentityDetail label="Alamat" value={penerima?.recipient_address}/>
        <IdentityDetail label="No Telepon" value={penerima?.phone}/>
        <IdentityDetail label="Rumah Sakit" value={penerima?.hospital_name}/>
        <IdentityDetail label="Status" value={penerima?.status}/>
        <IdentityDetail label="Kantung Darah Diperlukan" value={penerima?.quantity}/>
        <IdentityDetail label="Golongan Darah" value={penerima?.blood_type}/>
    </div>
  )
}

export default PenerimaBox