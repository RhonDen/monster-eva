import { ChevronRight, FileLock2 } from 'lucide-react';
import LiquidChrome from './LiquidChrome.jsx';
import TechText from './TechText.jsx';
import monsterLogo from '../assets/monster-logo.png';
import evaLogo from '../assets/evangelion-logo.png';
import MusicPlayer from './MusicPlayer.jsx';
import { scrollToId } from '../lib/gsap.js';

const DISPLAY_FONT = "'Shippori Mincho B1', serif";

// Shared TechText settings so the three lines match.
const tech = {
  fontFamily: DISPLAY_FONT,
  fontWeight: 800,
  fontSize: 130,
  letterSpacing: 0.01,
  align: 'left',
  reveal: 'letter',
  dashLength: 4,
  dashGap: 2,
  specks: 15,
  intro: 'none',
  introDuration: 2,
  clickKick: true,
  guides: false,
  accentColor: '#9dff3d',
};

export default function Hero() {
  const go = (e, id) => { e.preventDefault(); scrollToId(id); };
  

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <LiquidChrome color="#3ad204" speed={0.2} amplitude={0.3} detail={4} thickness={1} interactive />
      </div>
      <div className="hero__shade" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__copy">
          

          {/* TechText draws one line on a canvas, so the title is three stacked lines. */}
          <h1 id="hero-title" className="hero__title" aria-label="Project Third Impact">
            <TechText className="hero__tech" text="PROJECT" {...tech} />
            <TechText className="hero__tech" text="THIRD" {...tech} />
            <TechText className="hero__tech hero__tech--green" text="IMPACT" {...tech} />
          </h1>
    
          
{/*  
          <div className="hero__actions">
            <a href="#units" className="btn btn--primary" onClick={(e) => go(e, 'units')}>
              EXPLORE THE UNITS <ChevronRight size={18} aria-hidden="true" />
            </a>
            <a href="#classified" className="btn btn--ghost" onClick={(e) => go(e, 'classified')}>
              <FileLock2 size={18} aria-hidden="true" /> ACCESS CLASSIFIED FILES
            </a>
          </div>

          <dl className="hero__sys">
            <div><dt>NERV INDUSTRIAL COLLABORATION</dt></div>
            <div><dt>SYNC RATE:</dt><dd>98.7%</dd></div>
            <div><dt>ENERGY CORE:</dt><dd className="ok">ACTIVE</dd></div>
            <div><dt>CLASSIFICATION:</dt><dd className="warn">RESTRICTED</dd></div>
          </dl>
          <div className="meter" role="img" aria-label="Synchronization meter at 98.7 percent">
            <span className="meter__fill" style={{ '--value': '98.7%' }} />
          </div> 
          */}
        </div>

        <div className="hero__visual">
          <div className="lockup">
            <img src={monsterLogo} alt="Monster Energy" className="lockup__logo" fetchPriority="high" />
            <span className="lockup__x" aria-hidden="true">×</span>
            <img src={evaLogo} alt="Neon Genesis Evangelion" className="lockup__logo" fetchPriority="high" />
          </div>
                <MusicPlayer />
        </div>
      </div>
    </section>
  );
}