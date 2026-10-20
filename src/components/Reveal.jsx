// Marks an element to pop up when scrolled into view.
// The animation itself lives in App.jsx (one ScrollTrigger.batch for the whole page),
// so there is no per-element GSAP code here.
export default function Reveal({ from = 'up', className = '', children }) {
  return (
    <div data-reveal={from} className={className}>
      {children}
    </div>
  );
}
