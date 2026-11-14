import {createRoot} from 'react-dom/client';
import {MotionConfig} from 'motion/react';
import App from './App.tsx';
import {SmoothScroll} from './components/SmoothScroll';
import {Preloader} from './components/Preloader';
import './index.css';

createRoot(document.getElementById('root')!).render(
  /* reducedMotion="user" makes every Motion transform animation respect the OS setting */
  <MotionConfig reducedMotion="user">
    <SmoothScroll>
      <Preloader />
      <App />
    </SmoothScroll>
  </MotionConfig>,
);
