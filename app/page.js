
import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProposSection from "./components/Propos";
import GallerySection from "./components/GallerySection";
import MapSection from "./components/MapSection";
import DiscountBanner from "./components/DiscountBanner";
import AboutUsSections from "./components/AboutUsSections";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
  <Header></Header>
  <Hero></Hero>
    <DiscountBanner></DiscountBanner>
  <AboutUsSections></AboutUsSections>
  <ProposSection></ProposSection>
  <GallerySection></GallerySection>
  <MapSection></MapSection>
  <Footer></Footer>

  </>
  );
}
