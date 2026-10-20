import { useRef } from 'react';
import { pilots } from '../data/units.js';
import ReflectiveCard from '../ReflectiveCard.jsx';
import Reveal from '../components/Reveal.jsx';
import useInView from '../hooks/useInView.js';
import SyncMeter from './SyncMeter.jsx';

const EVA_INFO = {
  'EVA-00': { name: 'Evangelion Unit-00', role: 'Prototype Model', tint: '#f1e2a6' },
  'EVA-01': { name: 'Evangelion Unit-01', role: 'Test Type', tint: '#c4f5a0' },
  'EVA-02': { name: 'Evangelion Unit-02', role: 'Production Model', tint: '#ffb4a8' },
};

function PilotRow({ p, flip }) {
  const rowRef = useRef(null);
  const inView = useInView(rowRef, { threshold: 0.3 });
  const eva = EVA_INFO[p.unit];

  return (
    <article ref={rowRef} className={`pilot-row pilot--${p.id} ${flip ? 'pilot-row--flip' : ''}`}>
      {/* Pilot profile */}
      <Reveal from={flip ? 'right' : 'left'}>
        <div className="pilot">
          <div className="pilot__portrait">
            <img src={p.image} alt={p.alt} loading="lazy" />
          </div>
          <div className="pilot__body">
            <p className="label">PILOT OF {p.unit}</p>
            <h3 className="pilot__name">{p.name}</h3>
            <p className="pilot__text">{p.personality}</p>
            <dl className="pilot__meta">
              <div><dt>SYNC READING</dt><dd>{p.sync}</dd></div>
              <div><dt>FLAVOR CONCEPT</dt><dd>{p.flavor}</dd></div>
            </dl>
            <blockquote className="pilot__quote">{p.excerpt}</blockquote>
          </div>
        </div>
      </Reveal>

      {/* The EVA, as its own card */}
      <div className="eva-slot">
        {inView && (
          <ReflectiveCard
            width="100%"
            height={470}
            tint={eva.tint}
            metalness={1}
            roughness={0.3}
            blurStrength={6}
            shine={1}
            glare={0.5}
          >
            <div className="eva">
  <div className="eva__head">
    <span className="eva__code">{p.unit}</span>
    <span className="eva__status"><i />ONLINE</span>
  </div>
  <img className="eva__img" src={p.mech} alt={p.mechAlt} loading="lazy" decoding="async" />
  <div>
    <p className="eva__name">{eva.name}</p>
    <p className="eva__role">{eva.role}</p>
  </div>
  <SyncMeter value={parseFloat(p.sync)} delay={1} label="SYNCHRONIZATION" />
</div>

          </ReflectiveCard>
        )}
      </div>
    </article>
  );
}

export default function PilotProfiles() {
  return (
    <section id="pilots" className="pilots" aria-labelledby="pilots-title">
      <div className="container">
        <header className="section-head">
          <p className="label">THE HUMAN FACTOR</p>
          <h2 id="pilots-title" className="section-title">BEHIND EVERY UNIT IS A PILOT.</h2>
          <p className="pilots__note">Synchronization readings are fictional interface details, not canonical statistics.</p>
        </header>

        <div className="pilots__list">
          {pilots.map((p, i) => (
            <PilotRow key={p.id} p={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}