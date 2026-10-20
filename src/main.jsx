import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css';
import './styles/animations.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/showcase.css';
import './styles/collection.css';
import './styles/pilots.css';
import './styles/lore.css';
import './styles/footer.css';
import './styles/gallery.css';
import './styles/player.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
