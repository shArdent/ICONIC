import FeatureCard from "@/components/fragment/landingpage/FeatureCard";
import { FeatureCardMobile } from "@/components/fragment/landingpage/FeatureCardMobile";
import { Droplets, HandHeart, Syringe } from "lucide-react";

const Feature = () => {
  return (
    <div className="flex gap-[51px] px-[63px] py-10 md:py-[70px] max-w-screen items-center justify-center">
      <div className="block md:hidden">
        <FeatureCardMobile />
      </div>
      <div className="hidden md:inline-flex gap-4 ">
        <FeatureCard
          title="Ajukan Permintaan Darah"
          body="Kirimkan permintaan darah untuk kebutuhan medis Anda atau orang terdekat. Sistem kami akan mencocokkan permintaan Anda dengan pendonor yang sesuai secara cepat dan efisien. Anda bisa menjadi pahlawan bagi mereka."
        >
          <Droplets size={175} strokeWidth={1} />
        </FeatureCard>

        <FeatureCard
          title="Penuhi Permintaan Darah"
          body="Bantu mereka yang membutuhkan dengan memenuhi permintaan donor darah. Anda akan diberitahu saat ada permintaan yang sesuai dengan tipe darah Anda, sehingga Anda bisa langsung memberikan bantuan."
        >
          <HandHeart size={175} strokeWidth={1} />
        </FeatureCard>

        <FeatureCard
          title="Daftar sebagai Pendonor"
          body="Bergabunglah sebagai pendonor darah dan jadilah bagian dari komunitas penyelamat nyawa. Daftar sekarang dan kami akan menghubungi Anda saat ada kebutuhan darah sesuai dengan tipe darah Anda."
        >
          <Syringe size={175} strokeWidth={1} />
        </FeatureCard>
      </div>
    </div>
  );
};

export default Feature;
