import { CartProvider } from './context/CartContext.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import CartDrawer from './components/layout/CartDrawer.jsx';
import Hero from './components/sections/Hero.jsx';
import CameraRolls from './components/sections/CameraRolls.jsx';
import ProductSection from './components/product/ProductSection.jsx';
import RelatedProducts from './components/sections/RelatedProducts.jsx';
import VideoTestimonials from './components/sections/VideoTestimonials.jsx';
import QualitySection from './components/sections/QualitySection.jsx';
import Faq from './components/sections/Faq.jsx';
import CustomerReviews from './components/sections/CustomerReviews.jsx';

// Page order follows the reference product page.
export default function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <CameraRolls />
        <ProductSection />
        <RelatedProducts />
        <VideoTestimonials />
        <QualitySection />
        <Faq />
        <CustomerReviews />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
