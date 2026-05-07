/**
 * ============================================================
 * JOMSHUTTLE — MAIN APP MODULE
 * Handles: Theme, Navbar, Hero, Services, Tours, Booking,
 *          WhatsApp messaging, EmailJS, Security (honeypot)
 * ============================================================
 */

import { COMPANY, DESTINATIONS, TOUR_PACKAGES, WHY_US, TESTIMONIALS, VAN_INFO } from './data.js';

// ── Theme Manager ──────────────────────────────────────────────
export const ThemeManager = {
  init() {
    const saved = localStorage.getItem('jomshuttle-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.set(saved || (prefersDark ? 'dark' : 'light'));
  },
  set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('jomshuttle-theme', theme);
    // Swap logo
    const logos = document.querySelectorAll('.nav-logo-img');
    logos.forEach(img => {
      img.src = theme === 'dark' ? COMPANY.logoDark : COMPANY.logoLight;
    });
    // Update toggle icon
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(t => t.textContent = theme === 'dark' ? '☀️' : '🌙');
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    this.set(current === 'dark' ? 'light' : 'dark');
  }
};

// ── Theme Toggle ───────────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');

function updateToggleIcon() {
  if (document.body.classList.contains('dark')) {
    themeToggle.textContent = '🌙'; // Dark mode icon
  } else {
    themeToggle.textContent = '🌞'; // Light mode icon
  }
}

// Initial load
updateToggleIcon();

// Toggle on click
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  updateToggleIcon();
});


// ── Navbar Builder ─────────────────────────────────────────────
export function buildNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  // Build destination dropdown items
  const destItems = DESTINATIONS.map(d => `
    <a href="#" class="dropdown-item" data-dest="${d.id}">
      <span class="emoji">${d.emoji}</span> ${d.name}
    </a>
  `).join('');

  nav.innerHTML = `
    <div class="nav-inner">
      <a href="#" class="nav-logo">

        <span class="nav-logo-text">
          <span class="logo-jom">Jom</span><span class="logo-shuttle">Shuttle</span><span class="logo-com">.com</span>
        </span>
      </a>

      <nav class="nav-links gap-1">
        <a href="#hero" class="nav-link active">Home</a>

        <div class="nav-dropdown">
          <div class="nav-dropdown-toggle">
            ✈️ Airport Transfer <span>▾</span>
          </div>
          <div class="nav-dropdown-menu">${destItems}</div>
        </div>
        
        <!--
        <div class="nav-dropdown">
          <div class="nav-dropdown-toggle">
            🚐 Interstate Transfer <span>▾</span>
          </div>
          <div class="nav-dropdown-menu">${destItems}</div>
        </div>
        -->

        <a href="#tours" class="nav-link">🗺️ Tour Packages</a>
        <a href="#why-us" class="nav-link">Why Us</a>
        <a href="#booking" class="nav-link">Book Now</a>
      </nav>

      <div class="nav-actions">
        <button class="theme-toggle" id="themeToggleDesktop" aria-label="Toggle dark/light mode">🌙</button>
        <a href="${COMPANY.whatsappGeneral}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">
          <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Chat
        </a>
        <button class="nav-hamburger" id="navHamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="nav-mobile" id="navMobile">
      <a href="#hero" class="mobile-link" data-mobile-close>🏠 Home</a>
      <div class="mobile-section-title">Destinations</div>
      <div class="mobile-grid">
        ${DESTINATIONS.map(d => `
          <a href="#" class="mobile-link" data-dest="${d.id}" data-mobile-close>
            ${d.emoji} ${d.name}
          </a>`).join('')}
      </div>
      <div class="mobile-section-title">Services</div>
      <a href="#tours" class="mobile-link" data-mobile-close>🗺️ Tour Packages</a>
      <a href="#why-us" class="mobile-link" data-mobile-close>⭐ Why Us</a>
      <a href="#booking" class="mobile-link" data-mobile-close>📋 Book Now</a>
      <div class="mobile-section-title">Contact</div>
      <a href="${COMPANY.whatsappGeneral}" target="_blank" class="mobile-link">
        💬 WhatsApp Us
      </a>
      <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:0.85rem;color:var(--text-muted)">Toggle theme</span>
        <button class="theme-toggle" id="themeToggleMobile">🌙</button>
      </div>
    </div>
  `;

  // Hamburger
  const ham = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobile');
  ham?.addEventListener('click', () => {
    ham.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile on link click
  document.querySelectorAll('[data-mobile-close]').forEach(el => {
    el.addEventListener('click', () => {
      ham?.classList.remove('open');
      mobileMenu?.classList.remove('open');
    });
  });

  // Theme toggles
  document.getElementById('themeToggleDesktop')?.addEventListener('click', () => ThemeManager.toggle());
  document.getElementById('themeToggleMobile')?.addEventListener('click', () => ThemeManager.toggle());

  // Active nav on scroll
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 10;
    nav.style.boxShadow = scrolled ? 'var(--shadow-md)' : 'none';
  });

  // Destination links → open modal
  document.querySelectorAll('[data-dest]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const dest = DESTINATIONS.find(d => d.id === el.dataset.dest);
      if (dest) openDestinationModal(dest);
    });
  });
}

// ── Hero Section ───────────────────────────────────────────────
export function buildHero() {
  const el = document.getElementById('hero');
  if (!el) return;

  el.innerHTML = `
    <div class="hero-bg">
      <div class="hero-mesh"></div>
      <div class="hero-grid-pattern"></div>
    </div>
    <div class="container hero-content" style="width:100%">
      <div class="hero-grid">
        <div>
          <div class="hero-tag">🇲🇾 Malaysia's Trusted Shuttle Service</div>
          <h1 class="hero-title">
            Travel Malaysia<br>
            <span class="highlight">Comfortably & Safely</span>
          </h1>
          <p class="hero-subtitle">
            Airport transfers, interstate journeys & curated tour packages — all bookable in seconds via WhatsApp.
          </p>
          <div class="hero-actions">
            <a href="#booking" class="btn btn-primary btn-xl">
              📋 Book a Transfer
            </a>
            <a href="#tours" class="btn btn-outline btn-xl">
              🗺️ View Tour Packages
            </a>
          </div>
          <div class="hero-stats">
            <div class="hero-stat">
              <span class="stat-value"><span>24/7</span></span>
              <span class="stat-label">Always Available</span>
            </div>
            <div class="hero-stat">
              <span class="stat-value"><span>12+</span></span>
              <span class="stat-label">States Covered</span>
            </div>
            <div class="hero-stat">
              <span class="stat-value"><span>⭐ 5.0</span></span>
              <span class="stat-label">Customer Rating</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-van-card" style="width:100%;max-width:480px;position:relative">
            <img
              /*src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&q=80"*/
              src="assets/toyota_klia_compress.jpg" alt="Toyota Hiace Airport Transfer"
              alt="JomShuttle Van"
              style="width:100%;height:340px;object-fit:cover"
            >
            <div class="hero-van-badge">
              <div class="badge-icon">🚐</div>
              <div class="badge-text">
                <strong>Toyota HiAce Fleet</strong>
                <span>Large & Small Vans Available</span>
              </div>
            </div>

            <div class="hero-float float-1">
              <span class="float-icon">✈️</span>
              <span class="float-text">KLIA & KLIA2 Transfers</span>
            </div>
            <div class="hero-float float-2">
              <span class="float-icon">💬</span>
              <span class="float-text">Instant WhatsApp Booking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ── Services Section (Tabs: Airport / Interstate / Tours) ──────
export function buildServices() {
  const el = document.getElementById('services');
  if (!el) return;

  // Build destination grid (Airport & Interstate share same destinations)
  const destGrid = DESTINATIONS.map(d => `
    <div class="dest-card animate-on-scroll" data-dest="${d.id}">
      <div class="dest-card-header">
        <div class="dest-card-name">
          <span class="dest-emoji">${d.emoji}</span>
          <div>
            <div class="dest-name">${d.name}</div>
            <div class="dest-count">${d.routes.length} route${d.routes.length > 1 ? 's' : ''}</div>
          </div>
        </div>
        <div class="dest-arrow">→</div>
      </div>
      <div class="dest-card-routes">
        ${d.routes.slice(0,2).map(r => `
          <div class="route-item">
            <span class="route-label">${r.label}</span>
            <div class="route-prices">
              <span class="route-price">RM${r.largeVan.toLocaleString()}</span>
              <span class="route-price">RM${r.smallVan.toLocaleString()}</span>
            </div>
          </div>
        `).join('')}
        ${d.routes.length > 2 ? `<div style="text-align:center;padding:0.5rem 0;font-size:0.8rem;color:var(--text-muted)">+${d.routes.length - 2} more route(s)</div>` : ''}
      </div>
    </div>
  `).join('');

  el.innerHTML = `
    <div class="container">
      <div class="section-header">
        <div class="section-label">✈️ Our Services</div>
        <h2 class="section-title">Where Do You Want to Go?</h2>
        <p class="section-subtitle">Choose your service type below. All prices are per vehicle — not per person.</p>
      </div>

      <div class="service-tabs" role="tablist">
        <button class="service-tab active" data-tab="airport" role="tab">
          ✈️ Airport Transfer
        </button>
        <!--
        <button class="service-tab" data-tab="interstate" role="tab">
          🚐 Interstate Transfer
        </button>
        -->
        <button class="service-tab" data-tab="tours-tab" role="tab">
          🗺️ Tour Packages
        </button>
      </div>

      <!-- Airport Transfer tab -->
      <div class="service-content active" id="tab-airport">
        <div class="van-info-banner animate-on-scroll">
          <div class="van-info-item">
            <div class="van-info-label">🚐 ${VAN_INFO.large.label}</div>
            <div class="van-info-desc">
              ${VAN_INFO.large.withLuggage}<br>
              ${VAN_INFO.large.withoutLuggage}
            </div>
          </div>
          <div class="van-info-item">
            <div class="van-info-label">🚌 ${VAN_INFO.small.label}</div>
            <div class="van-info-desc">
              ${VAN_INFO.small.withLuggage}<br>
              ${VAN_INFO.small.withoutLuggage}
            </div>
          </div>
          <div class="van-info-item">
            <div class="van-info-label">💡 How to Book</div>
            <div class="van-info-desc">
              Click any destination card to view routes and prices, then tap the WhatsApp booking button. Our team replies fast!
            </div>
          </div>
        </div>
        <div class="grid-3" id="airport-dest-grid">${destGrid}</div>
      </div>

      <!-- Interstate Transfer tab (same destinations) -->
      <!--
      <div class="service-content" id="tab-interstate">
        <div class="van-info-banner animate-on-scroll">
          <div class="van-info-item">
            <div class="van-info-label">🚐 ${VAN_INFO.large.label}</div>
            <div class="van-info-desc">${VAN_INFO.large.withLuggage}<br>${VAN_INFO.large.withoutLuggage}</div>
          </div>
          <div class="van-info-item">
            <div class="van-info-label">🚌 ${VAN_INFO.small.label}</div>
            <div class="van-info-desc">${VAN_INFO.small.withLuggage}<br>${VAN_INFO.small.withoutLuggage}</div>
          </div>
          <div class="van-info-item">
            <div class="van-info-label">📍 Point-to-Point</div>
            <div class="van-info-desc">
              Travel between any two points — hotel to hotel, door to door. Contact us for custom routes.
            </div>
          </div>
        </div>
        <div class="grid-3">${destGrid}</div>
      </div>
      -->

      <!-- Tour Packages mini-tab -->
      <div class="service-content" id="tab-tours-tab">
        <div style="text-align:center;padding:1.5rem 0 1rem">
          <p style="color:var(--text-secondary);margin-bottom:1.5rem">Explore our curated tour packages below, or scroll down to the full tour section.</p>
          <a href="#tours" class="btn btn-primary">View All Tour Packages →</a>
        </div>
      </div>
    </div>
  `;

  // Tab switching
  el.querySelectorAll('.service-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      el.querySelectorAll('.service-tab').forEach(t => t.classList.remove('active'));
      el.querySelectorAll('.service-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = `tab-${tab.dataset.tab}`;
      document.getElementById(target)?.classList.add('active');
    });
  });

  // Destination card click → modal
  el.querySelectorAll('.dest-card').forEach(card => {
    card.addEventListener('click', () => {
      const dest = DESTINATIONS.find(d => d.id === card.dataset.dest);
      if (dest) openDestinationModal(dest);
    });
  });
}

// ── Tour Packages Section ──────────────────────────────────────
export function buildTours() {
  const el = document.getElementById('tours');
  if (!el) return;

  const cards = TOUR_PACKAGES.map(pkg => `
    <div class="tour-card animate-on-scroll" data-tour="${pkg.id}">
      <div class="tour-card-img">
        <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
        <div class="tour-card-img-overlay"></div>
        <div class="tour-card-badges">
          ${pkg.badge ? `<span class="badge badge-${pkg.badge.toLowerCase()}">${pkg.badge}</span>` : ''}
        </div>
        <div class="tour-card-emoji">${pkg.emoji}</div>
      </div>
      <div class="tour-card-body">
        <div class="tour-card-title">${pkg.title}</div>
        <div class="tour-card-subtitle">${pkg.subtitle}</div>
        <div class="tour-card-meta">
          <span class="tour-meta-item">📅 ${pkg.duration}</span>
          <span class="tour-meta-item">👥 Group/Private</span>
        </div>
        <div class="tour-card-price">
          <div>
            <div class="price-value">${pkg.price}</div>
            <div class="price-note">${pkg.priceNote}</div>
          </div>
          <button class="btn btn-primary btn-sm">View Details →</button>
        </div>
      </div>
    </div>
  `).join('');

  el.innerHTML = `
    <div class="container">
      <div class="section-header">
        <div class="section-label">🗺️ Tour Packages</div>
        <h2 class="section-title">Curated Travel Experiences</h2>
        <p class="section-subtitle">All-inclusive tour packages with transport, accommodation & a licensed guide.</p>
      </div>
      <div class="grid-2">${cards}</div>
    </div>
  `;

  // Tour card click → modal
  el.querySelectorAll('.tour-card').forEach(card => {
    card.addEventListener('click', () => {
      const pkg = TOUR_PACKAGES.find(p => p.id === card.dataset.tour);
      if (pkg) openTourModal(pkg);
    });
  });
}

// ── Why Us Section ─────────────────────────────────────────────
export function buildWhyUs() {
  const el = document.getElementById('why-us');
  if (!el) return;

  el.innerHTML = `
    <div class="container">
      <div class="section-header">
        <div class="section-label">⭐ Why JomShuttle</div>
        <h2 class="section-title">Why Thousands Choose Us</h2>
        <p class="section-subtitle">Your comfort and safety are our top priority — every single trip.</p>
      </div>
      <div class="grid-3">
        ${WHY_US.map(w => `
          <div class="why-card animate-on-scroll">
            <div class="why-icon">${w.icon}</div>
            <div class="why-title">${w.title}</div>
            <div class="why-desc">${w.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ── Testimonials ───────────────────────────────────────────────
export function buildTestimonials() {
  const el = document.getElementById('testimonials');
  if (!el) return;

  el.innerHTML = `
    <div class="container">
      <div class="section-header">
        <div class="section-label">💬 Reviews</div>
        <h2 class="section-title">What Our Customers Say</h2>
      </div>
      <div class="grid-2">
        ${TESTIMONIALS.map(t => `
          <div class="testimonial-card animate-on-scroll">
            <div class="t-stars">${'★'.repeat(t.rating)}</div>
            <div class="t-text">"${t.text}"</div>
            <div class="t-author">
              <div class="t-avatar">${t.avatar}</div>
              <div>
                <div class="t-name">${t.name}</div>
                <div class="t-location">📍 ${t.location}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ── Booking Form Section ───────────────────────────────────────
export function buildBookingForm() {
  const el = document.getElementById('booking');
  if (!el) return;

  // Build destination options for select
  const destOptions = DESTINATIONS.map(d =>
    `<option value="${d.name}">${d.emoji} ${d.name}</option>`
  ).join('');

  // Build tour options
  const tourOptions = TOUR_PACKAGES.map(p =>
    `<option value="${p.title}">${p.emoji} ${p.title} (${p.duration})</option>`
  ).join('');

  el.innerHTML = `
    <div class="container">
      <div class="section-header">
        <div class="section-label">📋 Enquiry & Booking</div>
        <h2 class="section-title">Get Your Instant Quote</h2>
        <p class="section-subtitle">Fill in the form — we'll send your booking to WhatsApp and email our agents immediately.</p>
      </div>

      <div class="booking-form-card">
        <div class="booking-form-header">
          <h3>🚐 JomShuttle Booking Enquiry</h3>
          <p>We respond within minutes via WhatsApp</p>
        </div>

        <div class="booking-form-body">
          <!-- SUCCESS STATE -->
          <div class="form-success" id="formSuccess">
            <div class="success-icon">🎉</div>
            <div class="success-title">Booking Sent Successfully!</div>
            <div class="success-text">
              Your enquiry has been sent via WhatsApp and our agents have been notified by email.
              We will confirm your booking shortly!
            </div>
            <button class="btn btn-primary" style="margin-top:1.5rem" id="formResetBtn">Make Another Booking</button>
          </div>

          <!-- FORM -->
          <form id="bookingForm" novalidate>

            <!-- ⚠️ HONEYPOT FIELD — HIDDEN FROM REAL USERS, BOTS FILL THIS -->
            <!-- If this field has a value, the form is rejected as spam -->
            <div class="honeypot-field" aria-hidden="true">
              <label for="hp_website">Leave this blank</label>
              <input type="text" id="hp_website" name="hp_website" tabindex="-1" autocomplete="off">
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="f_name">Full Name <span>*</span></label>
                <input class="form-control" type="text" id="f_name" name="f_name"
                  placeholder="e.g. Ahmad bin Razak" required autocomplete="name">
              </div>
              <div class="form-group">
                <label class="form-label" for="f_phone">Phone / WhatsApp <span>*</span></label>
                <input class="form-control" type="tel" id="f_phone" name="f_phone"
                  placeholder="e.g. 0123456789" required autocomplete="tel">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="f_email">Email Address</label>
              <input class="form-control" type="email" id="f_email" name="f_email"
                placeholder="your@email.com" autocomplete="email">
            </div>

            <div class="form-group">
              <label class="form-label" for="f_service">Service Type <span>*</span></label>
              <select class="form-control" id="f_service" name="f_service" required>
                <option value="">— Select a service —</option>
                <optgroup label="✈️ Airport Transfer">
                  <option value="airport-klia">KLIA / KLIA2 Transfer</option>
                </optgroup>
                <optgroup label="🚐 Interstate Transfer">
                  ${destOptions}
                </optgroup>
                <optgroup label="🗺️ Tour Package">
                  ${tourOptions}
                </optgroup>
              </select>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="f_pickup">Pickup Location <span>*</span></label>
                <input class="form-control" type="text" id="f_pickup" name="f_pickup"
                  placeholder="e.g. Hotel name, address" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="f_dropoff">Drop-off Location <span>*</span></label>
                <input class="form-control" type="text" id="f_dropoff" name="f_dropoff"
                  placeholder="e.g. KLIA Terminal 1" required>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="f_date">Travel Date <span>*</span></label>
                <input class="form-control" type="date" id="f_date" name="f_date" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="f_time">Pickup Time <span>*</span></label>
                <input class="form-control" type="time" id="f_time" name="f_time" required>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="f_pax">No. of Passengers <span>*</span></label>
                <select class="form-control" id="f_pax" name="f_pax" required>
                  <option value="">— Select —</option>
                  ${[...Array(17)].map((_, i) => `<option value="${i+1}">${i+1} passenger${i > 0 ? 's' : ''}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="f_van">Van Preference</label>
                <select class="form-control" id="f_van" name="f_van">
                  <option value="">— No preference —</option>
                  <option value="large">Large Van (7–17 pax)</option>
                  <option value="small">Small Van (4–10 pax)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="f_notes">Additional Notes</label>
              <textarea class="form-control" id="f_notes" name="f_notes" rows="3"
                placeholder="E.g. flight number, special requirements, extra luggage..."></textarea>
            </div>

            <hr class="form-divider">

            <button type="submit" class="btn btn-whatsapp form-submit" id="formSubmitBtn">
              <svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:#fff;flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Send via WhatsApp
            </button>

            <p style="text-align:center;font-size:0.78rem;color:var(--text-muted);margin-top:0.75rem">
              🔒 Your details are sent securely. No spam, ever.
            </p>
          </form>
        </div>
      </div>
    </div>
  `;

  // Set min date to today
  const dateInput = document.getElementById('f_date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Attach form handler
  document.getElementById('bookingForm')?.addEventListener('submit', handleBookingSubmit);
  document.getElementById('formResetBtn')?.addEventListener('click', () => {
    document.getElementById('formSuccess').classList.remove('show');
    document.getElementById('bookingForm').style.display = '';
    document.getElementById('bookingForm').reset();
  });
}

// ── Booking Form Submission ────────────────────────────────────
async function handleBookingSubmit(e) {
  e.preventDefault();
  const form = e.target;

  // ── Honeypot check — if filled, silently reject (bot detected)
  const honeypot = form.querySelector('#hp_website');
  if (honeypot && honeypot.value.trim() !== '') {
    // Silently appear to succeed — don't alert bots that they were caught
    showToast('✅ Booking sent!', 'success');
    form.reset();
    return;
  }

  // ── Rate limiting — prevent rapid resubmission
  const lastSubmit = parseInt(sessionStorage.getItem('jom_last_submit') || '0');
  const now = Date.now();
  if (now - lastSubmit < 30000) { // 30 second cooldown
    showToast('⏳ Please wait before submitting again.', 'error');
    return;
  }

  // ── Gather form data
  const data = {
    name:     sanitize(form.f_name.value.trim()),
    phone:    sanitize(form.f_phone.value.trim()),
    email:    sanitize(form.f_email.value.trim()),
    service:  sanitize(form.f_service.value),
    pickup:   sanitize(form.f_pickup.value.trim()),
    dropoff:  sanitize(form.f_dropoff.value.trim()),
    date:     form.f_date.value,
    time:     form.f_time.value,
    pax:      form.f_pax.value,
    van:      form.f_van.value || 'No preference',
    notes:    sanitize(form.f_notes.value.trim() || 'None'),
  };

  // ── Basic validation
  if (!data.name || !data.phone || !data.service || !data.pickup || !data.dropoff || !data.date || !data.time || !data.pax) {
    showToast('⚠️ Please fill in all required fields.', 'error');
    return;
  }

  // ── Phone validation (basic Malaysian format)
  if (!/^[0-9+\-\s]{8,15}$/.test(data.phone)) {
    showToast('⚠️ Please enter a valid phone number.', 'error');
    return;
  }

  // Show loading state
  const btn = document.getElementById('formSubmitBtn');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `<div class="spinner"></div> Sending...`;
  btn.disabled = true;

  try {
    // ── Step 1: Send via WhatsApp
    const waMsg = buildWhatsAppMessage(data);
    const waUrl = `https://wa.me/${COMPANY.phone.replace(/[^0-9]/g,'')}?text=${encodeURIComponent(waMsg)}`;

    // ── Step 2: Send email via EmailJS (to both agents)
    await sendEmailNotification(data);

    // ── Record submission time
    sessionStorage.setItem('jom_last_submit', now.toString());

    // ── Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // ── Show success state
    form.style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
    showToast('✅ Booking sent! Check your WhatsApp.', 'success');

  } catch (err) {
    console.error('Booking error:', err);
    showToast('⚠️ Email notification failed, but WhatsApp was opened.', 'error');
    // Still open WhatsApp even if email fails
    const waMsg = buildWhatsAppMessage(data);
    const waUrl = `https://wa.me/${COMPANY.phone.replace(/[^0-9]/g,'')}?text=${encodeURIComponent(waMsg)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    form.style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
  } finally {
    btn.innerHTML = originalHTML;
    btn.disabled = false;
  }
}

// ── Build WhatsApp Message ─────────────────────────────────────
function buildWhatsAppMessage(data) {
  return [
    `🚐 *JomShuttle Booking Enquiry*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Name:* ${data.name}`,
    `📱 *Phone:* ${data.phone}`,
    `📧 *Email:* ${data.email || 'Not provided'}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🗓️ *Service:* ${data.service}`,
    `📍 *Pickup:* ${data.pickup}`,
    `🏁 *Drop-off:* ${data.dropoff}`,
    `📅 *Date:* ${data.date}`,
    `⏰ *Time:* ${data.time}`,
    `👥 *Passengers:* ${data.pax}`,
    `🚌 *Van:* ${data.van}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `📝 *Notes:* ${data.notes}`,
    ``,
    `_Sent from JomShuttle.com_`
  ].join('\n');
}

// ── EmailJS Notification ───────────────────────────────────────
let emailJSInitialized = false;

async function sendEmailNotification(data) {
  if (typeof emailjs === 'undefined') {
    console.warn('EmailJS not loaded. Skipping email notification.');
    return;
  }

  if (!emailJSInitialized) {
    emailjs.init(COMPANY.emailJS.publicKey);
    emailJSInitialized = true;
  }

  const templateParams = {
    to_email:         COMPANY.email, // primary agent email
    to_email_2:       COMPANY.emailAgent2, // Secondary agent email
    customer_name:    data.name,
    customer_phone:   data.phone,
    customer_email:   data.email || 'Not provided',
    service_type:     data.service,
    pickup_location:  data.pickup,
    dropoff_location: data.dropoff,
    travel_date:      data.date,
    travel_time:      data.time,
    num_passengers:   data.pax,
    van_preference:   data.van,
    notes:            data.notes,
    booking_time:     new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })
  };

  await emailjs.send(
    COMPANY.emailJS.serviceId,
    COMPANY.emailJS.templateId,
    templateParams
  );
}

// ── Destination Detail Modal ───────────────────────────────────
function openDestinationModal(dest) {
  const modal = document.getElementById('destModal');
  const body = document.getElementById('destModalBody');
  if (!modal || !body) return;

  const routeRows = dest.routes.map(r => `
    <div style="background:var(--bg-secondary);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin-bottom:0.75rem">
      <div style="font-weight:600;font-size:0.9rem;margin-bottom:0.75rem;color:var(--text-primary)">${r.label}</div>
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
        <a href="${r.whatsappLink.large}" target="_blank" rel="noopener"
          class="btn btn-whatsapp btn-sm" style="flex:1;min-width:200px">
          💬 Large Van — RM${r.largeVan.toLocaleString()}
        </a>
        <a href="${r.whatsappLink.small}" target="_blank" rel="noopener"
          class="btn btn-outline btn-sm" style="flex:1;min-width:200px">
          💬 Small Van — RM${r.smallVan.toLocaleString()}
        </a>
      </div>
    </div>
  `).join('');

  const tourLinkHtml = dest.tourLink ? `
    <div style="margin-top:1rem;text-align:center">
      <a href="#tours" class="btn btn-ghost btn-sm" onclick="closeAllModals()">
        🗺️ ${dest.tourLink.label}
      </a>
    </div>
  ` : '';

  body.innerHTML = `
    <div style="margin-bottom:1.25rem">
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem">
        <span style="font-size:3rem">${dest.emoji}</span>
        <div>
          <h3 style="font-size:1.5rem">${dest.name}</h3>
          <p style="color:var(--text-secondary);font-size:0.87rem">${dest.routes.length} route${dest.routes.length>1?'s':''} available</p>
        </div>
      </div>
    </div>

    <div class="van-info-banner" style="margin-bottom:1.25rem">
      <div class="van-info-item">
        <div class="van-info-label">🚐 Large Van</div>
        <div class="van-info-desc">${VAN_INFO.large.withLuggage}<br>${VAN_INFO.large.withoutLuggage}</div>
      </div>
      <div class="van-info-item">
        <div class="van-info-label">🚌 Small Van</div>
        <div class="van-info-desc">${VAN_INFO.small.withLuggage}<br>${VAN_INFO.small.withoutLuggage}</div>
      </div>
    </div>

    <h4 style="margin-bottom:0.75rem;font-size:1rem">Select Your Route</h4>
    ${routeRows}
    ${tourLinkHtml}

    <div style="text-align:center;margin-top:1.5rem">
      <p style="font-size:0.8rem;color:var(--text-muted)">
        💡 Prefer to use our booking form?
        <a href="#booking" style="color:var(--brand-blue);font-weight:600" onclick="closeAllModals()">Click here</a>
      </p>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ── Tour Detail Modal ──────────────────────────────────────────
function openTourModal(pkg) {
  const modal = document.getElementById('tourModal');
  const body = document.getElementById('tourModalBody');
  if (!modal || !body) return;

  const itineraryHtml = pkg.itinerary.map(day => `
    <div class="itinerary-day">
      <div class="itinerary-day-title">${day.day}</div>
      <ul class="itinerary-items">
        ${day.items.map(item => `<li class="itinerary-item">• ${item}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  const includesHtml = pkg.includes.map(inc => `
    <div style="display:flex;align-items:center;gap:0.5rem;padding:0.4rem 0;font-size:0.87rem;color:var(--text-secondary)">
      <span style="color:#22c55e;font-weight:700">✓</span> ${inc}
    </div>
  `).join('');

  body.innerHTML = `
    <div style="position:relative;height:220px;border-radius:var(--radius-md);overflow:hidden;margin-bottom:1.5rem">
      <img src="${pkg.image}" alt="${pkg.title}" style="width:100%;height:100%;object-fit:cover">
      <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 60%)"></div>
      <div style="position:absolute;bottom:1rem;left:1rem">
        <span class="badge badge-${(pkg.badge||'new').toLowerCase()}">${pkg.badge||''}</span>
      </div>
      <div style="position:absolute;bottom:1rem;right:1rem;font-size:2.5rem">${pkg.emoji}</div>
    </div>

    <h2 style="font-size:1.6rem;margin-bottom:0.3rem">${pkg.title}</h2>
    <p style="color:var(--text-secondary);margin-bottom:1rem">${pkg.subtitle}</p>

    <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:1.5rem">
      <span style="background:var(--tag-bg);color:var(--tag-color);padding:0.3rem 0.8rem;border-radius:var(--radius-full);font-size:0.82rem;font-weight:600">📅 ${pkg.duration}</span>
      <span style="background:var(--price-bg);color:var(--price-color);padding:0.3rem 0.8rem;border-radius:var(--radius-full);font-size:0.85rem;font-weight:800">${pkg.price}</span>
      <span style="background:var(--bg-secondary);color:var(--text-secondary);padding:0.3rem 0.8rem;border-radius:var(--radius-full);font-size:0.82rem">${pkg.priceNote}</span>
    </div>

    <h4 style="margin-bottom:1rem;font-size:1rem;border-bottom:1px solid var(--border);padding-bottom:0.5rem">📋 Itinerary</h4>
    ${itineraryHtml}

    <h4 style="margin-top:1.5rem;margin-bottom:0.75rem;font-size:1rem;border-bottom:1px solid var(--border);padding-bottom:0.5rem">✅ Package Includes</h4>
    ${includesHtml}

    ${pkg.note ? `<div style="background:var(--tag-bg);border-radius:var(--radius-md);padding:0.75rem 1rem;margin-top:1rem;font-size:0.85rem;color:var(--text-secondary)">
      💡 ${pkg.note}
    </div>` : ''}

    <div style="margin-top:1.5rem;display:flex;gap:0.75rem;flex-wrap:wrap">
      <a href="${COMPANY.whatsappBase}${pkg.whatsappRef}" target="_blank" rel="noopener"
        class="btn btn-whatsapp" style="flex:1;min-width:200px">
        💬 Book This Package on WhatsApp
      </a>
      <a href="#booking" class="btn btn-outline" style="flex:1;min-width:160px" onclick="closeAllModals()">
        📋 Use Booking Form
      </a>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ── Footer Builder ─────────────────────────────────────────────
export function buildFooter() {
  const el = document.getElementById('footer');
  if (!el) return;

  const destLinks = DESTINATIONS.map(d =>
    `<a href="#" class="footer-link" data-dest="${d.id}">${d.emoji} ${d.name}</a>`
  ).join('');

  const tourLinks = TOUR_PACKAGES.map(p =>
    `<a href="#" class="footer-link" data-tour-modal="${p.id}">${p.emoji} ${p.title}</a>`
  ).join('');

  el.innerHTML = `
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="#" class="nav-logo" style="margin-bottom:0.75rem">
            <img class="nav-logo-img" src="${COMPANY.logoLight}" alt="${COMPANY.name}" style="height:40px" onerror="this.style.display='none'">
            <span class="nav-logo-text">
              <span class="logo-jom">Jom</span><span class="logo-shuttle">Shuttle</span><span class="logo-com">.com</span>
            </span>
          </a>
          <p class="footer-tagline">Malaysia's trusted shuttle service. Book your ride now and let us drive you there — 24 hours, 7 days a week.</p>
          <div class="footer-contact">
            <a href="${COMPANY.whatsappGeneral}" target="_blank" rel="noopener">
              💬 WhatsApp: ${COMPANY.phone}
            </a>
            <a href="mailto:${COMPANY.email}">📧 ${COMPANY.email}</a>
            <a href="#"><🕐 ${COMPANY.hours}</a>
          </div>
        </div>

        <div>
          <div class="footer-col-title">Destinations</div>
          <div class="footer-links">${destLinks}</div>
        </div>

        <div>
          <div class="footer-col-title">Tour Packages</div>
          <div class="footer-links">${tourLinks}</div>
          <div class="footer-col-title" style="margin-top:1.5rem">Services</div>
          <div class="footer-links">
            <a href="#services" class="footer-link">✈️ Airport Transfer</a>
            <a href="#services" class="footer-link">🚐 Interstate Transfer</a>
            <a href="#booking" class="footer-link">📋 Book Now</a>
          </div>
        </div>

        <div>
          <div class="footer-col-title">Quick Info</div>
          <div class="footer-links">
            <a href="#why-us" class="footer-link">⭐ Why JomShuttle?</a>
            <a href="#testimonials" class="footer-link">💬 Reviews</a>
          </div>
          <div class="footer-col-title" style="margin-top:1.5rem">Van Capacity</div>
          <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.8">
            <strong style="color:var(--text-primary)">Large Van</strong><br>
            ${VAN_INFO.large.withLuggage}<br>
            ${VAN_INFO.large.withoutLuggage}<br><br>
            <strong style="color:var(--text-primary)">Small Van</strong><br>
            ${VAN_INFO.small.withLuggage}<br>
            ${VAN_INFO.small.withoutLuggage}
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-copy">
          © ${new Date().getFullYear()} JomShuttle.com · All rights reserved · Made with ❤️ in Malaysia 🇲🇾
        </div>
        <div class="footer-social">
          <a href="${COMPANY.whatsappGeneral}" target="_blank" rel="noopener" class="social-btn" title="WhatsApp">💬</a>
          <a href="mailto:${COMPANY.email}" class="social-btn" title="Email">📧</a>
        </div>
      </div>
    </div>
  `;

  // Footer destination links
  el.querySelectorAll('[data-dest]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const dest = DESTINATIONS.find(d => d.id === link.dataset.dest);
      if (dest) openDestinationModal(dest);
    });
  });

  // Footer tour links
  el.querySelectorAll('[data-tour-modal]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const pkg = TOUR_PACKAGES.find(p => p.id === link.dataset.tourModal);
      if (pkg) openTourModal(pkg);
    });
  });
}

// ── WhatsApp FAB ───────────────────────────────────────────────
export function buildWaFab() {
  const el = document.getElementById('wa-fab');
  if (!el) return;
  el.innerHTML = `
    <a href="${COMPANY.whatsappGeneral}" target="_blank" rel="noopener" class="wa-fab" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      <span>Book via WhatsApp</span>
    </a>
  `;
}

// ── Modals (shared overlay) ────────────────────────────────────
export function buildModals() {
  const container = document.getElementById('modals');
  if (!container) return;

  container.innerHTML = `
    <!-- Destination Modal -->
    <div class="modal-overlay" id="destModal">
      <div class="modal-box">
        <div class="modal-close">
          <span style="font-weight:700;font-size:1rem">Route Details</span>
          <button class="modal-close-btn" onclick="closeAllModals()">✕</button>
        </div>
        <div class="modal-body" id="destModalBody"></div>
      </div>
    </div>

    <!-- Tour Modal -->
    <div class="modal-overlay" id="tourModal">
      <div class="modal-box">
        <div class="modal-close">
          <span style="font-weight:700;font-size:1rem">Tour Package Details</span>
          <button class="modal-close-btn" onclick="closeAllModals()">✕</button>
        </div>
        <div class="modal-body" id="tourModalBody"></div>
      </div>
    </div>

    <!-- Toast -->
    <div class="toast" id="toast">
      <span class="toast-icon" id="toastIcon">✅</span>
      <span id="toastText"></span>
    </div>
  `;

  // Close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeAllModals();
    });
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllModals();
  });
}

// ── Utility: Close All Modals ──────────────────────────────────
window.closeAllModals = function() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
};

// ── Utility: Toast Notification ───────────────────────────────
export function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  const toastIcon = document.getElementById('toastIcon');
  if (!toast) return;

  // Guard against empty or whitespace-only messages
  if (!message || message.trim() === "") {
    return;
  }

  // Apply type styling and icon
  toast.className = `toast toast-${type}`;
  toastIcon.textContent = type === 'success' ? '✅' : '⚠️';
  toastText.textContent = message;

  // Show toast
  toast.classList.add('show');

  // Auto-hide after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}


// ── Utility: Sanitize input (basic XSS prevention) ────────────
function sanitize(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ── Scroll Animation Observer ──────────────────────────────────
export function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ── Smooth scroll for anchor links ────────────────────────────
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const hash = link.getAttribute('href');
      if (hash === '#') return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Scroll Up Button logic ────────────────────────────
const scrollUpBtn = document.getElementById("scrollUpBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollUpBtn.classList.add("show");
  } else {
    scrollUpBtn.classList.remove("show");
  }
});

scrollUpBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


