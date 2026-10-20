import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import monsterLogo from '../assets/monster-logo.png';
import { scrollToId } from '../lib/gsap.js';

const links = [
  { id: 'home', label: 'HOME' },
  { id: 'units', label: 'THE UNITS' },
  { id: 'pilots', label: 'PILOTS' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'lore', label: 'LORE' },
  { id: 'classified', label: 'CLASSIFIED' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the link of whichever section is crossing the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  

const go = (e, id) => 
  { e.preventDefault(); setOpen(false); scrollToId(id); };

  return (
    <header className={`navbar ${scrolled ? 'navbar--solid' : ''}`}>
      <div className="navbar__inner container">
        <a href="#home" className="navbar__brand" onClick={(e) => go(e, 'home')} aria-label="Monster × NERV, back to top">
          
          <span className="navbar__brand-text">MONSTER × NERV</span>
        </a>

        <nav id="primary-nav" className={`navbar__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {links.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => go(e, id)}
              className={active === id ? 'is-active' : ''}
              aria-current={active === id ? 'true' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

      

        <button
          className="navbar__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}