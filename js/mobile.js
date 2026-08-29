/**
 * Expert IELTS Presentations — Mobile & Touch Interaction Engine
 * Provides dynamic viewport height (--vh) calculation, touch gestures,
 * swipe navigation, and responsive controls for tablets/iPads/mobile devices.
 */

(function () {
  'use strict';

  const MOBILE_BREAKPOINT = 768;

  /**
   * 1. Viewport Height Fix (Solves mobile browser 100vh address bar jumping)
   */
  function setMobileVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  /**
   * 2. Swipe Navigation for Presentation Slides
   */
  function setupSwipeNavigation() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const MIN_SWIPE_DISTANCE = 50;

    document.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        handleSwipeGesture();
      }
    }, { passive: true });

    function handleSwipeGesture() {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Ensure horizontal swipe is dominant over vertical scroll
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
        if (window.deckEngine) {
          if (deltaX < 0) {
            // Swipe Left -> Next Slide
            if (typeof window.deckEngine.nextSlide === 'function') {
              window.deckEngine.nextSlide();
            }
          } else {
            // Swipe Right -> Prev Slide
            if (typeof window.deckEngine.prevSlide === 'function') {
              window.deckEngine.prevSlide();
            }
          }
        }
      }
    }
  }

  /**
   * 3. Responsive Class & Viewport Watcher
   */
  function checkResponsiveState() {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    if (isMobile) {
      document.body.classList.add('is-mobile-view');
    } else {
      document.body.classList.remove('is-mobile-view');
    }
    setMobileVh();
  }

  function init() {
    setMobileVh();
    checkResponsiveState();
    setupSwipeNavigation();

    window.addEventListener('resize', () => {
      setMobileVh();
      checkResponsiveState();
    }, { passive: true });

    window.addEventListener('orientationchange', () => {
      setTimeout(setMobileVh, 200);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
