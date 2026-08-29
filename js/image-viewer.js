/**
 * Expert IELTS Presentations — Interactive Visual Reference & Pan/Zoom Lightbox Engine
 * Provides full mouse drag, touch pan, pinch-to-zoom, wheel zoom, and keyboard controls.
 * Auto-injects modal and styles if not present in the deck.
 */

(function () {
  'use strict';

  let currentZoom = 1;
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 4.0;
  const ZOOM_STEP = 0.25;

  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  // Touch tracking for pinch-to-zoom
  let initialPinchDistance = null;
  let initialPinchZoom = 1;

  function ensureModalStructure() {
    if (document.getElementById('imageZoomModal')) return;

    const modal = document.createElement('div');
    modal.id = 'imageZoomModal';
    modal.className = 'fixed inset-0 z-[999999] hidden items-center justify-center bg-slate-950/90 backdrop-blur-md p-4';
    modal.style.display = 'none';
    modal.innerHTML = `
      <!-- Toolbar Header -->
      <div class="absolute top-4 right-4 z-50 flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-full px-3 py-1.5 shadow-2xl backdrop-blur-sm">
        <span id="zoomLevelText" class="text-xs font-mono font-bold text-sky-400 px-2 min-w-[50px] text-center select-none">100%</span>
        <div class="h-4 w-[1px] bg-slate-700"></div>
        <button type="button" onclick="zoomIn()" class="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition" title="Zoom In (+)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        </button>
        <button type="button" onclick="zoomOut()" class="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition" title="Zoom Out (-)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
        </button>
        <button type="button" onclick="resetZoom()" class="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition" title="Reset Zoom (0)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.03 8.03 0 01-15.357-2m15.357 2H15"/></svg>
        </button>
        <div class="h-4 w-[1px] bg-slate-700"></div>
        <button type="button" onclick="closeImageModal()" class="p-1.5 text-rose-400 hover:text-rose-300 rounded-full hover:bg-rose-950/40 transition" title="Close (Esc)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Hint bottom -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-[11px] text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800 pointer-events-none select-none">
        Scroll / Pinch to zoom • Drag to pan • Double click to toggle
      </div>

      <!-- Viewport & Image Canvas -->
      <div id="modalViewport" class="relative w-full h-full flex items-center justify-center overflow-hidden cursor-zoom-in">
        <img id="modalZoomImg" src="" alt="Zoomable Reference" class="max-w-[90%] max-h-[85vh] object-contain select-none transition-transform shadow-2xl rounded-lg" draggable="false" />
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeImageModal();
    });
  }

  function getModalElements() {
    ensureModalStructure();
    return {
      modal: document.getElementById('imageZoomModal'),
      viewport: document.getElementById('modalViewport'),
      img: document.getElementById('modalZoomImg'),
      zoomText: document.getElementById('zoomLevelText'),
      originalImg: document.getElementById('grammar-reference-img') || document.querySelector('.visual-reference-img, .chart-container img, [data-zoomable="true"]')
    };
  }

  function updateTransform(withAnimation = false) {
    const { img, zoomText, viewport } = getModalElements();
    if (!img) return;

    img.style.transition = withAnimation ? 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)' : 'none';
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;

    if (zoomText) {
      zoomText.textContent = `${Math.round(currentZoom * 100)}%`;
    }

    if (viewport) {
      if (isDragging) {
        viewport.style.cursor = 'grabbing';
        if (img) img.style.cursor = 'grabbing';
      } else if (currentZoom > 1) {
        viewport.style.cursor = 'grab';
        if (img) img.style.cursor = 'grab';
      } else {
        viewport.style.cursor = 'zoom-in';
        if (img) img.style.cursor = 'zoom-in';
      }
    }
  }

  function openImageModal(imgSrc) {
    const { modal, img, originalImg } = getModalElements();
    if (!modal || !img) return;

    const source = imgSrc || (originalImg ? originalImg.src : null);
    if (!source || source.trim() === '') {
      return;
    }

    img.src = source;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    resetZoom();
  }

  function closeImageModal() {
    const { modal } = getModalElements();
    if (!modal) return;

    modal.classList.add('hidden');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    resetZoom();
  }

  function setZoom(newZoom, centerX = null, centerY = null, withAnimation = true) {
    const clampedZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(newZoom * 100) / 100));
    if (clampedZoom === currentZoom) return;

    const { viewport } = getModalElements();

    if (centerX !== null && centerY !== null && viewport) {
      const rect = viewport.getBoundingClientRect();
      const originX = centerX - rect.left - rect.width / 2;
      const originY = centerY - rect.top - rect.height / 2;

      const scaleChange = clampedZoom / currentZoom;
      translateX = originX - (originX - translateX) * scaleChange;
      translateY = originY - (originY - translateY) * scaleChange;
    }

    currentZoom = clampedZoom;
    if (currentZoom <= 1 && clampedZoom <= 1) {
      translateX = 0;
      translateY = 0;
    }

    updateTransform(withAnimation);
  }

  function zoomIn() {
    setZoom(currentZoom + ZOOM_STEP);
  }

  function zoomOut() {
    setZoom(currentZoom - ZOOM_STEP);
  }

  function resetZoom() {
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    updateTransform(true);
  }

  function toggleZoom(e) {
    if (e) e.stopPropagation();
    if (currentZoom <= 1.1) {
      const clientX = e ? e.clientX : null;
      const clientY = e ? e.clientY : null;
      setZoom(2.0, clientX, clientY, true);
    } else {
      resetZoom();
    }
  }

  function handleWheelZoom(e) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.2 : -0.2;
    setZoom(currentZoom + delta, e.clientX, e.clientY, false);
  }

  function setupMouseDrag() {
    const { viewport, img } = getModalElements();
    if (!viewport) return;

    function onMouseDown(e) {
      if (e.button !== 0) return;
      e.preventDefault();

      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;

      updateTransform(false);

      function onMouseMove(moveEvent) {
        if (!isDragging) return;
        moveEvent.preventDefault();
        translateX = moveEvent.clientX - startX;
        translateY = moveEvent.clientY - startY;
        updateTransform(false);
      }

      function onMouseUp() {
        if (!isDragging) return;
        isDragging = false;
        updateTransform(true);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      }

      window.addEventListener('mousemove', onMouseMove, { passive: false });
      window.addEventListener('mouseup', onMouseUp);
    }

    viewport.addEventListener('mousedown', onMouseDown);
    if (img) img.addEventListener('mousedown', onMouseDown);
  }

  function setupTouchDrag() {
    const { viewport } = getModalElements();
    if (!viewport) return;

    function getTouchDistance(touch1, touch2) {
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      return Math.hypot(dx, dy);
    }

    viewport.addEventListener(
      'touchstart',
      function (e) {
        if (e.touches.length === 1) {
          isDragging = true;
          const touch = e.touches[0];
          startX = touch.clientX - translateX;
          startY = touch.clientY - translateY;
          initialPinchDistance = null;
        } else if (e.touches.length === 2) {
          isDragging = false;
          initialPinchDistance = getTouchDistance(e.touches[0], e.touches[1]);
          initialPinchZoom = currentZoom;
        }
      },
      { passive: true }
    );

    viewport.addEventListener(
      'touchmove',
      function (e) {
        if (isDragging && e.touches.length === 1) {
          e.preventDefault();
          const touch = e.touches[0];
          translateX = touch.clientX - startX;
          translateY = touch.clientY - startY;
          updateTransform(false);
        } else if (e.touches.length === 2 && initialPinchDistance) {
          e.preventDefault();
          const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
          const scaleMultiplier = currentDistance / initialPinchDistance;
          const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
          const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
          setZoom(initialPinchZoom * scaleMultiplier, midX, midY, false);
        }
      },
      { passive: false }
    );

    viewport.addEventListener('touchend', function (e) {
      if (e.touches.length === 0) {
        isDragging = false;
        initialPinchDistance = null;
        updateTransform(true);
      } else if (e.touches.length === 1) {
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX - translateX;
        startY = touch.clientY - translateY;
        initialPinchDistance = null;
      }
    });
  }

  function setupKeyboardControls() {
    document.addEventListener('keydown', function (e) {
      const modal = document.getElementById('imageZoomModal');
      if (!modal || modal.classList.contains('hidden') || modal.style.display === 'none') {
        return;
      }

      switch (e.key) {
        case 'Escape':
          closeImageModal();
          break;
        case '+':
        case '=':
          zoomIn();
          break;
        case '-':
        case '_':
          zoomOut();
          break;
        case '0':
          resetZoom();
          break;
        case 'ArrowLeft':
          translateX += 40;
          updateTransform(true);
          break;
        case 'ArrowRight':
          translateX -= 40;
          updateTransform(true);
          break;
        case 'ArrowUp':
          translateY += 40;
          updateTransform(true);
          break;
        case 'ArrowDown':
          translateY -= 40;
          updateTransform(true);
          break;
      }
    });
  }

  function bindDeckImages() {
    document.querySelectorAll('.visual-reference-img, .chart-container img, [data-zoomable="true"], .slide-figure img').forEach(imgEl => {
      imgEl.style.cursor = 'zoom-in';
      imgEl.title = 'Click to open in pan/zoom lightbox';
      imgEl.addEventListener('click', (e) => {
        e.stopPropagation();
        openImageModal(imgEl.src);
      });
    });
  }

  function init() {
    ensureModalStructure();
    const { viewport, img } = getModalElements();

    if (viewport) {
      setupMouseDrag();
      setupTouchDrag();
      viewport.addEventListener('wheel', handleWheelZoom, { passive: false });
      viewport.addEventListener('dblclick', toggleZoom);
    }

    if (img) {
      img.style.pointerEvents = 'auto';
      img.style.userSelect = 'none';
    }

    bindDeckImages();
    setupKeyboardControls();
  }

  // Expose global methods
  window.openImageModal = openImageModal;
  window.closeImageModal = closeImageModal;
  window.zoomIn = zoomIn;
  window.zoomOut = zoomOut;
  window.resetZoom = resetZoom;
  window.toggleZoom = toggleZoom;
  window.handleWheelZoom = handleWheelZoom;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
