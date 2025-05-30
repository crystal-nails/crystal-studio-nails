import dbConnect from '../utils/dbConnect';
import HeroModel from '../models/Hero';

import Header from './components/Header';
import HeroComp from './components/HeroComp';
import ProposSection from './components/Propos';
import GallerySection from './components/GallerySection';
import MapSection from './components/MapSection';
import DiscountBanner from './components/DiscountBanner';
import AboutUsSections from './components/AboutUsSections';
import Footer from './components/Footer';

export default async function HomePage() {
  await dbConnect();
  const hero = await HeroModel.findOne().lean();

  return (
    <>
      <Header />
      <HeroComp hero={hero} />
      <DiscountBanner />
      <AboutUsSections />
      <ProposSection />
      <GallerySection />
      <MapSection />
      <Footer />
    </>
  );
}