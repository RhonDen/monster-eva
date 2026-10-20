import { useRef, useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { units } from '../data/units.js';
import { gsap, useGSAP } from '../lib/gsap.js';
import useInView from '../hooks/useInView.js';
import UnitSelector from './UnitSelector.jsx';
import SyncMeter from './SyncMeter.jsx';

export default function CanShowcase({ unit, onSelect }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const tiltRef = useRef(null);
  const tilt = useRef(null);
  const shown = useRef(null); // index of the unit currently on screen
  const [message, setMessage] = useState('');
  const seen = useInView(stageRef, { threshold: 0.2 });
  const activeIndex = units.findIndex((u) => u.id === unit.id);

  useEffect(() => { setMessage(''); }, [unit.id]);

  // 1) Mount: starting poses, scroll entrance, tilt
  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const pilots = q('.layer__pilot');
      const cans = q('.layer__can');
      const infos = q('.info');
      const bgs = q('.showcase__bgfx');
      const { a, b, c } = units[activeIndex].colors;

      // Everything hidden except the active unit
      gsap.set([...pilots, ...cans, ...infos, ...bgs], { autoAlpha: 0 });
      gsap.set([pilots[activeIndex], cans[activeIndex], infos[activeIndex], bgs[activeIndex]], { autoAlpha: 1 });
      gsap.set(sectionRef.current, { '--accent': a, '--accent-2': b, '--accent-3': c });
      shown.current = activeIndex;

      // Entrance: ring blooms, can slides in from the left, pilot from the right
      gsap
        .timeline({ scrollTrigger: { trigger: stageRef.current, start: 'top 80%', once: true } })
        .from(q('.showcase__ring'), { scale: 0.4, autoAlpha: 0, duration: 1.3, ease: 'expo.out' }, 0)
        .from(q('.stage__group--cans'), { x: -220, autoAlpha: 0, duration: 1.2, ease: 'back.out(1.2)' }, 0.1)
        .from(q('.stage__group--pilots'), { x: 220, autoAlpha: 0, duration: 1.2, ease: 'back.out(1.2)' }, 0.1);

      gsap.from(infos[activeIndex].children, {
        y: 40, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: q('.showcase__info')[0], start: 'top 85%', once: true },
      });

      // Smooth mouse tilt
      gsap.set(tiltRef.current, { transformPerspective: 1100 });
      tilt.current = {
        ry: gsap.quickTo(tiltRef.current, 'rotationY', { duration: 0.8, ease: 'power3.out' }),
        rx: gsap.quickTo(tiltRef.current, 'rotationX', { duration: 0.8, ease: 'power3.out' }),
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  // 2) Unit change. Rule: cancel whatever is still running, then animate from the CURRENT state.
  useGSAP(
    () => {
      const prev = shown.current;
      if (prev === null || prev === activeIndex) return;

      const q = gsap.utils.selector(sectionRef);
      const pilots = q('.layer__pilot');
      const cans = q('.layer__can');
      const infos = q('.info');
      const bgs = q('.showcase__bgfx');
      const dir = Math.sign(activeIndex - prev);
      const { a, b, c } = units[activeIndex].colors;
      const live = (el) => gsap.getProperty(el, 'opacity') > 0.02;

      // Kill every in-flight tween from the previous click (this is what prevents the blank stage)
      const infoKids = infos.flatMap((el) => [...el.children]);
      gsap.killTweensOf([...pilots, ...cans, ...infos, ...infoKids, ...bgs, sectionRef.current]);

      // Stage: anything visible leaves, everything else is hard-hidden, the new unit arrives
      const stage = gsap.timeline();
      units.forEach((_, i) => {
        if (i === activeIndex) return;
        if (live(cans[i])) {
          stage.to(cans[i], { x: -dir * 140, rotation: -dir * 16, scale: 0.82, autoAlpha: 0, duration: 0.6, ease: 'power3.in' }, 0);
        } else gsap.set(cans[i], { autoAlpha: 0 });
        if (live(pilots[i])) {
          stage.to(pilots[i], { x: dir * 120, scale: 0.94, autoAlpha: 0, duration: 0.6, ease: 'power3.in' }, 0);
        } else gsap.set(pilots[i], { autoAlpha: 0 });
      });
      stage
        .fromTo(
          cans[activeIndex],
          { x: dir * 170, rotation: dir * 18, scale: 0.8, autoAlpha: 0 },
          { x: 0, rotation: 0, scale: 1, autoAlpha: 1, duration: 1.2, ease: 'expo.out' },
          0.2
        )
        .fromTo(
          pilots[activeIndex],
          { x: -dir * 220, scale: 0.92, autoAlpha: 0 },
          { x: 0, scale: 1, autoAlpha: 1, duration: 1.3, ease: 'expo.out' },
          0.3
        );

      // Info text: old block lifts away, new block's lines stagger in
      const info = gsap.timeline();
      infos.forEach((el, i) => {
        if (i === activeIndex) return;
        if (live(el)) info.to(el, { autoAlpha: 0, y: -16, duration: 0.3, ease: 'power2.in' }, 0);
        else gsap.set(el, { autoAlpha: 0 });
      });
      info
        .set(infos[activeIndex], { autoAlpha: 1, y: 0 }, 0.25)
        .fromTo(
          infos[activeIndex].children,
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out' },
          0.25
        );

      // Background glow crossfades (opacity only, cheap) and the accent color tweens
      bgs.forEach((el, i) => gsap.to(el, { autoAlpha: i === activeIndex ? 1 : 0, duration: 1, ease: 'power2.inOut' }));
      gsap.to(sectionRef.current, { '--accent': a, '--accent-2': b, '--accent-3': c, duration: 0.9, ease: 'power2.out' });

      shown.current = activeIndex;
    },
    { dependencies: [activeIndex], scope: sectionRef }
  );

  const canTilt = () =>
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e) => {
    if (!canTilt() || !tilt.current) return;
    const r = stageRef.current.getBoundingClientRect();
    tilt.current.ry(((e.clientX - r.left) / r.width - 0.5) * 10);
    tilt.current.rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const onLeave = () => {
    tilt.current?.ry(0);
    tilt.current?.rx(0);
  };

  return (
    <section
      ref={sectionRef}
      id="units"
      className={`showcase showcase--${unit.id}`}
      aria-labelledby="units-title"
    >
      <div className="showcase__bg" aria-hidden="true">
        {units.map((u) => (
          <div key={u.id} className="showcase__bgfx" style={{ '--ga': u.colors.a, '--gb': u.colors.b }} />
        ))}
      </div>

      <div className="container">
        <header className="section-head">
          <p className="label">THE THREE UNITS</p>
          <h2 id="units-title" className="section-title">CAN AND PILOT, SYNCHRONIZED</h2>
        </header>

        <UnitSelector units={units} activeId={unit.id} onSelect={onSelect} />

        <div id="unit-panel" role="tabpanel" aria-labelledby={`tab-${unit.id}`} className="showcase__panel">
          <div className="showcase__stage" ref={stageRef} onMouseMove={onMove} onMouseLeave={onLeave}>
            <div className="showcase__ring" aria-hidden="true" />
            <div className="showcase__tilt" ref={tiltRef}>
              <div className="stage__group stage__group--pilots">
                {units.map((u, i) => (
                  <img
                    key={u.id}
                    className="layer__pilot"
                    src={u.character}
                    alt={i === activeIndex ? u.characterAlt : ''}
                    aria-hidden={i !== activeIndex}
                    decoding="async"
                  />
                ))}
              </div>
              <div className="stage__group stage__group--cans">
                {units.map((u, i) => (
                  <div
                    key={u.id}
                    className={`layer__can ${i === activeIndex ? 'is-active' : ''}`}
                    aria-hidden={i !== activeIndex}
                  >
                    <img src={u.can} alt={i === activeIndex ? u.canAlt : ''} decoding="async" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* All three info blocks sit in one grid cell, so the layout never jumps between units */}
          <div className="showcase__info">
            {units.map((u, i) => {
              const isActive = i === activeIndex;
              return (
                <div key={u.id} className="info" aria-hidden={!isActive}>
                  <p className="label">{u.code} // {u.series}</p>
                  <h3 className="showcase__name">{u.name}</h3>

                  <dl className="spec">
                    <div><dt>PILOT</dt><dd>{u.pilot}</dd></div>
                    <div><dt>FLAVOR CONCEPT</dt><dd>{u.flavor}</dd></div>
                    <div><dt>SERIES</dt><dd>{u.series}</dd></div>
                  </dl>

                  <p className="showcase__lore">“{u.lore}”</p>

                  <div className="showcase__sync">
                    <SyncMeter
                      value={u.sync}
                      delay={0.4}
                      label="SYNCHRONIZATION INTERFACE"
                      scroll={false}
                      active={isActive && seen}
                    />
                    <p className="sync__mood">{u.mood}</p>
                  </div>

                  <div>
                    <button className="btn btn--accent" onClick={() => setMessage(u.status)} tabIndex={isActive ? 0 : -1}>
                      <Zap size={18} aria-hidden="true" /> {u.button}
                    </button>
                    <p className="showcase__status" role="status" aria-live="polite">{isActive ? message : ''}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
