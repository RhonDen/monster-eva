import monsterLogo from '../assets/monster-logo.png';
import evaLogo from '../assets/evangelion-logo.png';
import { scrollToId } from '../lib/gsap.js';

const links = [
  ['home', 'HOME'],
  ['units', 'THE UNITS'],
  ['pilots', 'PILOTS'],
  ['gallery', 'GALLERY'],
  ['lore', 'LORE'],
  ['classified', 'CLASSIFIED'],
];

export default function Footer() {
 const go = (e, id) => { e.preventDefault(); scrollToId(id); };
 
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={monsterLogo} alt="Monster Energy" />
          <span aria-hidden="true">×</span>
          <img src={evaLogo} alt="Neon Genesis Evangelion" />
        </div>
        <nav aria-label="Footer" className="footer__links">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={(e) => go(e, id)}>{label}</a>
          ))}
        </nav>
        <p className="label">CLASSIFICATION: RESTRICTED // PROJECT THIRD IMPACT</p>
        <p className="footer__disclaimer">
          Unofficial fan-made concept. Monster Energy and Evangelion are trademarks of their respective
          owners. This project is not affiliated with or endorsed by either rights holder.
        </p>
        <p className="footer__copy">© {new Date().getFullYear()} Project Third Impact (fan concept).</p>
      </div>
    </footer>
  );
}