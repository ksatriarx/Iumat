(function(){
  const root = document.getElementById('articleRoot');
  const articles = window.IUMAT_ARTICLES || {};
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug') || 'umkm-lokal-kekuatan-ekonomi-aceh-timur';
  const article = articles[slug];
  document.getElementById('yearNow').textContent = new Date().getFullYear();

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const renderBody = blocks => (blocks || []).map(block => {
    const text = escapeHTML(block.text);
    if(block.type === 'h2') return `<h2>${text}</h2>`;
    if(block.type === 'h3') return `<h3>${text}</h3>`;
    if(block.type === 'quote') return `<blockquote>${text}</blockquote>`;
    return `<p>${text}</p>`;
  }).join('');

  if(!article){
    root.innerHTML = `<div class="not-found"><h1>Berita tidak ditemukan</h1><p>Maaf, artikel yang kamu cari belum tersedia atau alamat beritanya tidak sesuai.</p><a class="primary-link" href="index.html#berita">Kembali ke berita IUMAT</a></div>`;
    document.title = 'Berita Tidak Ditemukan — IUMAT';
    return;
  }

  const related = (article.related || []).map(item => `
    <div class="related-item">
      <img src="${escapeHTML(item.image)}" alt="" loading="lazy">
      <div><span>${escapeHTML(item.category)}</span><strong>${escapeHTML(item.title)}</strong></div>
    </div>`).join('');

  root.innerHTML = `
    <div class="breadcrumbs" aria-label="Breadcrumb">
      <a href="index.html#top">Beranda</a><span class="separator">/</span><a href="index.html#berita">Berita</a><span class="separator">/</span><span>${escapeHTML(article.category)}</span>
    </div>
    <div class="article-layout">
      <article class="article-main">
        <header class="article-head">
          <span class="article-category">${escapeHTML(article.category)}</span>
          <h1 class="article-title">${escapeHTML(article.title)}</h1>
          <p class="article-excerpt">${escapeHTML(article.excerpt)}</p>
          <div class="article-byline">
            <span class="author-avatar" aria-hidden="true">${escapeHTML(article.authorInitials || 'I')}</span>
            <span class="author-copy"><strong>${escapeHTML(article.author)}</strong><span>Penulis</span></span>
            <span class="byline-divider" aria-hidden="true"></span>
            <span>${escapeHTML(article.published)}</span>
            <span class="byline-divider" aria-hidden="true"></span>
            <span>${Number(article.readMinutes) || 1} menit baca</span>
          </div>
        </header>
        <figure class="article-cover">
          <img src="${escapeHTML(article.image)}" alt="${escapeHTML(article.imageAlt)}" fetchpriority="high">
        </figure>
        <div class="cover-caption">${escapeHTML(article.imageCaption || '')}</div>
        <div class="article-body">
          ${renderBody(article.body)}
          <div class="article-actions">
            <div class="share-group" aria-label="Bagikan artikel">
              <span class="share-label">Bagikan berita</span>
              <button class="share-btn whatsapp" type="button" id="shareWhatsApp">WhatsApp ↗</button>
              <button class="share-btn" type="button" id="shareFacebook">Facebook ↗</button>
              <button class="share-btn" type="button" id="copyLink">Salin tautan</button>
            </div>
            <a class="back-link" href="index.html#berita">← Kembali ke berita</a>
          </div>
        </div>
        <div class="demo-note"><strong>Catatan konten demo</strong><span>Naskah ini merupakan contoh untuk menguji tampilan halaman detail. Isi berita perlu diganti atau diverifikasi oleh redaksi sebelum dipublikasikan.</span></div>
      </article>
      <aside class="article-aside">
        <section class="aside-card">
          <span class="aside-kicker">Lanjut membaca</span>
          <h2>Berita terkait</h2>
          ${related || '<p class="aside-info">Belum ada berita terkait.</p>'}
        </section>
        <section class="aside-card">
          <span class="aside-kicker">Tentang IUMAT</span>
          <h2>Info UMKM Aceh Timur</h2>
          <p class="aside-info">IUMAT menjadi ruang informasi, inspirasi, dan promosi usaha lokal. Kenali cerita dan potensi UMKM dari berbagai bidang usaha.</p>
        </section>
      </aside>
    </div>`;

  document.title = `${article.title} — IUMAT`;
  const pageUrl = window.location.href;
  const shareText = `${article.title} — IUMAT`;
  document.getElementById('shareWhatsApp').addEventListener('click', () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pageUrl)}`, '_blank', 'noopener,noreferrer');
  });
  document.getElementById('shareFacebook').addEventListener('click', () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank', 'noopener,noreferrer');
  });
  document.getElementById('copyLink').addEventListener('click', async event => {
    const button = event.currentTarget;
    try {
      await navigator.clipboard.writeText(pageUrl);
      button.textContent = 'Tautan tersalin ✓';
    } catch {
      button.textContent = 'Salin manual: pilih alamat';
    }
  });

  const toggle = document.getElementById('menuToggle');
  const navbar = document.getElementById('navbar');
  toggle.addEventListener('click', () => {
    const open = navbar.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    toggle.textContent = open ? '×' : '☰';
  });
  document.addEventListener('keydown', event => {
    if(event.key === 'Escape' && navbar.classList.contains('is-open')){
      navbar.classList.remove('is-open');
      toggle.setAttribute('aria-expanded','false');
      toggle.setAttribute('aria-label','Buka menu');
      toggle.textContent = '☰';
    }
  });
})();
