import { useState, useCallback, useRef } from 'react';
import { units, DEFAULT_UNIT_ID } from './data/units.js';
import { gsap, ScrollTrigger, SplitText, useGSAP, scrollToId } from './lib/gsap.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import CanShowcase from './components/CanShowcase.jsx';
import Collection from './components/Collection.jsx';
import PilotProfiles from './components/PilotProfiles.jsx';
import Gallery from './components/Gallery.jsx';
import ClassifiedLore from './components/ClassifiedLore.jsx';
import Footer from './components/Footer.jsx';

// Starting pose for each data-reveal="..." type
const REVEAL_FROM = {
  up: { y: 70, scale: 0.94 },
  left: { x: -120 },
  right: { x: 120 },
  pop: { y: 40, scale: 0.7 },
};

export default function App() {
  const appRef = useRef(null);
  const [activeId, setActiveId] = useState(DEFAULT_UNIT_ID);
  const activeUnit = units.find((u) => u.id === activeId);

  const inspectUnit = useCallback((id) => {
    setActiveId(id);
    scrollToId('units');
  }, []);

  useGSAP(
    () => {
      // ---- Hero intro on page load ----
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero__bg', { autoAlpha: 0, duration: 1.8, ease: 'power2.out' }, 0)
        .from('.hero__tech', { xPercent: -10, autoAlpha: 0, duration: 1.1, stagger: 0.12 }, 0.15)
        .from('.lockup__logo', { scale: 0.5, autoAlpha: 0, duration: 1.1, ease: 'back.out(1.7)', stagger: 0.15 }, 0.25)
        .from('.lockup__x', { scale: 0, rotation: -180, autoAlpha: 0, duration: 0.8, ease: 'back.out(2)' }, 0.6)
        .from('.player', { y: 60, autoAlpha: 0, duration: 1 }, 0.75);

      // Hero drifts up slowly as you scroll away from it
      gsap.to('.hero__inner', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
      });

      // ---- Section headings: small text pops, title letters spring up ----
      gsap.utils.toArray('.section-head').forEach((head) => {
        const title = head.querySelector('.section-title');
        const rest = head.querySelectorAll(':scope > :not(.section-title)');

        if (rest.length) {
          gsap.from(rest, {
            y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: head, start: 'top 88%', once: true },
          });
        }

        if (title) {
          SplitText.create(title, {
            type: 'words,chars',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.chars, {
                yPercent: 120, rotate: 8, autoAlpha: 0, duration: 0.9, ease: 'expo.out', stagger: 0.025,
                scrollTrigger: { trigger: title, start: 'top 88%', once: true },
              }),
          });
        }
      });

      // ---- Everything marked data-reveal pops up when reached ----
      const targets = gsap.utils.toArray('[data-reveal]');
      targets.forEach((el) => gsap.set(el, { autoAlpha: 0, ...REVEAL_FROM[el.dataset.reveal || 'up'] }));
      ScrollTrigger.batch(targets, {
        start: 'top 90%',
        once: true,
        interval: 0.1,
        onEnter: (batch) =>
          gsap.to(batch, {
            x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 1.1, ease: 'back.out(1.25)', stagger: 0.12, overwrite: true,
          }),
      });
    },
    { scope: appRef, dependencies: [] }
  );

  return (
    <div ref={appRef}>
      <Navbar />
      <main>
        <Hero />
        <CanShowcase unit={activeUnit} onSelect={setActiveId} />
        <Collection onInspect={inspectUnit} activeId={activeId} />
        <PilotProfiles />
        <Gallery />
        <ClassifiedLore />
      </main>
      <Footer />
    </div>
  );
}
