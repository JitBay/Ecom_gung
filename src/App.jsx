import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import CartDrawer from './components/layout/CartDrawer.jsx';
import HomePage from './pages/HomePage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import CollectionPage from './pages/CollectionPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import GuaranteePage from './pages/GuaranteePage.jsx';
import OffersPage from './pages/OffersPage.jsx';
import TechnologyPage from './pages/TechnologyPage.jsx';
import RefundPolicyPage from './pages/RefundPolicyPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import LegalNoticePage from './pages/LegalNoticePage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import SizeGuidePage from './pages/SizeGuidePage.jsx';
import TrackOrderPage from './pages/TrackOrderPage.jsx';
import NotFound from './pages/NotFound.jsx';
import { HERO_PRODUCT } from './data/catalog.js';

// Handle scroll restoration and anchor hash navigation
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const scrollToTarget = () => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        const timer = setTimeout(scrollToTarget, 100);
        return () => clearTimeout(timer);
      }
      return;
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

// Product route handler with legacy redirect handling
function ProductRoute() {
  const { handle } = useParams();
  const legacyHandles = [
    '3d-sculpting-anti-cellulite-leggings-instant-lift-smooth',
    'sculpt-posture-bra',
    'sculpt-3d-compression-tee',
    '3d-sculpting-anti-cellulite-shorts',
    'sculpt-lift-smooth-arm-sleeves',
    'multi-collagen-powder-for-women',
    'sculpt-cutout-lift-swimsuit',
    'sculpt-smooth-lift-swimsuit',
  ];

  if (legacyHandles.includes(handle)) {
    return <Navigate to={`/products/${HERO_PRODUCT}`} replace />;
  }

  return <ProductPage />;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LanguageProvider>
        <CartProvider>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            {/* Home & Direct Sales Landing */}
            <Route path="/" element={<HomePage />} />
            <Route path="/landing" element={<LandingPage />} />

            {/* Catalog & Products */}
            <Route path="/collections/:handle" element={<CollectionPage />} />
            <Route path="/products/:handle" element={<ProductRoute />} />

            {/* Content & Offer Pages */}
            <Route path="/pages/offres" element={<OffersPage />} />
            <Route path="/pages/notre-technologie" element={<TechnologyPage />} />
            <Route path="/pages/garantie" element={<GuaranteePage />} />
            <Route path="/pages/guide-tailles" element={<SizeGuidePage />} />
            <Route path="/pages/suivi-commande" element={<TrackOrderPage />} />
            <Route path="/pages/contact" element={<ContactPage />} />

            {/* Legal Pages */}
            <Route path="/policies/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/policies/terms-of-service" element={<TermsPage />} />
            <Route path="/policies/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/policies/legal-notice" element={<LegalNoticePage />} />

            {/* Legacy Collection 301-style Redirects */}
            <Route path="/collections/frontpage" element={<Navigate to="/collections/all" replace />} />
            <Route path="/collections/sculpt-collection" element={<Navigate to="/collections/all" replace />} />
            <Route path="/collections/sculpt-swim" element={<Navigate to="/collections/all" replace />} />
            <Route path="/collections/posture-support" element={<Navigate to="/collections/all" replace />} />
            <Route path="/collections/wellness-supplements" element={<Navigate to="/collections/all" replace />} />

            {/* Fallback 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </LanguageProvider>
  </BrowserRouter>
  );
}
