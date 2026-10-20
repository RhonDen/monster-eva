import { Search } from 'lucide-react';

export default function ProductCard({ unit, active, onInspect }) {
  return (
    <article
      className={`card ${active ? 'is-active' : ''}`}
      style={{ '--accent': unit.colors.a, '--accent-2': unit.colors.b }}
    >
      <div className="card__media">
        <img src={unit.can} alt={unit.canAlt} loading="lazy" />
      </div>
      <p className="label">{unit.code}</p>
      <h3 className="card__name">{unit.name}</h3>
      <dl className="card__meta">
        <div><dt>PILOT</dt><dd>{unit.pilot}</dd></div>
        <div><dt>SERIES</dt><dd>{unit.series}</dd></div>
        <div><dt>FLAVOR</dt><dd>{unit.flavor}</dd></div>
      </dl>
      <button className="btn btn--outline" onClick={() => onInspect(unit.id)}>
        <Search size={16} aria-hidden="true" /> INSPECT UNIT
      </button>
    </article>
  );
}