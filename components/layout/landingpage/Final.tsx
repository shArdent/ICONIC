import { Button } from "@/components/ui/button";

const Final = () => {
  return (
    <div className="h-auto py-10 bg-[#D9D9D9] flex flex-col justify-center items-center text-center gap-5 md:gap-[48px]">
      <h1 className="font-bold text-4xl md:text-[36px]">
        Bersama, Kita Selamatkan Nyawa
      </h1>
      <p className="text-sm md:text-[24px] leading-[140%] max-w-[75%] md:max-w-[750px]">
        Setiap tetes darah yang Anda sumbangkan dapat menyelamatkan hingga tiga
        nyawa. Dengan menggunakan layanan kami, Anda memastikan bahwa darah yang
        Anda donorkan mencapai mereka yang paling membutuhkannya dengan cepat
        dan tepat.
      </p>
      <Button className="py-8 px-10 rounded-sm font-bold w-auto text-[24px]">
        Donorkan Sekarang
      </Button>
    </div>
  );
};

export default Final;
