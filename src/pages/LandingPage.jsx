import { useEffect } from 'react';
import Hero from '../components/sections/Hero.jsx';
import OfferModules from '../components/sections/OfferModules.jsx';
import ProductSection from '../components/product/ProductSection.jsx';
import QualitySection from '../components/sections/QualitySection.jsx';
import CameraRolls from '../components/sections/CameraRolls.jsx';
import VideoTestimonials from '../components/sections/VideoTestimonials.jsx';
import Faq from '../components/sections/Faq.jsx';
import CustomerReviews from '../components/sections/CustomerReviews.jsx';
import { brand } from '../data/site.js';

export default function LandingPage() {
  useEffect(() => {
    document.title = `${brand.fullName} | T-Shirt de Compression & Gainant Homme`;
  }, []);

  return (
    <>
      <Hero />
      <OfferModules />
      <ProductSection />
      <QualitySection />
      <CameraRolls />
      <VideoTestimonials />
      <Faq />
      <CustomerReviews />
    </>
  );
}
