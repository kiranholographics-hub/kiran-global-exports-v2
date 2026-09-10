const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let initialized = false;

// No-ops entirely when VITE_GA_MEASUREMENT_ID isn't set, so local/dev/CI
// builds never send real traffic to the production GA4 property.
export function initGA() {
  if (!GA_ID || initialized) return;
  initialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  // send_page_view: false — this is an SPA; the initial gtag.js load fires
  // before React Router exists, so page views are sent manually on every
  // route change via trackPageview() instead of relying on the default
  // once-per-load auto pageview.
  window.gtag('config', GA_ID, { send_page_view: false });
}

export function trackPageview(path) {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path });
}
