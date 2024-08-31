import { motion } from "framer-motion";

const Whatis = () => {
  return (
    <div className="w-full md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
        className="w-full mx-auto rounded-lg relative -top-32 h-auto bg-white shadow py-16 px-16 flex flex-col items-center justify-center gap-10 bg-opacity-90 backdrop-blur-sm drop-shadow-lg"
      >
        <h1 className="text-5xl font-bold">Apa itu DonorKan?</h1>
        <p className="md:text-center text-lg">
          <span className="text-primary font-extrabold">DonorKan</span> adalah
          aplikasi manajemen donor darah yang dirancang untuk memudahkan proses
          donor dan permintaan darah. Aplikasi ini menghubungkan donor darah
          dengan orang-orang yang membutuhkan, memungkinkan pengguna untuk
          membuat permintaan darah secara cepat dan efisien.{" "}
        </p>
      </motion.div>
    </div>
  );
};

export default Whatis;
