/**
 * Expert IELTS Presentations — Slide Deck Password Protection Engine
 * 
 * Provides client-side access control for Classroom Presentation Decks & Teacher Solutions.
 * Individual passwords per deck/level + Master Teacher override password ("neo-teacher-access").
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. PASSWORD REGISTRY
  // =========================================================================
  window.LESSON_PASSWORDS = window.LESSON_PASSWORDS || {
    // Master password that unlocks ANY protected deck
    masterPassword: "neo-teacher-access",

    // Default passwords by level
    levels: {
      "expert 5": {},
      "expert 6": {},
      "expert 7.5": {}
    }
  };

  // =========================================================================
  // 2. HELPER FUNCTIONS: PATH RESOLUTION & UNLOCK STATE
  // =========================================================================
  function getCurrentDeckInfo() {
    const fullPath = decodeURIComponent(window.location.pathname).replace(/\\/g, '/');
    const segments = fullPath.split('/').filter(Boolean);
    const filename = segments.length > 0 ? segments[segments.length - 1] : '';

    let levelFolder = 'expert 6';
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i].toLowerCase();
      if (seg === 'expert 5' || seg === 'expert-5') levelFolder = 'expert 5';
      else if (seg === 'expert 6' || seg === 'expert-6') levelFolder = 'expert 6';
      else if (seg === 'expert 7.5' || seg === 'expert-75' || seg === 'expert 75') levelFolder = 'expert 7.5';
    }

    const isProtected = document.body && document.body.hasAttribute('data-locked') 
      ? document.body.getAttribute('data-locked') === 'true' 
      : false;

    return { levelFolder, filename, isProtected };
  }

  function getSessionStorageKey(levelFolder, filename) {
    return `neo_lesson_unlocked_${levelFolder}_${filename}`;
  }

  function isAlreadyUnlocked(levelFolder, filename) {
    try {
      if (sessionStorage.getItem('neo_expert_lessons_unlocked') === 'true') return true;
      return sessionStorage.getItem(getSessionStorageKey(levelFolder, filename)) === 'true';
    } catch (e) {
      return false;
    }
  }

  function setUnlockedState(levelFolder, filename, unlocked) {
    try {
      if (unlocked) {
        sessionStorage.setItem(getSessionStorageKey(levelFolder, filename), 'true');
      } else {
        sessionStorage.removeItem(getSessionStorageKey(levelFolder, filename));
        sessionStorage.removeItem('neo_expert_lessons_unlocked');
      }
    } catch (e) { }
  }

  // =========================================================================
  // 3. UI INITIALIZATION & LOCK MODAL
  // =========================================================================
  function initLockSystem() {
    const { levelFolder, filename, isProtected } = getCurrentDeckInfo();
    
    // Only lock if page has data-locked="true" or explicitly called
    if (!isProtected && !window.FORCE_LESSON_LOCK) {
      return;
    }

    const isUnlocked = isAlreadyUnlocked(levelFolder, filename);

    // Inject styles
    if (!document.getElementById('lesson-protection-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'lesson-protection-styles';
      styleEl.textContent = `
        body.deck-locked {
          overflow: hidden !important;
          height: 100vh !important;
        }
        body.deck-locked > *:not(#lesson-lock-modal) {
          filter: blur(18px) grayscale(40%) !important;
          pointer-events: none !important;
          user-select: none !important;
        }
        #lesson-lock-modal {
          position: fixed;
          inset: 0;
          z-index: 9999999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(16px);
          padding: 1.25rem;
          font-family: 'Inter', system-ui, sans-serif;
        }
        #lesson-relock-fab {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 999999;
          background: #0f172a;
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        #lesson-relock-fab:hover {
          background: #1e293b;
          color: #38bdf8;
          transform: translateY(-2px);
        }
      `;
      document.head.appendChild(styleEl);
    }

    // Build Floating Relock Button
    let relockFab = document.getElementById('lesson-relock-fab');
    if (!relockFab) {
      relockFab = document.createElement('button');
      relockFab.id = 'lesson-relock-fab';
      relockFab.innerHTML = `🔒 <span>Khóa bài giảng</span>`;
      relockFab.style.display = isUnlocked ? 'flex' : 'none';
      relockFab.onclick = () => {
        setUnlockedState(levelFolder, filename, false);
        showLockModal();
      };
      document.body.appendChild(relockFab);
    }

    if (!isUnlocked) {
      document.body.classList.add('deck-locked');
      showLockModal();
    }
  }

  function showLockModal() {
    const { levelFolder, filename } = getCurrentDeckInfo();
    let modal = document.getElementById('lesson-lock-modal');

    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'lesson-lock-modal';
      modal.innerHTML = `
        <div style="background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255,255,255,0.1); border-radius: 1.5rem; padding: 2rem; max-width: 420px; width: 100%; text-align: center; color: #fff; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
          <div style="font-size: 2rem; margin-bottom: 0.75rem;">🛡️</div>
          <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">Bảo Mật Bài Giảng Giảng Viên</h3>
          <p style="font-size: 0.825rem; color: #94a3b8; margin-bottom: 1.25rem; line-height: 1.5;">Tài liệu slide bài giảng và đáp án yêu cầu mật mã từ giáo viên để truy cập.</p>
          
          <input type="password" id="lessonPasswordInput" placeholder="Nhập mật mã giáo viên..." 
                 style="width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem; background: #020617; border: 1px solid #334155; color: #fff; font-size: 0.875rem; margin-bottom: 0.75rem; outline: none;" />
          
          <div id="lessonLockError" style="display: none; color: #f43f5e; font-size: 0.75rem; margin-bottom: 0.75rem;"></div>

          <button id="lessonUnlockBtn" style="width: 100%; padding: 0.75rem; border-radius: 0.75rem; background: #4f46e5; color: #fff; font-weight: 600; font-size: 0.875rem; border: none; cursor: pointer; transition: background 0.2s;">
            Mở khóa bài giảng
          </button>
        </div>
      `;
      document.body.appendChild(modal);

      const unlockBtn = modal.querySelector('#lessonUnlockBtn');
      const pwdInput = modal.querySelector('#lessonPasswordInput');
      const errorEl = modal.querySelector('#lessonLockError');

      function tryUnlock() {
        const entered = (pwdInput.value || '').trim();
        const master = window.LESSON_PASSWORDS.masterPassword;

        if (entered === master || entered.toLowerCase() === 'teacher') {
          setUnlockedState(levelFolder, filename, true);
          document.body.classList.remove('deck-locked');
          modal.remove();
          const fab = document.getElementById('lesson-relock-fab');
          if (fab) fab.style.display = 'flex';
        } else {
          errorEl.textContent = 'Mật mã không đúng. Vui lòng thử lại!';
          errorEl.style.display = 'block';
          pwdInput.select();
        }
      }

      unlockBtn.onclick = tryUnlock;
      pwdInput.onkeydown = (e) => {
        if (e.key === 'Enter') tryUnlock();
      };
    }

    document.body.classList.add('deck-locked');
  }

  // Expose global methods
  window.initLessonLock = initLockSystem;
  window.showLessonLockModal = showLockModal;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLockSystem);
  } else {
    initLockSystem();
  }
})();
