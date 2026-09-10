import { Suspense, lazy, useEffect, useRef } from 'react';
import { Navigate, Outlet, Routes, Route, useLocation, useParams } from 'react-router-dom';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Loader from '@/components/Loader/Loader';
import AIChat from '@/components/AIChat/AIChat';
import SmoothScrollProvider from '@/components/SmoothScroll/SmoothScrollProvider';
import CatalogueSkeleton from '@/components/CatalogueSkeleton/CatalogueSkeleton';
import CatalogueErrorBoundary from '@/components/CatalogueErrorBoundary/CatalogueErrorBoundary';
import AuthProvider from '@/components/Auth/AuthProvider';
import RequireAuth from '@/components/Auth/RequireAuth';
import { reportVisit } from '@/lib/visits';
import { trackPageview } from '@/lib/analytics';
import { resetMarketCache } from '@/lib/publicMarkets';

// Route-level code splitting: each page ships as its own chunk instead of
// one large bundle, matching the brief's performance guidance. Home stays
// eagerly imported since it's the near-certain first paint.
import Home from '@/pages/Home';
const About = lazy(() => import('@/pages/About'));
const Towels = lazy(() => import('@/pages/Towels'));
const TowelCategoryPage = lazy(() => import('@/pages/TowelCategoryPage'));
const TowelSubcategoryPage = lazy(() => import('@/pages/TowelSubcategoryPage'));
const TowelDetail = lazy(() => import('@/pages/TowelDetail'));
const Rugs = lazy(() => import('@/pages/Rugs'));
const RugDetail = lazy(() => import('@/pages/RugDetail'));
const Collections = lazy(() => import('@/pages/Collections'));
const Linen = lazy(() => import('@/pages/Linen'));
const LinenCategoryPage = lazy(() => import('@/pages/LinenCategoryPage'));
const LinenDetail = lazy(() => import('@/pages/LinenDetail'));
const Export = lazy(() => import('@/pages/Export'));
const MarketPage = lazy(() => import('@/pages/MarketPage'));
const Custom = lazy(() => import('@/pages/Custom'));
const Contact = lazy(() => import('@/pages/Contact'));
const LegalPage = lazy(() => import('@/pages/LegalPage'));
const HqLogin = lazy(() => import('@/pages/HqLogin'));
const HqDashboard = lazy(() => import('@/pages/HqDashboard'));
const HqEnquiries = lazy(() => import('@/pages/HqEnquiries'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Shared data-loading boundary for the catalogue-browsing routes (Towels,
// Rugs, Linen, Collections and their nested category/detail pages) — these
// read products via data/products.js's use()-based functions, which
// suspend until /api/products resolves. A pathless "layout route" (no
// `path`, so it doesn't affect any child's URL) is React Router's way to
// wrap an otherwise-unrelated set of sibling routes in one shared element,
// here nested inside the app's existing outer <Suspense> (which only
// handles route-chunk code-splitting) so navigating to non-catalogue pages
// like /about never shows this catalogue-specific skeleton.
function CatalogueLayout() {
  return (
    <CatalogueErrorBoundary>
      <Suspense fallback={<CatalogueSkeleton />}>
        <Outlet />
      </Suspense>
    </CatalogueErrorBoundary>
  );
}

// Same pathless-layout pattern as CatalogueLayout, for the single dynamic
// /:marketSlug route (MarketPage.jsx) — its content also suspends on a
// live API call (fetchMarketBySlug), so it needs its own Suspense/error
// boundary, with market-appropriate copy and its own cache-reset on retry.
function MarketLayout() {
  const { marketSlug } = useParams();
  return (
    <CatalogueErrorBoundary
      title="Couldn't load this market"
      body="Something went wrong reaching our market data. Please try again, or contact our export team directly if this keeps happening."
      onRetry={() => resetMarketCache(marketSlug)}
    >
      <Suspense fallback={<CatalogueSkeleton />}>
        <Outlet />
      </Suspense>
    </CatalogueErrorBoundary>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const instant = 'instant' in window ? 'instant' : 'auto';

    if (hash) {
      // Jump to the target section instead of forcing scroll-to-top.
      // The target page may still be mounting (route-level code-splitting
      // via React.lazy), so retry briefly until the element exists.
      const id = hash.slice(1);
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (!el) return false;
        el.scrollIntoView({ behavior: instant, block: 'start' });
        return true;
      };

      if (tryScroll()) return undefined;

      let attempts = 0;
      const interval = setInterval(() => {
        attempts += 1;
        if (tryScroll() || attempts >= 20) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }

    window.scrollTo({ top: 0, left: 0, behavior: instant });
    return undefined;
  }, [pathname, hash]);
  return null;
}

// Reports each page view to the backend for the visit-digest email.
// Guards against firing twice for the exact same path in quick succession
// (e.g. React StrictMode's dev-time double-invoke) without adding any
// visible behavior — it just skips the duplicate network call.
function VisitTracker() {
  const location = useLocation();
  const lastReported = useRef(null);

  useEffect(() => {
    const key = location.pathname + location.search;
    if (lastReported.current === key) return;
    lastReported.current = key;
    reportVisit(key);
    trackPageview(key);
  }, [location.pathname, location.search]);

  return null;
}

// The /hq admin section is an internal tool, not part of the public
// marketing site — it shouldn't wear the public Header/Footer/AIChat
// widget or the brand splash Loader. Each /hq page (HqLogin, HqDashboard)
// renders its own minimal chrome instead.
function SiteChrome({ children }) {
  const { pathname } = useLocation();
  const isHq = pathname.startsWith('/hq');

  if (isHq) return children;

  return (
    <>
      <Loader />
      <Header />
      {children}
      <Footer />
      <AIChat />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SmoothScrollProvider>
        <ScrollToTop />
        <VisitTracker />
        <SiteChrome>
        <main id="main-content">
          <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />

              <Route element={<CatalogueLayout />}>
                <Route path="/towels" element={<Towels />} />
                <Route path="/towels/album-zero-twist-towel" element={<Navigate to="/towels/zero-twist-towel" replace />} />
                <Route path="/towels/:categorySlug/:subtypeSlug/:productSlug" element={<TowelDetail />} />
                <Route path="/towels/:categorySlug/:subtypeSlug" element={<TowelSubcategoryPage />} />
                <Route path="/towels/:categorySlug/:productSlug" element={<TowelDetail />} />
                <Route path="/towels/:categorySlug" element={<TowelCategoryPage />} />
                <Route path="/towels/:slug" element={<TowelDetail />} />
                <Route path="/rugs" element={<Rugs />} />
                <Route path="/rugs/:slug" element={<RugDetail />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/linen" element={<Linen />} />
                <Route path="/linen/:slug/:productSlug" element={<LinenDetail />} />
                <Route path="/linen/:slug" element={<LinenCategoryPage />} />
              </Route>

              <Route path="/export" element={<Export />} />
              <Route path="/custom" element={<Custom />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<LegalPage kind="privacy" />} />
              <Route path="/terms-and-conditions" element={<LegalPage kind="terms" />} />

              <Route path="/hq/login" element={<HqLogin />} />
              <Route element={<RequireAuth />}>
                <Route path="/hq" element={<HqDashboard />} />
                <Route path="/hq/enquiries" element={<HqEnquiries />} />
              </Route>

              {/* Dynamic market pages (e.g. /australia, /usa) — driven by
                  the Market database record. Kept last, right before the
                  catch-all, matching this file's existing convention of
                  ordering specific routes before generic ones (React
                  Router itself would also rank every static path above
                  this single dynamic segment regardless of order). */}
              <Route element={<MarketLayout />}>
                <Route path="/:marketSlug" element={<MarketPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        </SiteChrome>
      </SmoothScrollProvider>
    </AuthProvider>
  );
}
