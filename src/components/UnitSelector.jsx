export default function UnitSelector({ units, activeId, onSelect }) {
  // Arrow keys move between tabs (standard tablist behaviour).
  const onKeyDown = (e, index) => {
    let next = null;
    if (e.key === 'ArrowRight') next = (index + 1) % units.length;
    if (e.key === 'ArrowLeft') next = (index - 1 + units.length) % units.length;
    if (next === null) return;
    e.preventDefault();
    onSelect(units[next].id);
    document.getElementById(`tab-${units[next].id}`)?.focus();
  };

  return (
    <div className="selector" role="tablist" aria-label="Select a unit">
      {units.map((u, i) => {
        const selected = u.id === activeId;
        return (
          <button
            key={u.id}
            id={`tab-${u.id}`}
            role="tab"
            aria-selected={selected}
            aria-controls="unit-panel"
            tabIndex={selected ? 0 : -1}
            className={`selector__tab ${selected ? 'is-active' : ''}`}
            onClick={() => onSelect(u.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {u.tab}
          </button>
        );
      })}
    </div>
  );
}