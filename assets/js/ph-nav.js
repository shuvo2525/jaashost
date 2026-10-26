/**
 * Putulhost / JAAS BD Navigation & Dropdown Engine (100% Putulhost.com Compatible)
 */
document.addEventListener('DOMContentLoaded', function () {
  // Desktop Dropdowns
  const dropdownItems = document.querySelectorAll('.ph-nav-menu > li.has-ph-dropdown');

  dropdownItems.forEach(li => {
    const trigger = li.querySelector(':scope > a');
    if (!trigger) return;

    // Click / touch handler
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const wasAlreadyOpenByClick = li.getAttribute('data-click-open') === 'true';
      // Close all other dropdowns
      dropdownItems.forEach(item => {
        item.classList.remove('open');
        item.removeAttribute('data-click-open');
      });

      if (!wasAlreadyOpenByClick) {
        li.classList.add('open');
        li.setAttribute('data-click-open', 'true');
      }
    });

    // Hover handler for desktop
    li.addEventListener('mouseenter', function () {
      dropdownItems.forEach(item => {
        if (item !== li) {
          item.classList.remove('open');
          item.removeAttribute('data-click-open');
        }
      });
      li.classList.add('open');
    });

    li.addEventListener('mouseleave', function () {
      li.classList.remove('open');
      li.removeAttribute('data-click-open');
    });
  });

  // Support Mega Menu toggle for touch / click
  const supportDropdown = document.querySelector('.ph-support-dropdown');
  if (supportDropdown) {
    const supportBtn = supportDropdown.querySelector('.ph-btn-support');
    if (supportBtn) {
      supportBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        dropdownItems.forEach(item => {
          item.classList.remove('open');
          item.removeAttribute('data-click-open');
        });
        supportDropdown.classList.toggle('open');
      });
    }

    supportDropdown.addEventListener('mouseenter', function () {
      dropdownItems.forEach(item => {
        item.classList.remove('open');
        item.removeAttribute('data-click-open');
      });
      supportDropdown.classList.add('open');
    });

    supportDropdown.addEventListener('mouseleave', function () {
      supportDropdown.classList.remove('open');
    });
  }

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-ph-dropdown')) {
      dropdownItems.forEach(li => {
        li.classList.remove('open');
        li.removeAttribute('data-click-open');
      });
    }
    if (supportDropdown && !e.target.closest('.ph-support-dropdown')) {
      supportDropdown.classList.remove('open');
    }
  });

  // Close on Esc key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      dropdownItems.forEach(li => {
        li.classList.remove('open');
        li.removeAttribute('data-click-open');
      });
      if (supportDropdown) supportDropdown.classList.remove('open');
      closeMobileMenu();
    }
  });

  // Mobile Drawer Menu
  const toggle = document.getElementById('phMenuToggle');
  const close = document.getElementById('phMenuClose');
  const sidebar = document.getElementById('phMobileSidebar');
  const overlay = document.getElementById('phMobileOverlay');

  function openMobileMenu(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (sidebar) sidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggle) toggle.addEventListener('click', openMobileMenu);
  if (close) close.addEventListener('click', closeMobileMenu);
  if (overlay) overlay.addEventListener('click', closeMobileMenu);

  // Mobile Accordion Menus
  const mobileSubs = document.querySelectorAll('.has-ms-sub > a');
  mobileSubs.forEach(sub => {
    sub.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = this.parentElement;
      const isOpen = parent.classList.contains('active');
      document.querySelectorAll('.has-ms-sub').forEach(el => el.classList.remove('active'));
      if (!isOpen) parent.classList.add('active');
    });
  });

  // Apply Live Config on Page Load
  try {
    const cachedCfg = localStorage.getItem('jaas_site_config');
    if (cachedCfg) {
      applyJaasLiveConfig(JSON.parse(cachedCfg));
    }
  } catch (e) {}

  fetch('site-config.json')
    .then(res => res.ok ? res.json() : null)
    .then(remoteCfg => {
      if (remoteCfg) {
        applyJaasLiveConfig(remoteCfg);
        try { localStorage.setItem('jaas_site_config', JSON.stringify(remoteCfg)); } catch (e) {}
      }
    })
    .catch(() => {});
});

// ========================================================
// JAAS BD Dynamic Information Sync Engine (Zero Design Alteration)
// Dynamically applies live text/content changes made via admin.html
// across all 30+ pages, headers, hero sections, and footers.
// ========================================================
function applyJaasLiveConfig(cfg) {
  if (!cfg) return;

  // 1. Current Page Info & Hero Section
  try {
    const rawPath = window.location.pathname.split('/').pop() || 'index.html';
    const cleanKey = rawPath.replace(/\.html.*$/, '').replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase() || 'index';

    if (cfg.pages && cfg.pages[cleanKey]) {
      const page = cfg.pages[cleanKey];

      // Update Browser Title
      if (page.metaTitle && page.metaTitle.trim()) {
        document.title = page.metaTitle;
      }

      // Update Hero Title
      if (page.heroTitle && page.heroTitle.trim()) {
        const titleEl = document.querySelector('.hero-title, .hosting-hero-section h1, .email-hero-section h1, .hero-banner h1, .banner-section h1, .vps-hero-title');
        if (titleEl) {
          titleEl.textContent = page.heroTitle;
        }
      }

      // Update Hero Subtitle / Description
      if (page.heroSubtitle && page.heroSubtitle.trim()) {
        const subEl = document.querySelector('.hero-sub, .hero-desc, .hero-banner p:not(.hero-badge-tag):not(.coupon-box), .hosting-hero-section p.hero-sub, .email-hero-section p.hero-sub');
        if (subEl) {
          subEl.textContent = page.heroSubtitle;
        }
      }

      // Update Hero Badge / Tag
      if (page.heroBadge && page.heroBadge.trim()) {
        const badgeEl = document.querySelector('.hero-badge-tag, .hero-badge, .server-hero-badge');
        if (badgeEl) {
          const icon = badgeEl.querySelector('i');
          badgeEl.innerHTML = (icon ? icon.outerHTML + ' ' : '<i class="fa fa-shield-alt"></i> ') + page.heroBadge;
        }
      }

      // Update Hero Coupon / Promo box
      if (page.heroPromo && page.heroPromo.trim()) {
        const couponEl = document.querySelector('.coupon-box, .hero-coupon');
        if (couponEl) {
          const icon = couponEl.querySelector('i');
          couponEl.innerHTML = (icon ? icon.outerHTML + ' ' : '<i class="fa fa-ticket-alt"></i> ') + page.heroPromo;
        }
      }
    }
  } catch (err) {}

  // 1b. Homepage Specific Elements (Notice Bar, Hero, Benefits Grid, FAQs)
  try {
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/') || window.location.pathname === '';

    // Notice Strip
    if (cfg.notice) {
      const noticeBar = document.getElementById('ph-notice-bar');
      if (noticeBar) {
        if (cfg.notice.active === false) {
          noticeBar.style.display = 'none';
        } else {
          noticeBar.style.display = '';
          const dtLink = noticeBar.querySelector('.ph-notice-desktop');
          if (dtLink) {
            if (cfg.notice.btnLink) dtLink.href = cfg.notice.btnLink;
            const spanText = dtLink.querySelector('span:first-of-type');
            if (spanText && cfg.notice.text) spanText.textContent = cfg.notice.text;
            const spanBtn = dtLink.querySelector('span:last-of-type');
            if (spanBtn && cfg.notice.btnText) spanBtn.textContent = cfg.notice.btnText;
          }
          const mbLink = noticeBar.querySelector('.ph-notice-mobile');
          if (mbLink) {
            if (cfg.notice.btnLink) mbLink.href = cfg.notice.btnLink;
            const mbText = mbLink.querySelector('span:first-of-type');
            if (mbText && cfg.notice.text) mbText.textContent = cfg.notice.text;
            const mbBtn = mbLink.querySelector('span:last-of-type');
            if (mbBtn && cfg.notice.btnText) mbBtn.textContent = cfg.notice.btnText;
          }
        }
      }
    }

    if (isHomePage && cfg.hero) {
      if (cfg.hero.title) {
        const h1 = document.querySelector('.ph-hero h1, .ph-hero-title');
        if (h1) {
          const badge = h1.querySelector('.hero-badge, span');
          if (badge) {
            h1.innerHTML = badge.outerHTML + ' ' + cfg.hero.title;
          } else {
            h1.textContent = cfg.hero.title;
          }
        }
      }
      if (cfg.hero.subtitle) {
        const sub = document.querySelector('.ph-hero p, .ph-hero-sub');
        if (sub) sub.textContent = cfg.hero.subtitle;
      }
      if (cfg.hero.domainSearchPlaceholder) {
        const dInp = document.querySelector('.ph-hero input[type="text"], #domainSearchInput, .domain-search-input');
        if (dInp) dInp.placeholder = cfg.hero.domainSearchPlaceholder;
      }
    }

    // Homepage Benefits
    if (isHomePage && cfg.homepageBenefits && Array.isArray(cfg.homepageBenefits) && cfg.homepageBenefits.length > 0) {
      const grid = document.querySelector('.ph-benefits-grid');
      if (grid) {
        grid.innerHTML = '';
        cfg.homepageBenefits.forEach(b => {
          const iconHtml = (b.icon && (b.icon.startsWith('http') || b.icon.startsWith('assets/')))
            ? `<div class="benefit-icon"><img src="${b.icon}" alt="" loading="lazy"></div>`
            : `<div class="benefit-icon" style="display:flex;align-items:center;justify-content:center;font-size:24px;color:#7c3aed;"><i class="fa ${b.icon || 'fa-star'}"></i></div>`;
          grid.innerHTML += `
            <div class="ph-benefit-card">
              ${iconHtml}
              <h4>${b.title || ''}</h4>
              <p>${b.desc || ''}</p>
            </div>
          `;
        });
      }
    }

    // Homepage FAQs
    if (isHomePage && cfg.homepageFaqs && Array.isArray(cfg.homepageFaqs) && cfg.homepageFaqs.length > 0) {
      const faqContainer = document.getElementById('ph-homepage-faqs');
      if (faqContainer) {
        faqContainer.innerHTML = '';
        cfg.homepageFaqs.forEach((faq) => {
          faqContainer.innerHTML += `
            <div class="ph-faq-item" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; transition:all 0.2s;">
              <button type="button" onclick="toggleJaasFaq(this)" style="width:100%; text-align:left; background:none; border:none; padding:18px 22px; font-size:15px; font-weight:700; color:#0f172a; display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
                <span>${faq.question || ''}</span>
                <i class="fa fa-chevron-down" style="font-size:12px; color:#0077b6; transition:transform 0.2s;"></i>
              </button>
              <div class="ph-faq-ans" style="display:none; padding:0 22px 18px; font-size:14px; color:#475569; line-height:1.6; border-top:1px dashed #e2e8f0; padding-top:14px;">
                ${faq.answer || ''}
              </div>
            </div>
          `;
        });
      }
    }
  } catch(e) {}

  // 2. Global Branding & Logos
  try {
    if (cfg.site) {
      if (cfg.site.favicon) {
        let fav = document.querySelector('link[rel="icon"]');
        if (fav) fav.href = cfg.site.favicon;
      }
      if (cfg.site.headerLogo) {
        document.querySelectorAll('.ph-logo, .ph-ms-logo, .header-logo').forEach(img => {
          img.src = cfg.site.headerLogo;
        });
      }
      if (cfg.site.footerLogo) {
        document.querySelectorAll('.ph-f-logo').forEach(img => {
          img.src = cfg.site.footerLogo;
        });
      }
    }
  } catch (err) {}

  // 3. Contact & Phone Numbers across Header & Mega Menus
  try {
    const contact = cfg.contact || {};
    const footer = cfg.footer || {};
    const phone = contact.phone || footer.phone;
    const email = contact.email || footer.email;
    const whatsapp = contact.whatsapp || '8801818430308';

    if (phone) {
      document.querySelectorAll('a[href^="tel:"]').forEach(a => {
        a.href = 'tel:' + phone.replace(/[^0-9+]/g, '');
        if (a.classList.contains('psm-phone-box')) {
          a.innerHTML = '<i class="fa fa-phone"></i> ' + phone;
        }
      });
    }

    if (whatsapp) {
      const cleanWa = whatsapp.replace(/[^0-9]/g, '');
      document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
        a.href = 'https://wa.me/' + cleanWa;
      });
    }

    if (email) {
      document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
        a.href = 'mailto:' + email;
        if (a.textContent.includes('@')) {
          a.textContent = email;
        }
      });
    }
  } catch (err) {}

  // 4. Footer Information (Unified & Legacy Footers - 100% Design Preserved)
  try {
    const f = cfg.footer || {};
    const c = cfg.contact || {};
    const s = cfg.social || {};
    const phText = f.phone || c.phone;
    const emText = f.email || c.email;
    const adText = f.address || c.fullAddress || c.address;
    const hrText = f.hours || '(10AM-8PM)';
    const companyName = (c && c.company) ? c.company : 'JAAS BD';

    // About description in footer
    if (f.aboutText && f.aboutText.trim()) {
      document.querySelectorAll('.ph-f-desc').forEach(el => {
        el.textContent = f.aboutText;
      });
    }

    // Copyright Text in footer
    if (f.copyrightText && f.copyrightText.trim()) {
      document.querySelectorAll('.ph-copyright-text').forEach(el => {
        el.innerHTML = f.copyrightText;
      });
    }

    // Address in Unified Footer (.ph-fb-col Our Address)
    if (adText) {
      document.querySelectorAll('.ph-fb-col').forEach(col => {
        const title = col.querySelector('.ph-fb-title');
        if (title && /address/i.test(title.textContent)) {
          const p = col.querySelector('.ph-fb-text');
          if (p) {
            p.innerHTML = `<strong>${companyName}</strong><br>${adText}`;
          }
        }
      });
    }

    // Contact items in Unified Footer (.ph-footer-contact)
    if (phText) {
      document.querySelectorAll('.ph-footer-contact').forEach(fc => {
        const spans = fc.querySelectorAll('p:first-child span');
        if (spans.length >= 1) spans[0].textContent = phText;
        if (spans.length >= 2 && hrText) spans[1].textContent = hrText;
      });
    }
    if (emText) {
      document.querySelectorAll('.ph-footer-contact a[href^="mailto:"]').forEach(a => {
        a.href = 'mailto:' + emText;
        a.textContent = emText;
      });
    }

    // Payment Banner Image in footer
    if (f.paymentBannerImg) {
      document.querySelectorAll('.ph-payment-options img').forEach(img => {
        img.src = f.paymentBannerImg;
      });
    }
    if (f.showPaymentGateways === false) {
      document.querySelectorAll('.ph-payment-options').forEach(el => {
        el.style.display = 'none';
      });
    } else if (f.showPaymentGateways === true) {
      document.querySelectorAll('.ph-payment-options').forEach(el => {
        el.style.display = '';
      });
    }

    // Contact items in Legacy footer (.ph-f-contact-item)
    const contactItems = document.querySelectorAll('.ph-f-contact-item');
    if (contactItems.length >= 4) {
      if (phText) {
        const span = contactItems[0].querySelector('span');
        if (span) span.textContent = phText;
      }
      if (emText) {
        const span = contactItems[1].querySelector('span');
        if (span) span.textContent = emText;
      }
      if (adText) {
        const span = contactItems[2].querySelector('span');
        if (span) span.textContent = adText;
      }
      if (hrText) {
        const span = contactItems[3].querySelector('span');
        if (span) span.textContent = hrText;
      }
    }

    // Social Media Links in footer (both .ph-social-links-compact and .ph-f-social)
    const fbLink = s.facebook || (c.social && c.social.facebook);
    const twLink = s.twitter || s.x || (c.social && c.social.twitter);
    const ytLink = s.youtube || (c.social && c.social.youtube);
    const waLink = s.whatsapp || (c.social && c.social.whatsapp);
    const igLink = s.instagram || (c.social && c.social.instagram);

    if (fbLink) {
      document.querySelectorAll('.ph-social-links-compact a[title*="Facebook"], .ph-social-links-compact a[href*="facebook"], .ph-f-social a[href*="facebook"]').forEach(a => a.href = fbLink);
    }
    if (twLink) {
      document.querySelectorAll('.ph-social-links-compact a[title*="Twitter"], .ph-social-links-compact a[title*="X"], .ph-social-links-compact a[href*="twitter"], .ph-social-links-compact a[href*="x.com"], .ph-f-social a[href*="twitter"], .ph-f-social a[href*="x.com"]').forEach(a => a.href = twLink);
    }
    if (ytLink) {
      document.querySelectorAll('.ph-social-links-compact a[title*="YouTube"], .ph-social-links-compact a[href*="youtube"], .ph-f-social a[href*="youtube"]').forEach(a => a.href = ytLink);
    }
    if (igLink) {
      document.querySelectorAll('.ph-social-links-compact a[title*="Instagram"], .ph-social-links-compact a[href*="instagram"], .ph-f-social a[href*="instagram"]').forEach(a => a.href = igLink);
    }
    if (waLink) {
      const cleanWa = waLink.replace(/[^0-9]/g, '');
      document.querySelectorAll('.ph-social-links-compact a[title*="WhatsApp"], .ph-social-links-compact a[href*="wa.me"], .ph-f-social a[href*="wa.me"]').forEach(a => a.href = 'https://wa.me/' + cleanWa);
    }
  } catch (err) {}

  // 5. Connect Account button to Client Area
  try {
    const clientRaw = localStorage.getItem('jaas_client_user');
    let client = null;
    if (clientRaw) {
      try { client = JSON.parse(clientRaw); } catch (e) {}
    }
    const isLoggedIn = client && client.loggedIn === true;
    const accButtons = document.querySelectorAll('.ph-btn-account, .ph-mobile-actions a[href*="login"], .ph-ms-footer a[href*="login"]');
    accButtons.forEach(btn => {
      btn.href = isLoggedIn ? 'clientarea.html' : 'login.html?redirect=clientarea.html';
      if (btn.classList.contains('ph-btn-account')) {
        if (isLoggedIn && client.name) {
          const firstName = client.name.split(' ')[0];
          btn.innerHTML = `<i class="fa fa-user-circle"></i> ${firstName}`;
          btn.title = `Client Portal: ${client.name}`;
        } else {
          btn.innerHTML = `<i class="fa fa-user-circle"></i> Account`;
          btn.title = `Client Area Login`;
        }
      } else if (btn.classList.contains('ph-ms-btn-primary')) {
        btn.textContent = (isLoggedIn && client.name) ? `Client Area (${client.name.split(' ')[0]})` : 'Client Area';
      }
    });
  } catch(e) {}

  // 6. Dynamic Package Sync on Package Pages
  try {
    if (cfg.packages && Array.isArray(cfg.packages) && cfg.packages.length > 0) {
      cfg.packages.forEach(pkg => {
        if (!pkg || !pkg.id) return;
        const buyLinks = document.querySelectorAll(`a[href*="plan=${pkg.id}"], a[href*="pid=${pkg.id}"]`);
        buyLinks.forEach(link => {
          const card = link.closest('.bh-price-card, .ph-pricing-card, .vps-card, .price-card, .pricing-card');
          if (!card) return;

          const nameEl = card.querySelector('.bh-plan-name, .card-plan-title, .plan-title, .pricing-title');
          if (nameEl && pkg.name) nameEl.textContent = pkg.name;

          const amtEl = card.querySelector('.bh-amt, .plan-price, .price-amt, .amount');
          const price = pkg.basePrice || pkg.discountPrice;
          if (amtEl && price) amtEl.textContent = price;

          const annualEl = card.querySelector('.bh-annual, .annual-price-sub, .billed-yearly');
          if (annualEl && pkg.annualPrice) {
            annualEl.textContent = `৳${pkg.annualPrice.toLocaleString()} billed yearly`;
          }

          const badgeEl = card.querySelector('.bh-top-label, .ribbon, .card-badge');
          if (badgeEl && pkg.badge) badgeEl.textContent = pkg.badge;
        });
      });
    }
  } catch(e) {}
}

window.toggleJaasFaq = function(btn) {
  if (!btn) return;
  const ans = btn.nextElementSibling;
  const icon = btn.querySelector('.fa-chevron-down');
  if (!ans) return;
  if (ans.style.display === 'none' || !ans.style.display) {
    ans.style.display = 'block';
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    ans.style.display = 'none';
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
};
