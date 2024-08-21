import FeatureCard from "@/components/fragment/landingpage/FeatureCard";
import { FeatureCardMobile } from "@/components/fragment/landingpage/FeatureCardMobile";
import { Droplets, HandHeart, Syringe } from "lucide-react";
import { motion } from "framer-motion"

const Feature = () => {
  return (
    <motion.div 
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true, amount: 0.5 }}
    className="flex flex-col gap-24 px-20 py-10 max-w-screen items-center justify-center relative -top-20">
      <h1 className="text-6xl font-bold">Dengan Donorkan</h1>
      <div className="block md:hidden">
        <FeatureCardMobile />
      </div>
      <div className="hidden md:inline-flex gap-4 ">
        <FeatureCard
          title="Ajukan Permintaan Darah"
          body="Kirimkan permintaan darah untuk kebutuhan medis Anda atau orang terdekat."
        >
          <Droplets size={150} strokeWidth={1} />
        </FeatureCard>

        <FeatureCard
          title="Penuhi Permintaan Darah"
          body="Bantu mereka yang membutuhkan dengan memenuhi permintaan donor darah."
        >
          <HandHeart size={150} strokeWidth={1} />
        </FeatureCard>

        <FeatureCard
          title="Daftar sebagai Pendonor"
          body="Bergabunglah sebagai pendonor darah dan jadilah bagian dari komunitas penyelamat nyawa."
        >
          <Syringe size={150} strokeWidth={1} />
        </FeatureCard>
      </div>
    </motion.div>
  );
};

export default Feature;
