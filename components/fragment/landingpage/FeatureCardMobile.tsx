"use client"

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Droplets, HandHeart, Syringe } from "lucide-react";

export function FeatureCardMobile() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const display = [
    {
      icon: <Droplets size={150} strokeWidth={1} />,
      title: "Ajukan Permintaan Darah",
      body: "Kirimkan permintaan darah untuk kebutuhan medis Anda atau orang terdekat. Sistem kami akan mencocokkan permintaan Anda dengan pendonor yang sesuai secara cepat dan efisien. Anda bisa menjadi pahlawan bagi mereka.",
    },
    {
      icon : <HandHeart size={150} strokeWidth={1} />,
      title: "Penuhi Permintaan Darah",
      body : "Bantu mereka yang membutuhkan dengan memenuhi permintaan donor darah. Anda akan diberitahu saat ada permintaan yang sesuai dengan tipe darah Anda, sehingga Anda bisa langsung memberikan bantuan."
    },
    {
      icon : <Syringe size={150} strokeWidth={1} />,
      title: "Daftar sebagai Pendonor",
      body : "Bergabunglah sebagai pendonor darah dan jadilah bagian dari komunitas penyelamat nyawa. Daftar sekarang dan kami akan menghubungi Anda saat ada kebutuhan darah sesuai dengan tipe darah Anda."
    }
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {display.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="flex flex-col gap-6 items-center text-center">
                    {item.icon}
                    <h2 className="text-2xl font-bold">{item.title}</h2>
                    <p>{item.body}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

    </Carousel>
  );
}
