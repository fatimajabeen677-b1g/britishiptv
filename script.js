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

// ===== AUTO MESSAGE ON WHATSAPP BUTTONS + PRE-FILL =====
(function() {
  // ----- CONFIGURATION (edit these) -----
  const whatsappNumber = '923020548889';

  // ----- PAGE CONTEXT DETECTION -----
  const path = window.location.pathname.toLowerCase();
  let pageContext = 'British IPTV';
  if (path.includes('devices')) pageContext = 'Supported IPTV Devices';
  else if (path.includes('setup')) pageContext = 'IPTV Setup Guide';
  else if (path.includes('faq')) pageContext = 'IPTV UK FAQs';
  else if (path.includes('contact')) pageContext = 'IPTV UK Support';
  else if (path.includes('privacy')) pageContext = 'Privacy Policy';
  else if (path.includes('terms')) pageContext = 'Terms of Use';

  // ----- AUTO MESSAGE POPUP TEXT -----
  const autoMessage =
    '👋 Thanks for your interest in British IPTV!\n\n' +
    'We noticed you clicked on the "' + pageContext + '" page.\n\n' +
    '💬 Would you like to:\n' +
    '• Get a 24-hour free IPTV UK trial?\n' +
    '• Ask a question about our UK IPTV service?\n' +
    '• See our subscription plans?\n\n' +
    'Click OK to chat with us on WhatsApp now — we usually respond within minutes.';

  // ----- WHATSAPP PRE-FILLED GREETING -----
  const autoGreeting =
    'Hi British IPTV! 👋\n\n' +
    'I\'m on the "' + pageContext + '" page and I\'d like to know more about your UK IPTV subscription.\n\n' +
    'Could you help me with:\n' +
    '• Free 24-hour trial\n' +
    '• Pricing and plans\n' +
    '• Device compatibility\n\n' +
    'Thanks!';

  // ----- HANDLE ALL WHATSAPP LINKS -----
  const waLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');

  waLinks.forEach(function(link) {
    // Skip if this link already has "text=" param (prevent double-adding)
    if (link.href.indexOf('text=') !== -1) return;

    // Store the original href
    const originalHref = link.getAttribute('href');

    link.addEventListener('click', function(e) {
      e.preventDefault();

      // Show the auto message popup
      const userConfirmed = confirm(autoMessage);

      if (userConfirmed) {
        // Build the WhatsApp URL with pre-filled message
        const separator = originalHref.indexOf('?') !== -1 ? '&' : '?';
        const finalUrl = originalHref + separator + 'text=' + encodeURIComponent(autoGreeting);
        window.open(finalUrl, '_blank');
      }
    });
  });
})();
