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

// ===== SMART WHATSAPP AUTO-MESSAGE (CUSTOMIZED PER BUTTON) =====
(function() {
  // ----- CONFIGURATION -----
  const whatsappNumber = '923020548889';

  // ----- PAGE CONTEXT -----
  const path = window.location.pathname.toLowerCase();
  let pageContext = 'British IPTV';
  if (path.includes('devices')) pageContext = 'Supported IPTV Devices';
  else if (path.includes('setup')) pageContext = 'IPTV Setup Guide';
  else if (path.includes('faq')) pageContext = 'IPTV UK FAQs';
  else if (path.includes('contact') || path.includes('support')) pageContext = 'IPTV UK Support';
  else if (path.includes('privacy')) pageContext = 'Privacy Policy';
  else if (path.includes('terms')) pageContext = 'Terms of Use';

  // ----- MESSAGE TEMPLATES BY INTENT -----
  const MESSAGES = {

    // --- TRIAL ---
    trial:
      "Hi British IPTV! 👋\n\n" +
      "I'd like to claim my *FREE 24-HOUR IPTV TRIAL* for the UK. 🎁\n\n" +
      "Please send me:\n" +
      "• Free trial login details\n" +
      "• Setup instructions\n" +
      "• Channel list preview\n\n" +
      "Thank you!",

    // --- 3 MONTH PLAN ---
    plan3:
      "Hi British IPTV! 👋\n\n" +
      "I'm interested in the *3-MONTH PLAN (£29.99)*. 💳\n\n" +
      "Please confirm:\n" +
      "• What's included in this plan\n" +
      "• Payment methods available\n" +
      "• How fast can I get my login\n\n" +
      "Thanks!",

    // --- 6 MONTH PLAN ---
    plan6:
      "Hi British IPTV! 👋\n\n" +
      "I'm interested in the *6-MONTH PLAN (£49.99)* — the most popular one. ⭐\n\n" +
      "Please confirm:\n" +
      "• What's included in this plan\n" +
      "• Payment methods available\n" +
      "• Any discount for this plan\n\n" +
      "Thanks!",

    // --- 12 MONTH PLAN ---
    plan12:
      "Hi British IPTV! 👋\n\n" +
      "I'm interested in the *12-MONTH PLAN (£59.99)* — best value per month. 💰\n\n" +
      "Please confirm:\n" +
      "• What's included in this plan\n" +
      "• Payment methods available\n" +
      "• Any extra perks for yearly customers\n\n" +
      "Thanks!",

    // --- BUY / SUBSCRIBE (generic) ---
    buy:
      "Hi British IPTV! 👋\n\n" +
      "I'm ready to *BUY an IPTV UK subscription*. 🛒\n\n" +
      "Please tell me:\n" +
      "• Current plans & pricing\n" +
      "• Payment methods\n" +
      "• How I'll receive my login details\n\n" +
      "Thanks!",

    // --- DEVICE COMPATIBILITY ---
    devices:
      "Hi British IPTV! 👋\n\n" +
      "I'd like to confirm if my *device is compatible* with your UK IPTV service. 📱\n\n" +
      "My device: ________________\n\n" +
      "Please confirm compatibility and setup steps.\n\n" +
      "Thanks!",

    // --- SETUP HELP ---
    setup:
      "Hi British IPTV! 👋\n\n" +
      "I need help with the *IPTV setup* on my device. ⚙️\n\n" +
      "My device: ________________\n" +
      "My app: ________________\n\n" +
      "Can you guide me step by step?\n\n" +
      "Thanks!",

    // --- SUPPORT ---
    support:
      "Hi British IPTV! 👋\n\n" +
      "I need *IPTV UK support* for a current customer. 🇬🇧\n\n" +
      "My issue: ________________\n\n" +
      "Please help me resolve this.\n\n" +
      "Thanks!",

    // --- GENERAL / PAGE CONTEXT FALLBACK ---
    general: function() {
      return "Hi British IPTV! 👋\n\n" +
        "I'm on the *" + pageContext + "* page and I'd like to know more about your UK IPTV subscription.\n\n" +
        "Could you help me with:\n" +
        "• Free 24-hour trial\n" +
        "• Pricing and plans\n" +
        "• Device compatibility\n\n" +
        "Thanks!";
    }
  };

  // ----- DETECT INTENT FROM BUTTON -----
  function detectIntent(link) {
    const text = (link.textContent || '').toLowerCase().trim();
    const dataIntent = (link.dataset.intent || '').toLowerCase();
    const href = (link.getAttribute('href') || '').toLowerCase();

    // 1) Explicit data-intent wins
    if (dataIntent && MESSAGES[dataIntent]) return dataIntent;

    // 2) Keyword matching (order matters!)
    if (text.includes('3 month') || text.includes('3-month') || text.includes('3months')) return 'plan3';
    if (text.includes('6 month') || text.includes('6-month') || text.includes('6months')) return 'plan6';
    if (text.includes('12 month') || text.includes('12-month') || text.includes('12months') || text.includes('year')) return 'plan12';

    if (text.includes('free trial') || text.includes('free iptv') || text.includes('try')) return 'trial';
    if (text.includes('buy') || text.includes('subscribe') || text.includes('subscription')) return 'buy';
    if (text.includes('device')) return 'devices';
    if (text.includes('setup') || text.includes('install') || text.includes('guide')) return 'setup';
    if (text.includes('support') || text.includes('help') || text.includes('contact')) return 'support';

    // 3) Fallback → page-based general
    return 'general';
  }

  // ----- HANDLE ALL WHATSAPP LINKS -----
  document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(function(link) {
    // Skip if this link already has a text= param
    if (link.href.indexOf('text=') !== -1) return;

    link.addEventListener('click', function(e) {
      e.preventDefault();

      const intent = detectIntent(link);
      const template = MESSAGES[intent];
      const message = (typeof template === 'function') ? template() : template;
      const encoded = encodeURIComponent(message);

      const baseHref = 'https://wa.me/' + whatsappNumber;
      const separator = baseHref.indexOf('?') !== -1 ? '&' : '?';

      window.open(baseHref + separator + 'text=' + encoded, '_blank');
    });
  });

  // ----- OPTIONAL: expose helper for manual use -----
  window.britishIPTVWhatsApp = function(intent) {
    const template = MESSAGES[intent] || MESSAGES.general;
    const message = (typeof template === 'function') ? template() : template;
    const encoded = encodeURIComponent(message);
    window.open('https://wa.me/' + whatsappNumber + '?text=' + encoded, '_blank');
  };
})();

