/**
 * JAAS BD - Interactive Scripts
 * Pure Vanilla JavaScript - No dependencies needed
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. PROMOTIONAL COUNTDOWN TIMER
     ========================================================================== */
  const countdownEl = document.getElementById('promo-countdown');
  if (countdownEl) {
    // Set target date 14 days into the future
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);
    targetDate.setHours(23, 59, 59, 0);

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        countdownEl.innerHTML = '<span>Offer Extended!</span>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById('count-days').textContent = String(days).padStart(2, '0');
      document.getElementById('count-hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('count-mins').textContent = String(minutes).padStart(2, '0');
      document.getElementById('count-secs').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ==========================================================================
     2. BILLING CYCLE SWITCHER (MONTHLY / ANNUALLY)
     ========================================================================== */
  const billingToggle = document.getElementById('billing-toggle');
  const labelMonthly = document.getElementById('label-monthly');
  const labelAnnually = document.getElementById('label-annually');

  const plans = [
    { id: 'plan-starter', monthly: '134', annual: '1,499' },
    { id: 'plan-bdix', monthly: '399', annual: '3,999' },
    { id: 'plan-turbo', monthly: '699', annual: '6,999' },
    { id: 'plan-corporate', monthly: '1,299', annual: '12,999' }
  ];

  let isAnnual = false;

  function setBilling(annual) {
    isAnnual = annual;
    if (billingToggle) {
      billingToggle.classList.toggle('active', isAnnual);
    }
    if (labelMonthly && labelAnnually) {
      labelMonthly.classList.toggle('active', !isAnnual);
      labelAnnually.classList.toggle('active', isAnnual);
    }

    plans.forEach(p => {
      const card = document.getElementById(p.id);
      if (card) {
        const amountEl = card.querySelector('.plan-amount');
        const periodEl = card.querySelector('.plan-period');
        if (amountEl && periodEl) {
          amountEl.textContent = isAnnual ? p.annual : p.monthly;
          periodEl.textContent = isAnnual ? '/yr' : '/mo';
        }
      }
    });
  }

  if (billingToggle) {
    billingToggle.addEventListener('click', () => setBilling(!isAnnual));
  }
  if (labelMonthly) {
    labelMonthly.addEventListener('click', () => setBilling(false));
  }
  if (labelAnnually) {
    labelAnnually.addEventListener('click', () => setBilling(true));
  }

  /* ==========================================================================
     3. SERVICE CATEGORY FILTER TABS
     ========================================================================== */
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     4. FAQ ACCORDION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(f => f.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     5. STATS ANIMATED COUNTERS
     ========================================================================== */
  const counterNumbers = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function animateCounters() {
    counterNumbers.forEach(c => {
      const target = parseInt(c.getAttribute('data-target'), 10);
      let count = 0;
      const step = Math.ceil(target / 60);

      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          c.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          c.textContent = count.toLocaleString();
        }
      }, 25);
    });
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  /* ==========================================================================
     6. SERVER STATICS PROGRESS BARS ANIMATION
     ========================================================================== */
  const skillFills = document.querySelectorAll('.skill-fill');
  let skillsAnimated = false;

  function animateSkillBars() {
    skillFills.forEach(fill => {
      const percent = fill.getAttribute('data-percent');
      fill.style.width = percent + '%';
    });
  }

  const serverStatsSection = document.querySelector('.server-stats-section');
  if (serverStatsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
          skillsAnimated = true;
          animateSkillBars();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(serverStatsSection);
  }

  /* ==========================================================================
     7. TESTIMONIALS CAROUSEL
     ========================================================================== */
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const dotsContainer = document.getElementById('carousel-dots');

  if (track && prevBtn && nextBtn && dotsContainer) {
    const cards = track.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    let currentIndex = 0;

    function getVisibleCards() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function createDots() {
      dotsContainer.innerHTML = '';
      const visible = getVisibleCards();
      const dotCount = Math.max(1, totalCards - visible + 1);

      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateCarousel() {
      const visible = getVisibleCards();
      const maxIndex = Math.max(0, totalCards - visible);
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      const cardWidth = cards[0].offsetWidth + 25; // 25px gap
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

      // Update dots
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    prevBtn.addEventListener('click', () => {
      currentIndex--;
      if (currentIndex < 0) {
        const visible = getVisibleCards();
        currentIndex = Math.max(0, totalCards - visible);
      }
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      const visible = getVisibleCards();
      const maxIndex = Math.max(0, totalCards - visible);
      currentIndex++;
      if (currentIndex > maxIndex) currentIndex = 0;
      updateCarousel();
    });

    // Auto slide every 6 seconds
    let autoSlide = setInterval(() => nextBtn.click(), 6000);
    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => nextBtn.click(), 6000);
    });

    window.addEventListener('resize', () => {
      createDots();
      updateCarousel();
    });

    createDots();
    updateCarousel();
  }

  /* ==========================================================================
     8. DOMAIN SEARCH & SIMULATION MODAL
     ========================================================================== */
  const domainForm = document.getElementById('hero-domain-form');
  const domainInput = document.getElementById('hero-domain-input');
  const domainModal = document.getElementById('domain-result-modal');
  const modalClose = document.getElementById('domain-modal-close');
  const resultDomainName = document.getElementById('result-domain-name');
  const resultDomainPrice = document.getElementById('result-domain-price');
  const btnAddToCart = document.getElementById('btn-add-to-cart');

  function openDomainModal(query) {
    let clean = query.trim().toLowerCase();
    if (!clean) clean = 'example';
    if (!clean.includes('.')) clean += '.com';

    if (resultDomainName) resultDomainName.textContent = clean;
    if (resultDomainPrice) {
      if (clean.endsWith('.com.bd')) resultDomainPrice.textContent = '৳3,500/2yrs';
      else if (clean.endsWith('.xyz')) resultDomainPrice.textContent = '৳350/yr';
      else if (clean.endsWith('.net')) resultDomainPrice.textContent = '৳1,550/yr';
      else if (clean.endsWith('.org')) resultDomainPrice.textContent = '৳1,650/yr';
      else resultDomainPrice.textContent = '৳1,450/yr';
    }

    if (domainModal) domainModal.classList.add('active');
  }

  if (domainForm && domainInput) {
    domainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = domainInput.value.trim();
      if (val) {
        openDomainModal(val);
      } else {
        domainInput.focus();
      }
    });
  }

  // Extension pills click to append extension
  const extPills = document.querySelectorAll('.ext-pill');
  extPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const ext = pill.getAttribute('data-ext') || '.com';
      let current = domainInput ? domainInput.value.trim() : '';
      if (!current) current = 'mycompany';
      current = current.split('.')[0] + ext;
      if (domainInput) domainInput.value = current;
      openDomainModal(current);
    });
  });

  if (modalClose && domainModal) {
    modalClose.addEventListener('click', () => domainModal.classList.remove('active'));
    domainModal.addEventListener('click', (e) => {
      if (e.target === domainModal) domainModal.classList.remove('active');
    });
  }

  if (btnAddToCart) {
    btnAddToCart.addEventListener('click', () => {
      btnAddToCart.innerHTML = '<span>✓ Added to Cart!</span>';
      btnAddToCart.style.background = '#10B981';
      setTimeout(() => {
        alert('Item added to cart! Proceeding to JAAS BD Client Checkout...');
        domainModal.classList.remove('active');
        btnAddToCart.innerHTML = '<span>Add to Cart & Checkout</span>';
        btnAddToCart.style.background = '';
      }, 1000);
    });
  }

  /* ==========================================================================
     9. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navDrawer = document.getElementById('mobile-nav-drawer');
  const drawerOverlay = document.getElementById('mobile-drawer-overlay');
  const drawerClose = document.getElementById('drawer-close-btn');

  function openDrawer() {
    if (navDrawer && drawerOverlay) {
      navDrawer.classList.add('open');
      drawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (navDrawer && drawerOverlay) {
      navDrawer.classList.remove('open');
      drawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Mobile submenu accordion
  const drawerDropdownToggles = document.querySelectorAll('.drawer-has-sub');
  drawerDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const submenu = toggle.nextElementSibling;
      if (submenu && submenu.classList.contains('drawer-submenu')) {
        submenu.classList.toggle('open');
      }
    });
  });

  /* ==========================================================================
     10. SCROLL TO TOP BUTTON
     ========================================================================== */
  const scrollTopBtn = document.getElementById('btn-scroll-top');
  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     11. SEARCH OVERLAY MODAL
     ========================================================================== */
  const searchTrigger = document.getElementById('nav-search-trigger');
  const searchOverlay = document.getElementById('search-overlay-modal');
  const searchClose = document.getElementById('search-overlay-close');

  if (searchTrigger && searchOverlay) {
    searchTrigger.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      const input = searchOverlay.querySelector('input');
      if (input) input.focus();
    });
  }

  if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', () => searchOverlay.classList.remove('active'));
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) searchOverlay.classList.remove('active');
    });
  }

  /* ==========================================================================
     12. QUICK ORDER MODAL
     ========================================================================== */
  const planOrderButtons = document.querySelectorAll('.btn-plan-order');
  const orderModal = document.getElementById('order-summary-modal');
  const orderModalClose = document.getElementById('order-modal-close');
  const modalPlanName = document.getElementById('modal-plan-name');
  const modalPlanPrice = document.getElementById('modal-plan-price');

  planOrderButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.pricing-card');
      const title = card ? card.querySelector('.plan-name').textContent : 'Web Hosting';
      const amount = card ? card.querySelector('.plan-amount').textContent : '134';
      const period = card ? card.querySelector('.plan-period').textContent : '/mo';

      if (modalPlanName) modalPlanName.textContent = title;
      if (modalPlanPrice) modalPlanPrice.textContent = `৳${amount}${period}`;

      if (orderModal) orderModal.classList.add('active');
    });
  });

  if (orderModalClose && orderModal) {
    orderModalClose.addEventListener('click', () => orderModal.classList.remove('active'));
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) orderModal.classList.remove('active');
    });
  }

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#' && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          closeDrawer();
        }
      }
    });
  });

});
