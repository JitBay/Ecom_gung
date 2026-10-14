// The long landing-style product page for the leggings (home page and its product URL).
import { useEffect } from 'react';
import Hero from '../components/sections/Hero.jsx';
import CameraRolls from '../components/sections/CameraRolls.jsx';
import ProductSection from '../components/product/ProductSection.jsx';
import RelatedProducts from '../components/sections/RelatedProducts.jsx';
import VideoTestimonials from '../components/sections/VideoTestimonials.jsx';
import QualitySection from '../components/sections/QualitySection.jsx';
import Faq from '../components/sections/Faq.jsx';
import CustomerReviews from '../components/sections/CustomerReviews.jsx';
import { LEGGINGS } from '../data/catalog.js';
import { brand } from '../data/site.js';

export default function LeggingsPage() {
  useEffect(() => {
    document.title = `Sculpt 3D™ Leggings | ${brand.name} Labs`;
  }, []);

  return (
    <>
      <Hero />
      <CameraRolls />
      <ProductSection />
      <RelatedProducts exclude={LEGGINGS} />
      <VideoTestimonials />
      <QualitySection />
      <Faq />
      <CustomerReviews />
    </>
  );
}
