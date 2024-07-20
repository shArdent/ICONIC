"use client";

import Feature from "../components/layout/landingpage/Feature";
import Hero from "../components/layout/landingpage/Hero";
import Final from "../components/layout/landingpage/Final";
import Footer from "../components/layout/landingpage/Footer";


const Home = () => {
  // const session = useSession() 
  
  return (
    <>
      <Hero />
      <Feature/>
      <Final/>
      <Footer/>
    </>
  );
};

export default Home;
