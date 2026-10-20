import { ShieldAlert } from 'lucide-react';
import Reveal from './Reveal.jsx';
import Vault from './Vault.jsx';

const timeline = [
  { year: 'PHASE 01', text: 'NERV Industrial Division begins synchronization-stabilizer research.' },
  { year: 'PHASE 02', text: 'Three formulations tuned to individual pilot signatures.' },
  { year: 'PHASE 03', text: 'SEELE issues a fourth directive, sourced from the moon.' },
  { year: 'PHASE 04', text: 'Project status: ACTIVE. Distribution: undefined.' },
];

export default function ClassifiedLore() {
  return (
    <section id="lore" className="lore" aria-labelledby="lore-title">
      <div className="lore__lines" aria-hidden="true" />
      <div className="container">
        <header className="section-head">
          <p className="label">CLASSIFIED LORE</p>
          <h2 id="lore-title" className="section-title">THE THIRD IMPACT PROTOCOL</h2>
        </header>

        <div className="lore__status">
          <span>ACCESS LEVEL: <b className="warn">RESTRICTED</b></span>
          <span>PROJECT STATUS: <b className="ok">ACTIVE</b></span>
          <span>AUTHORIZATION: <b>SEELE</b></span>
        </div>

        <div className="lore__grid">
          <Reveal from="left">
            <article className="doc">
              <h3>NERV RESEARCH BACKGROUND</h3>
              <p>
                Four experimental formulations were developed to stabilize the synchronization process.
                One was never intended for human consumption.
              </p>
              <p className="doc__warn">
                <ShieldAlert size={16} aria-hidden="true" /> WARNING: Neural link exceeds safe thresholds when unsupervised.
              </p>
            </article>
          </Reveal>

          <Reveal from="right">
            <ol className="timeline" aria-label="Project timeline">
              {timeline.map((t) => (
                <li key={t.year}>
                  <span>{t.year}</span>
                  <p>{t.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Vault />

        <Reveal from="pop">
          <p className="lore__closing">When the moon is full, the fourth unit answers.</p>
        </Reveal>
      </div>
    </section>
  );
}