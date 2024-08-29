import IdentityDetail from "../request/IdentityDetail"

const PenerimaBox = ({ penerima } : { penerima : any}) => {
  return (
    <div className="bg-slate-200 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-3">Data Penerima</h1>
        <IdentityDetail label="Nama" value={penerima?.name}/>
        <IdentityDetail label="Alamat" value={penerima?.recipientAddress}/>
        <IdentityDetail label="Rumah Sakit" value={penerima?.hospitalName}/>
        <IdentityDetail label="Kantung Darah Diperlukan" value={penerima?.quantity}/>
        <IdentityDetail label="Golongan Darah" value={penerima?.bloodType}/>
    </div>
  )
}

export default PenerimaBox