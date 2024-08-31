import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"
import Link from "next/link";

const Final = () => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
    className="h-auto py-16 bg-[#f3f3f3] flex flex-col justify-center items-center text-center gap-5 md:gap-[48px]">
      <h1 className="font-bold text-4xl md:text-5xl">
        Bersama, Kita Selamatkan Nyawa
      </h1>
      <p className="text-sm md:text-lg leading-[140%] max-w-[75%] md:max-w-[750px]">
        Setiap tetes darah yang Anda sumbangkan dapat menyelamatkan hingga tiga
        nyawa. Dengan menggunakan layanan kami, Anda memastikan bahwa darah yang
        Anda donorkan mencapai mereka yang paling membutuhkannya dengan cepat
        dan tepat.
      </p>
      <Link href={'/request'} className="py-3 bg-primary text-white px-10 rounded-sm font-bold w-auto text-[24px]">
        Donorkan Sekarang
      </Link>
    </motion.div>
  );
};

export default Final;
