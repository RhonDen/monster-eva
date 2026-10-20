import { useRef, useState } from 'react';
import { ShieldAlert, Lock, Unlock } from 'lucide-react';
import thirdImpact from '../assets/cans/third_impact.png';
import { gsap, useGSAP, reduced } from '../lib/gsap.js';

const fields = [
  ['DESIGNATION', 'EVA MARK.06', false],
  ['SERIES', 'Monster Reserve — L.C.L. Infusion', true],
  ['FLAVOR', 'Dark blue raspberry, exotic lychee, tangy L.C.L. tangelo', true],
  ['ORIGIN', 'Lunar directive, SEELE', true],
  ['STATUS', 'UNDISTRIBUTED', false],
];

const SEALED_MSG = '> AWAITING AUTHORIZATION_';
const OPEN_MSG = '> FILE 06: “The fourth can does not stabilize the link. It completes it.”';

export default function Vault() {
  const rootRef = useRef(null);
  const textRef = useRef(null);
  const unsealTl = useRef(null);
  const glitchTl = useRef(null);
  const [unsealed, setUnsealed] = useState(false);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const img = q('.vault__frame img');
      const sealedStamp = q('.vault__stamp--sealed');
      const openStamp = q('.vault__stamp--open');

      // Stamps are centered with xPercent/yPercent so GSAP can scale and rotate them freely
      gsap.set(q('.vault__stamp'), { xPercent: -50, yPercent: -50 });
      gsap.set(sealedStamp, { rotation: -14 });

      // ---- Unseal timeline: paused. play() = unseal, reverse() = reseal ----
      const shake = { x: 6, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' };
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } });
      tl.to(q('.vault__flash'), { autoAlpha: 0.5, duration: 0.07, yoyo: true, repeat: 1, ease: 'none' }, 0)
        .to(sealedStamp, { autoAlpha: 0, scale: 1.7, rotation: -34, duration: 0.45, ease: 'power2.in' }, 0)
        .to(q('.redact-bar'), { scaleX: 0, transformOrigin: 'right center', duration: 0.55, stagger: 0.15, ease: 'power4.inOut' }, 0.1)
        .to(img, { filter: 'grayscale(0) brightness(1) contrast(1) blur(0px)', scale: 1.05, duration: 1.6, ease: 'power2.out' }, 0.25)
        .fromTo(openStamp, { autoAlpha: 0, scale: 3.2, rotation: 14 }, { autoAlpha: 1, scale: 1, rotation: -6, duration: 0.4, ease: 'power4.in' }, 1.0)
        .to(rootRef.current, shake, 1.4)
        .to(q('.vault__flash'), { autoAlpha: 0.35, duration: 0.07, yoyo: true, repeat: 1, ease: 'none' }, 1.4);
      unsealTl.current = tl;

      // ---- Entrance when scrolled into view ----
      gsap
        .timeline({
          scrollTrigger: { trigger: rootRef.current, start: 'top 80%', once: true },
        })
        .from(q('.vault__tape'), { scaleX: 0, transformOrigin: 'left center', duration: 0.9, stagger: 0.15, ease: 'power3.out' }, 0)
        .from(q('.vault__file > *'), { x: -40, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, 0.2)
        .from(q('.vault__frame'), { autoAlpha: 0, scale: 0.88, duration: 0.9, ease: 'back.out(1.4)' }, 0.3)
        .from(q('.vault__corner'), { scale: 2.4, autoAlpha: 0, duration: 0.5, stagger: 0.05, ease: 'back.out(2)' }, 0.6)
        .from(q('.redact-bar'), { scaleX: 0, transformOrigin: 'left center', duration: 0.5, stagger: 0.1, ease: 'power3.out' }, 0.7)
        .fromTo(sealedStamp, { autoAlpha: 0, scale: 3.4, rotation: -40 }, { autoAlpha: 1, scale: 1, rotation: -14, duration: 0.4, ease: 'power4.in' }, 1.0)
        .to(q('.vault__flash'), { autoAlpha: 0.5, duration: 0.06, yoyo: true, repeat: 1, ease: 'none' }, 1.38)
        .to(rootRef.current, shake, 1.38);

      // ---- Ambient life while sealed ----
      if (!reduced) {
        glitchTl.current = gsap
          .timeline({ repeat: -1, repeatDelay: 2.4, delay: 2.5 })
          .to(img, { x: -7, skewX: 6, duration: 0.05 })
          .to(img, { x: 6, skewX: -5, duration: 0.05 })
          .to(img, { x: 0, skewX: 0, duration: 0.06 });

        gsap.to(q('.vault__warn svg'), { scale: 1.3, duration: 0.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      }
    },
    { scope: rootRef, dependencies: [] }
  );

  const toggle = () => {
    const next = !unsealed;
    setUnsealed(next);

    // typewriter status line
    const text = textRef.current;
    const msg = next ? OPEN_MSG : SEALED_MSG;
    gsap.killTweensOf(text);
    text.textContent = '';
    gsap.to(text, { text: msg, duration: msg.length * 0.03, ease: 'none', delay: next ? 0.6 : 0.2 });

    if (next) {
      glitchTl.current?.pause();
      gsap.set(rootRef.current.querySelector('.vault__frame img'), { x: 0, skewX: 0 });
      unsealTl.current?.play();
    } else {
      unsealTl.current?.reverse();
      glitchTl.current?.restart();
    }
  };

  return (
    <div id="classified" ref={rootRef} className="vault">
      <div className="vault__flash" aria-hidden="true" />
      <div className="vault__tape" aria-hidden="true" />

      <div className="vault__grid">
        <div className="vault__file">
          <p className="label">RESTRICTED-ACCESS INTERFACE</p>
          <h3 className="vault__title">FILE 06 // UNIT: MARK.06</h3>

          <p className="vault__warn" role="status" aria-live="polite">
            <ShieldAlert size={16} aria-hidden="true" />
            {unsealed
              ? 'SEELE AUTHORIZATION ACCEPTED. VIEWING LOGGED.'
              : 'ACCESS NOT AUTHORIZED. THIS VIEWING HAS BEEN LOGGED.'}
          </p>

          <dl className="vault__fields">
            {fields.map(([label, value, redacted]) => (
              <div key={label} className="vault__row">
                <dt>{label}</dt>
                <dd>
                  {redacted ? (
                    <span className="redact">
                      {value}
                      <span className="redact-bar" aria-hidden="true" />
                    </span>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <button className="btn btn--accent vault__btn" onClick={toggle} aria-pressed={unsealed}>
            {unsealed ? <Unlock size={18} aria-hidden="true" /> : <Lock size={18} aria-hidden="true" />}
            {unsealed ? 'RESEAL FILE' : 'REQUEST SEELE AUTHORIZATION'}
          </button>

          <p className="vault__text" ref={textRef} aria-hidden="true">{SEALED_MSG}</p>
        </div>

        <figure className="vault__can">
          <div className="vault__frame">
            <img
              src={thirdImpact}
              alt={
                unsealed
                  ? 'EVA Mark.06 Third Impact concept can in midnight navy and imperial gold'
                  : 'Obscured classified can, details withheld'
              }
            />
            <span className="vault__corner vault__corner--tl" aria-hidden="true" />
            <span className="vault__corner vault__corner--tr" aria-hidden="true" />
            <span className="vault__corner vault__corner--bl" aria-hidden="true" />
            <span className="vault__corner vault__corner--br" aria-hidden="true" />
            <span className="vault__rec" aria-hidden="true"><i />REC // CAM-06</span>
            <span className="vault__stamp vault__stamp--sealed" aria-hidden="true">TOP SECRET</span>
            <span className="vault__stamp vault__stamp--open" aria-hidden="true">SEELE EYES ONLY</span>
          </div>
          <figcaption>CAPTURE 03:17:42 // UNAUTHORIZED VIEWING LOGGED</figcaption>
        </figure>
      </div>

      <div className="vault__tape" aria-hidden="true" />
    </div>
  );
}