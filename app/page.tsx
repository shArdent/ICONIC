"use client";

import Feature from "../components/layout/landingpage/Feature";
import Hero from "../components/layout/landingpage/Hero";
import Final from "../components/layout/landingpage/Final";
import Whatis from "@/components/layout/landingpage/Whatis";
import Footer from "@/components/layout/landingpage/Footer";

const Home = () => {
  return (
    <div className="bg-[url('/images/landingPage/triangle-mosaic.png')] bg-repeat ">
      <Hero />
      <Whatis />
      <Feature />
      <Final />
      <Footer />
    </div>
  );
};

export default Home;
