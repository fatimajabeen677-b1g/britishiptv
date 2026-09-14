/* ============================================================
   BRITISH IPTV — MASTER JAVASCRIPT
   ============================================================ */

// ===== SLIDE NAVIGATION =====
(function() {
  const menuToggle = document.getElementById('menuToggle');
  const slideNav = document.getElementById('slideNav');
  const navOverlay = document.getElementById('navOverlay');
  const navClose = document.getElementById('navClose');

  if (!menuToggle || !slideNav || !navOverlay || !navClose) return;

  function openNav() {
    slideNav.classList.add('active');
    navOverlay.classList.add('active');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    slideNav.classList.remove('active');
    navOverlay.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', function() {
    if (slideNav.classList.contains('active')) closeNav(); else openNav();
  });
  navClose.addEventListener('click', closeNav);
  navOverlay.addEventListener('click', closeNav);

  document.querySelectorAll('.slide-nav-links a').forEach(function(link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && slideNav.classList.contains('active')) closeNav();
  });
})();

// ===== SETUP PAGE: APP TABS =====
(function() {
  const appButtons = document.querySelectorAll('.app-selector-btn');
  const appPanels = document.querySelectorAll('.app-panel');

  if (appButtons.length === 0) return;

  appButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const targetApp = this.dataset.app;

      appButtons.forEach(b => b.classList.remove('active'));
      appPanels.forEach(p => p.classList.remove('active'));

      this.classList.add('active');
      const targetPanel = document.getElementById('panel-' + targetApp);
      if (targetPanel) targetPanel.classList.add('active');

      const panelSection = document.querySelector('.app-tabs-section');
      if (panelSection) {
        const yOffset = -80;
        const y = panelSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
})();

// ===== FAQ PAGE: ACCORDION =====
(function() {
  const faqCards = document.querySelectorAll('.faq-card');
  if (faqCards.length === 0) return;

  faqCards.forEach(function(card) {
    const question = card.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        card.classList.toggle('open');
      });
    }
  });

  const expandAll = document.getElementById('expandAll');
  const collapseAll = document.getElementById('collapseAll');

  if (expandAll) {
    expandAll.addEventListener('click', function() {
      faqCards.forEach(card => card.classList.add('open'));
    });
  }
  if (collapseAll) {
    collapseAll.addEventListener('click', function() {
      faqCards.forEach(card => card.classList.remove('open'));
    });
  }
})();
