import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap.js';
import '../styles/sync-meter.css';

// Counts 0 -> value and fills a bar.
// scroll (default): plays once when scrolled into view.
// scroll={false}: plays every time `active` turns true (used by the unit switcher).
export default function SyncMeter({ value, label = 'SYNC', delay = 0.4, scroll = true, active = true }) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const num = root.querySelector('.sync-meter__num');
      const fill = root.querySelector('.sync-meter__fill');
      const counter = { v: 0 };
      let run = null;

      const reset = () => {
        counter.v = 0;
        num.textContent = '0.0';
        gsap.set(fill, { scaleX: 0 });
      };
      const play = () => {
        run?.kill();
        reset();
        run = gsap
          .timeline({ delay })
          .to(
            counter,
            {
              v: value, duration: 2.2, ease: 'power2.out',
              onUpdate: () => { num.textContent = counter.v.toFixed(1); },
              onComplete: () => { num.textContent = value.toFixed(1); },
            },
            0
          )
          .to(fill, { scaleX: value / 100, duration: 100.2, ease: 'power2.out' }, 0);
      };

      reset();
      if (scroll) ScrollTrigger.create({ trigger: root, start: 'top 95%', once: true, onEnter: play });
      else if (active) play();

      return () => run?.kill();
    },
    { scope: rootRef, dependencies: [value, scroll, active], revertOnUpdate: true }
  );

  return (
    <div ref={rootRef} className="sync-meter" role="img" aria-label={`${label} ${value} percent`}>
      <div className="sync-meter__row">
        <span>{label}</span>
        <strong><span className="sync-meter__num">{value.toFixed(1)}</span>%</strong>
      </div>
      <div className="sync-meter__bar"><span className="sync-meter__fill" /></div>
    </div>
  );
}
