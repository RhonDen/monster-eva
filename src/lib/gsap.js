import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText, TextPlugin);

export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Reduced motion: make every tween finish almost instantly.
if (reduced) gsap.globalTimeline.timeScale(25);

// ---- Smooth scrolling (Lenis), driven by GSAP's ticker ----
// Only for mouse/trackpad users. Touch devices keep their native momentum scrolling.
let lenis = null;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (!reduced && finePointer) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // DomeGallery adds this class while an image is enlarged. Freeze scrolling then.
  const lockWatcher = new MutationObserver(() => {
    if (document.body.classList.contains('dg-scroll-lock')) lenis.stop();
    else lenis.start();
  });
  lockWatcher.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  // Clean up when Vite hot-reloads this file, so there is never a second Lenis.
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      gsap.ticker.remove(tick);
      lockWatcher.disconnect();
      lenis.destroy();
    });
  }
}

// Images and fonts change the page height after load, so re-measure the triggers.
let refreshTimer;
const scheduleRefresh = () => {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
};
new ResizeObserver(scheduleRefresh).observe(document.body);

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    // Lenis already honors the CSS scroll-padding-top (the navbar height), so no extra offset here.
    lenis.scrollTo(el, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    gsap.to(window, { duration: reduced ? 0 : 1.2, ease: 'power3.inOut', scrollTo: { y: el, offsetY: 68 }, overwrite: true });
  }
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
