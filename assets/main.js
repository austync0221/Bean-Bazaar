/* Bean Bazaar v2 — site behaviour: nav menu, hero carousel, coffee lots, cart, toast, ticket form. */
(function () {
  'use strict';

  /* ---------- Data: coffee lots ---------- */
  var LOTS = [
    { id: 'yirg', name: 'Yirgacheffe Kochere', roaster: 'Ember & Oak', origin: 'Ethiopia', process: 'Washed', roast: 2, notes: 'Jasmine, bergamot, peach', price: 19.0, grams: 250, stock: 'in', left: null, alt: 'A kraft bag of Ember & Oak Yirgacheffe Kochere, light roast, surrounded by light-brown roasted beans' },
    { id: 'huila', name: 'Huila Pink Bourbon', roaster: 'Slow Pour Co.', origin: 'Colombia', process: 'Natural', roast: 3, notes: 'Red apple, panela, cocoa', price: 24.0, grams: 340, stock: 'out', left: 0, alt: 'A kraft bag of Slow Pour Co. Huila Pink Bourbon, medium roast, surrounded by medium-brown roasted beans' },
    { id: 'mand', name: 'Mandheling Grade 1', roaster: 'Night Owl Roasters', origin: 'Sumatra', process: 'Wet-hulled', roast: 4, notes: 'Cedar, dark chocolate, molasses', price: 16.5, grams: 250, stock: 'in', left: 4, alt: 'A kraft bag of Night Owl Roasters Mandheling Grade 1, dark roast, surrounded by dark roasted beans' },
    { id: 'gesha', name: 'Gesha Village Lot 22', roaster: 'Ember & Oak', origin: 'Ethiopia', process: 'Natural', roast: 1, notes: 'Honeysuckle, papaya, black tea', price: 38.0, grams: 200, stock: 'out', left: 0, alt: 'A kraft bag of Ember & Oak Gesha Village Lot 22, extra-light roast, surrounded by pale golden-brown beans' },
    { id: 'kenya', name: 'Nyeri Gatomboya AA', roaster: 'Slow Pour Co.', origin: 'Kenya', process: 'Washed', roast: 2, notes: 'Blackcurrant, grapefruit, cane sugar', price: 21.0, grams: 250, stock: 'in', left: null, alt: 'A kraft bag of Slow Pour Co. Nyeri Gatomboya AA, light roast, surrounded by light-brown roasted beans' },
    { id: 'cerrado', name: 'Cerrado Mineiro', roaster: 'Copper Kettle', origin: 'Brazil', process: 'Pulped natural', roast: 4, notes: 'Hazelnut, milk chocolate, toffee', price: 14.0, grams: 340, stock: 'in', left: null, alt: 'A kraft bag of Copper Kettle Cerrado Mineiro, dark roast, surrounded by dark roasted beans' },
    { id: 'antigua', name: 'Antigua La Soledad', roaster: 'Copper Kettle', origin: 'Guatemala', process: 'Washed', roast: 3, notes: 'Brown sugar, orange, almond', price: 18.0, grams: 250, stock: 'in', left: 7, alt: 'A kraft bag of Copper Kettle Antigua La Soledad, medium roast, surrounded by medium-brown roasted beans' },
    { id: 'decaf', name: 'Sugarcane Decaf', roaster: 'Night Owl Roasters', origin: 'Colombia', process: 'EA decaf', roast: 3, notes: 'Caramel, red grape, cocoa', price: 17.0, grams: 340, stock: 'in', left: null, alt: 'A kraft bag of Night Owl Roasters Sugarcane Decaf, medium roast, surrounded by medium-brown roasted beans' }
  ];
  var ROAST_WORD = ['', 'Extra light', 'Light', 'Medium', 'Dark', 'Extra dark'];
  var TICKETS = { day: { label: 'Day pass', price: 18 }, weekend: { label: 'Weekend pass', price: 30 }, cupping: { label: 'Weekend pass + Cupping Lab', price: 42 } };

  var money = function (n) { return '$' + n.toFixed(2); };
  var per100 = function (l) { return l.price / l.grams * 100; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- Storage (per-browser convenience; works without it) ---------- */
  function load(key, fallback) { try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } }
  function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* storage unavailable: keep in memory */ } }

  var cart = load('bb-cart', {});
  var favs = load('bb-favs', {});

  function cartCount() { var n = 0; for (var k in cart) n += cart[k]; return n; }
  function updateCartLinks() {
    var n = cartCount();
    document.querySelectorAll('[data-cart-count]').forEach(function (el) { el.textContent = n; });
  }

  /* ---------- Toast ---------- */
  var toast, toastTimer, toastHover = false;
  function showToast(html) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast'; toast.setAttribute('role', 'status');
      toast.innerHTML = '<span class="toast-msg"></span><button type="button" aria-label="Close notification">×</button>';
      document.body.appendChild(toast);
      toast.querySelector('button').onclick = hideToast;
      toast.addEventListener('mouseenter', function () { toastHover = true; });
      toast.addEventListener('mouseleave', function () { toastHover = false; armToast(); });
    }
    toast.querySelector('.toast-msg').innerHTML = html;
    toast.classList.add('on');
    armToast();
  }
  function armToast() {
    clearTimeout(toastTimer);
    var ms = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--toast-dismiss'), 10) || 6000;
    toastTimer = setTimeout(function () { if (!toastHover) hideToast(); }, ms);
  }
  function hideToast() { if (toast) toast.classList.remove('on'); }

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1; save('bb-cart', cart); updateCartLinks();
    var lot = LOTS.filter(function (l) { return l.id === id; })[0];
    showToast('Added ' + esc(lot.name) + ' to your cart. <a href="cart.html">View cart</a>');
  }

  /* ---------- VendorCard ---------- */
  function card(l, i) {
    var meter = ''; for (var k = 1; k <= 5; k++) meter += '<i' + (k <= l.roast ? ' class="on"' : '') + '></i>';
    var out = l.stock === 'out';
    var stock = out ? '<span class="stock out"><i class="dot"></i>Sold out</span>'
      : '<span class="stock in"><i class="dot"></i>' + (l.left ? 'Only ' + l.left + ' left' : 'In stock') + '</span>';
    var fav = favs[l.id] ? 'true' : 'false';
    return '<article class="c">' +
      '<img class="img" src="assets/images/' + l.id + '.jpg" width="960" height="720" loading="lazy" alt="' + esc(l.alt) + '">' +
      '<div class="c-top"><h3>' + esc(l.name) + '</h3><button class="bb-icon" type="button" data-fav="' + l.id + '" aria-pressed="' + fav + '" aria-label="Save ' + esc(l.name) + ' to favourites">♥</button></div>' +
      '<a class="r" href="vendors.html#roasters">' + esc(l.roaster) + '</a>' +
      '<dl class="spec"><dt>Origin</dt><dd>' + esc(l.origin) + '</dd><dt>Process</dt><dd>' + esc(l.process) + '</dd>' +
      '<dt>Roast</dt><dd><span class="meter" aria-hidden="true">' + meter + '</span>' + ROAST_WORD[l.roast] + '</dd>' +
      '<dt>Notes</dt><dd>' + esc(l.notes) + '</dd></dl>' +
      '<div class="buy"><span class="price">' + money(l.price) + '</span><span>' + l.grams + ' g</span><span class="per">' + money(per100(l)) + ' per 100 g</span></div>' +
      stock +
      (out ? '<button class="bb-btn" type="button" disabled>Sold out</button>'
        : '<button class="bb-btn" type="button" data-add="' + l.id + '">Add to cart<span class="sr-only">: ' + esc(l.name) + '</span></button>') +
      '</article>';
  }
  function bindCards(root) {
    root.querySelectorAll('[data-add]').forEach(function (b) { b.onclick = function () { addToCart(b.getAttribute('data-add')); }; });
    root.querySelectorAll('[data-fav]').forEach(function (b) {
      b.onclick = function () {
        var id = b.getAttribute('data-fav'); favs[id] = !favs[id]; if (!favs[id]) delete favs[id];
        save('bb-favs', favs); b.setAttribute('aria-pressed', favs[id] ? 'true' : 'false');
      };
    });
  }

  /* Featured lots (home) */
  var featured = document.getElementById('featured');
  if (featured) {
    featured.innerHTML = [LOTS[0], LOTS[1], LOTS[2]].map(card).join('');
    bindCards(featured);
  }

  /* All lots with filter + sort (vendors) */
  var lotsEl = document.getElementById('lots');
  if (lotsEl) {
    var fOrigin = document.getElementById('f-origin'), fRoast = document.getElementById('f-roast'),
      fSort = document.getElementById('f-sort'), fStock = document.getElementById('f-stock'), count = document.getElementById('lot-count');
    var origins = LOTS.map(function (l) { return l.origin; }).filter(function (o, i, a) { return a.indexOf(o) === i; }).sort();
    origins.forEach(function (o) { var op = document.createElement('option'); op.value = o; op.textContent = o; fOrigin.appendChild(op); });
    var render = function () {
      var list = LOTS.filter(function (l) {
        return (!fOrigin.value || l.origin === fOrigin.value) &&
          (!fRoast.value || String(l.roast) === fRoast.value) &&
          (!fStock.checked || l.stock !== 'out');
      });
      var s = fSort.value;
      list.sort(function (a, b) {
        if (s === 'per100') return per100(a) - per100(b);
        if (s === 'price') return a.price - b.price;
        if (s === 'roast') return a.roast - b.roast;
        return a.name.localeCompare(b.name);
      });
      lotsEl.innerHTML = list.length ? list.map(card).join('') : '<p class="empty">No coffees match those filters. Try another origin or roast.</p>';
      count.textContent = list.length + (list.length === 1 ? ' coffee' : ' coffees') + ' shown';
      bindCards(lotsEl);
    };
    [fOrigin, fRoast, fSort, fStock].forEach(function (el) { el.addEventListener('change', render); });
    render();
  }

  /* ---------- Cart page ---------- */
  var cartEl = document.getElementById('cart');
  if (cartEl) {
    var drawCart = function () {
      var ids = Object.keys(cart), total = 0;
      if (!ids.length) { cartEl.innerHTML = '<p>Your cart is empty. <a href="vendors.html">Browse the coffees</a>.</p>'; return; }
      var rows = ids.map(function (id) {
        var l = LOTS.filter(function (x) { return x.id === id; })[0]; if (!l) return '';
        var line = l.price * cart[id]; total += line;
        return '<li><span><b>' + esc(l.name) + '</b><br><span class="fine">' + esc(l.roaster) + ' · ' + l.grams + ' g · ' + money(l.price) + ' each</span></span>' +
          '<span class="btn-row"><button class="bb-icon" type="button" data-dec="' + id + '" aria-label="Remove one ' + esc(l.name) + '">−</button>' +
          '<span aria-label="Quantity">' + cart[id] + '</span>' +
          '<button class="bb-icon" type="button" data-inc="' + id + '" aria-label="Add one more ' + esc(l.name) + '">+</button>' +
          '<b class="price" style="min-width:90px;text-align:right">' + money(line) + '</b></span></li>';
      }).join('');
      cartEl.innerHTML = '<ul class="cart-list">' + rows + '</ul>' +
        '<div class="summary"><p class="fine">Subtotal</p><p class="total">' + money(total) + '</p>' +
        '<p class="fine">' + (total >= 40 ? 'Free roaster-direct shipping.' : 'Add ' + money(40 - total) + ' more for free roaster-direct shipping, or collect at the hall.') + '</p>' +
        '<a class="bb-btn" href="tickets.html">Continue to checkout</a></div>';
      cartEl.querySelectorAll('[data-inc]').forEach(function (b) { b.onclick = function () { cart[b.dataset.inc]++; save('bb-cart', cart); updateCartLinks(); drawCart(); }; });
      cartEl.querySelectorAll('[data-dec]').forEach(function (b) { b.onclick = function () { var k = b.dataset.dec; cart[k]--; if (cart[k] <= 0) delete cart[k]; save('bb-cart', cart); updateCartLinks(); drawCart(); }; });
    };
    drawCart();
  }

  /* ---------- NavBar menu ---------- */
  document.querySelectorAll('.has-menu').forEach(function (h) {
    var b = h.querySelector('button');
    var set = function (o) { h.classList.toggle('open', o); b.setAttribute('aria-expanded', o ? 'true' : 'false'); };
    b.addEventListener('click', function () { set(b.getAttribute('aria-expanded') !== 'true'); });
    h.addEventListener('mouseenter', function () { b.setAttribute('aria-expanded', 'true'); });
    h.addEventListener('mouseleave', function () { if (!h.classList.contains('open')) b.setAttribute('aria-expanded', 'false'); });
    h.addEventListener('keydown', function (e) { if (e.key === 'Escape') { set(false); b.focus(); } });
    document.addEventListener('click', function (e) { if (!h.contains(e.target)) set(false); });
  });

  /* ---------- EventHero carousel ---------- */
  var hero = document.querySelector('.eh');
  if (hero) {
    var slides = hero.querySelectorAll('.slide'), dots = hero.querySelectorAll('.dots button'), i = 0, hold = false,
      paused = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches, pp = hero.querySelector('[data-pp]');
    var go = function (n) {
      slides[i].classList.remove('on'); dots[i].removeAttribute('aria-current');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('on'); dots[i].setAttribute('aria-current', 'true');
    };
    var label = function () { pp.textContent = paused ? '▶' : '❚❚'; pp.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow'); };
    hero.querySelector('[data-prev]').onclick = function () { go(i - 1); };
    hero.querySelector('[data-next]').onclick = function () { go(i + 1); };
    pp.onclick = function () { paused = !paused; label(); };
    dots.forEach(function (d, n) { d.onclick = function () { go(n); }; });
    ['mouseenter', 'focusin'].forEach(function (ev) { hero.addEventListener(ev, function () { hold = true; }); });
    ['mouseleave', 'focusout'].forEach(function (ev) { hero.addEventListener(ev, function () { hold = false; }); });
    var ms = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--carousel-advance'), 10) || 7000;
    label(); setInterval(function () { if (!paused && !hold) go(i + 1); }, ms);
  }

  /* ---------- Ticket form ---------- */
  var form = document.getElementById('ticket-form');
  if (form) {
    var qty = form.querySelector('#qty'), totalEl = document.getElementById('t-total'), lineEl = document.getElementById('t-line');
    var recalc = function () {
      var type = form.querySelector('input[name="type"]:checked').value, q = Math.max(0, parseInt(qty.value, 10) || 0);
      lineEl.textContent = q + ' × ' + TICKETS[type].label + ' (' + money(TICKETS[type].price) + ')';
      totalEl.textContent = money(q * TICKETS[type].price);
    };
    form.addEventListener('change', recalc); qty.addEventListener('input', recalc); recalc();

    var rules = {
      name: function (v) { return v.trim().length >= 2 ? '' : 'Enter your full name.'; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter an email like name@example.com.'; },
      qty: function (v) { var n = parseInt(v, 10); return n >= 1 && n <= 10 ? '' : 'Choose between 1 and 10 tickets.'; }
    };
    var check = function (el) {
      var err = rules[el.name](el.value), msg = document.getElementById(el.id + '-m');
      el.setAttribute('aria-invalid', err ? 'true' : 'false'); el.classList.toggle('ok', !err);
      msg.className = 'msg ' + (err ? 'err' : 'ok'); msg.textContent = err ? '⚠ ' + err : '✓ Looks good';
      return !err;
    };
    Object.keys(rules).forEach(function (k) { var el = form.elements[k]; el.addEventListener('blur', function () { check(el); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = Object.keys(rules).map(function (k) { return check(form.elements[k]) ? null : form.elements[k]; }).filter(Boolean);
      var status = document.getElementById('form-status');
      if (bad.length) { status.className = 'msg err'; status.textContent = '⚠ Please fix the ' + (bad.length === 1 ? 'field' : bad.length + ' fields') + ' marked above.'; bad[0].focus(); return; }
      status.className = 'msg ok';
      status.textContent = '✓ Thanks, ' + form.elements.name.value.trim().split(' ')[0] + '! This is a demo, so no payment was taken. Your tickets would be emailed to ' + form.elements.email.value + '.';
      status.focus();
    });
  }

  updateCartLinks();
})();
