import { units } from '../data/units.js';
import ProductCard from './ProductCard.jsx';
import Reveal from './Reveal.jsx';

export default function Collection({ onInspect, activeId }) {
  return (
    <section id="collection" className="collection" aria-labelledby="collection-title">
      <div className="container">
        <header className="section-head">
         
<h2 id="collection-title" className="section-title">THREE UNITS, ONE SYSTEM</h2>
<p className="label">COMPLETE COLLECTION</p>
        </header>
        <div className="collection__grid">
         {units.map((u, i) => (
  <Reveal key={u.id} from="up" delay={i * 0.12} className="collection__item">
    <ProductCard unit={u} active={u.id === activeId} onInspect={onInspect} />
  </Reveal>
))}
        </div>
      </div>
    </section>
  );
}