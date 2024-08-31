import IdentityDetail from "../request/IdentityDetail"

const PenerimaBox = ({ penerima } : { penerima : any}) => {
  return (
    <div className="bg-slate-200 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-3">Data Penerima</h1>
        <IdentityDetail label="Nama" value={penerima?.name}/>
        <IdentityDetail label="Alamat" value={penerima?.recipient_address}/>
        <IdentityDetail label="Rumah Sakit" value={penerima?.hospital_name}/>
        <IdentityDetail label="Rumah Sakit" value={penerima?.status}/>
        <IdentityDetail label="Kantung Darah Diperlukan" value={penerima?.quantity}/>
        <IdentityDetail label="Golongan Darah" value={penerima?.blood_type}/>
    </div>
  )
}

export default PenerimaBox