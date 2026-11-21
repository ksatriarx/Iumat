
// Smart Navigation IUMAT: menu aktif mengikuti area yang sedang dibaca.
const iumatNavbar=document.getElementById('iumatNavbar');
const iumatMenuButton=document.querySelector('.menu-toggle');
function toggleIumatNav(force){const open=typeof force==='boolean'?force:!iumatNavbar.classList.contains('is-open');iumatNavbar.classList.toggle('is-open',open);iumatMenuButton.setAttribute('aria-expanded',String(open));iumatMenuButton.setAttribute('aria-label',open?'Tutup menu':'Buka menu');iumatMenuButton.textContent=open?'✕':'☰';}
const iumatNavLinks=[...document.querySelectorAll('#primaryNav a')];
function setIumatActive(id){iumatNavLinks.forEach(link=>{const active=link.dataset.navTarget===id;link.classList.toggle('is-active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')})}
iumatNavLinks.forEach(link=>link.addEventListener('click',()=>{setIumatActive(link.dataset.navTarget);toggleIumatNav(false)}));
const iumatObserved=[...new Set(iumatNavLinks.map(a=>a.dataset.navTarget).filter(id=>id&&id!=='top'))].map(id=>document.getElementById(id)).filter(Boolean);
if('IntersectionObserver' in window){const navObserver=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(visible[0])setIumatActive(visible[0].target.id)},{rootMargin:'-22% 0px -62% 0px',threshold:[0,.1,.25,.5]});iumatObserved.forEach(section=>navObserver.observe(section));}
window.addEventListener('scroll',()=>{if(window.scrollY<180)setIumatActive('top')},{passive:true});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&iumatNavbar.classList.contains('is-open')){toggleIumatNav(false);iumatMenuButton.focus()}});
window.addEventListener('resize',()=>{if(window.innerWidth>540)toggleIumatNav(false)});

// Navigasi halus dan reveal ringan untuk interaksi premium tanpa mengubah struktur konten.
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',e=>{const target=document.querySelector(link.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}}));

// Perpustakaan digital: contoh isi pratinjau; tautan PDF disiapkan untuk diisi admin.
const libraryBooks=[
 {title:'Panduan Memulai Usaha',pages:[['Mulai Usaha yang Tangguh','Setiap usaha besar berawal dari langkah kecil. Kenali kebutuhan pasar, tentukan produk yang punya nilai, lalu mulai dengan rencana sederhana yang bisa dijalankan.'],['Kenali peluang di sekitar','Amati kebiasaan calon pelanggan, dengarkan masukan, dan catat masalah yang bisa dibantu oleh produk atau layanan Anda. Mulailah dari lingkungan terdekat.'],['Susun rencana sederhana','Tentukan produk, siapa pembelinya, biaya awal, harga jual, serta cara mengenalkan produk. Rencana sederhana membantu keputusan tetap terarah.'],['Kelola keuangan usaha','Pisahkan uang pribadi dan uang usaha. Catat setiap pemasukan dan pengeluaran agar kondisi usaha mudah dipantau dan dievaluasi.'],['Bangun kepercayaan pelanggan','Jaga kualitas, berikan informasi yang jujur, dan tanggapi pertanyaan dengan ramah. Pelanggan yang puas dapat menjadi promosi terbaik.'],['Tumbuh secara bertahap','Evaluasi hasil secara berkala. Perbaiki hal yang belum berjalan, pertahankan kualitas, dan kembangkan usaha sesuai kemampuan.']]},
 {title:'Promosi Digital UMKM',pages:[['Promosi Digital untuk UMKM','Dunia digital membuka kesempatan bagi usaha lokal untuk dikenal lebih luas. Mulailah dengan kanal yang paling mudah digunakan dan sesuai dengan pelanggan.'],['Tampilkan cerita produk','Gunakan foto yang jelas, deskripsi yang jujur, dan ceritakan keunikan produk. Konten sederhana yang konsisten lebih baik daripada unggahan yang jarang.'],['Pilih kanal yang tepat','Kenali tempat pelanggan biasa mencari informasi. Gunakan media sosial, katalog digital, dan percakapan pesan untuk membangun hubungan.'],['Layani dengan cepat','Balas pertanyaan secara sopan dan jelas. Siapkan informasi harga, pilihan produk, jam layanan, serta cara pemesanan.'],['Bangun reputasi','Minta ulasan pelanggan dengan sopan dan tanggapi masukan sebagai bahan perbaikan. Jaga konsistensi pelayanan.'],['Ukur hasil promosi','Catat pertanyaan masuk, pesanan, dan konten yang paling menarik perhatian. Gunakan hasilnya untuk menyusun langkah berikutnya.']]},
 {title:'Kemasan Produk Menarik',pages:[['Kemasan & Identitas Produk','Kemasan bukan hanya pembungkus. Ia membantu menjaga produk, memberi informasi, dan membangun kesan pertama yang mudah diingat.'],['Utamakan fungsi','Pilih bahan yang aman dan sesuai karakter produk. Pastikan kemasan mudah dibawa, disimpan, dan melindungi isi.'],['Buat identitas konsisten','Gunakan nama, logo, dan warna yang mudah dikenali. Informasi penting seperti komposisi atau kontak perlu terbaca jelas.'],['Tampilkan keunikan lokal','Cerita bahan, proses, atau inspirasi daerah dapat menjadi nilai tambah yang membedakan produk.'],['Sesuaikan biaya','Kemasan yang baik tidak harus mahal. Hitung biaya per unit dan uji beberapa pilihan sebelum memproduksi dalam jumlah besar.'],['Dengarkan pelanggan','Perhatikan komentar pelanggan tentang kemasan. Lakukan perbaikan kecil secara berkala agar produk makin nyaman digunakan.']]}
];
const bookModal=document.getElementById('bookModal'),bookLeft=document.getElementById('bookLeft'),bookRight=document.getElementById('bookRight'),
 bookSpread=document.getElementById('bookSpread'),bookLeaf=document.getElementById('bookLeaf'),leafFront=document.getElementById('leafFront'),
 leafBack=document.getElementById('leafBack'),castR=document.getElementById('castR'),castL=document.getElementById('castL');
let activeBook=0,activePage=0,flip=null,rafId=0,drag=null;
const BOOK_FILLER=['Sampai Jumpa','Terima kasih telah membaca. Terus belajar, bertumbuh, dan dukung usaha lokal Aceh Timur.'];
const SHADE='<i class="leaf-shade"></i>';
const escHTML=t=>String(t).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function pageHTML(i,side){
 const pages=libraryBooks[activeBook].pages;
 const pg=i<0?null:(i<pages.length?pages[i]:BOOK_FILLER);if(!pg)return '';
 const left=side==='left',h=left?'h2':'h3';
 return '<span class="page-mark">'+(left?'IUMAT · INFO UMKM ACEH TIMUR':'CATATAN & PANDUAN')+'</span><'+h+'>'+escHTML(pg[0])+'</'+h+'><p>'+escHTML(pg[1])+'</p><span class="page-no">'+String(i+1).padStart(2,'0')+'</span>';
}
function renderBook(){
 const b=libraryBooks[activeBook],last=b.pages.length-2;
 bookLeft.innerHTML=pageHTML(activePage,'left');bookRight.innerHTML=pageHTML(activePage+1,'right');
 document.getElementById('bookModalTitle').textContent=b.title;
 document.getElementById('bookPageIndicator').textContent=(activePage/2+1)+' / '+Math.ceil(b.pages.length/2);
 document.getElementById('bookPrev').disabled=activePage<=0;document.getElementById('bookNext').disabled=activePage>=last;
}
function setLeaf(theta,py){
 const s=Math.sin(theta*Math.PI/180),tilt=((py==null?.5:py)-.5)*-7*s;
 bookLeaf.style.transform='rotateX('+tilt.toFixed(2)+'deg) rotateY('+(-theta).toFixed(2)+'deg)';
 bookLeaf.style.setProperty('--shade',(s*.42).toFixed(3));
 castR.style.opacity=theta<90?(s*.95).toFixed(3):0;castL.style.opacity=theta>=90?(s*.95).toFixed(3):0;
}
function beginFlip(dir){
 const last=libraryBooks[activeBook].pages.length-2,ap=activePage;
 if(flip||(dir>0&&ap>=last)||(dir<0&&ap<=0))return false;
 if(dir>0){leafFront.innerHTML=pageHTML(ap+1,'right')+SHADE;leafBack.innerHTML=pageHTML(ap+2,'left')+SHADE;bookRight.innerHTML=pageHTML(ap+3,'right')}
 else{leafFront.innerHTML=pageHTML(ap-1,'right')+SHADE;leafBack.innerHTML=pageHTML(ap,'left')+SHADE;bookLeft.innerHTML=pageHTML(ap-2,'left')}
 flip={dir:dir,theta:dir>0?0:180};
 bookLeaf.style.display='block';setLeaf(flip.theta,.5);return true;
}
function endFlip(done){
 const dir=flip.dir;if(done)activePage+=2*dir;
 flip=null;bookLeaf.style.display='none';castR.style.opacity=0;castL.style.opacity=0;renderBook();
}
function animateFlip(target,baseMs,py){
 cancelAnimationFrame(rafId);
 const from=flip.theta,dir=flip.dir,done=(dir>0&&target===180)||(dir<0&&target===0),t0=performance.now();
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const dur=reduce?1:Math.max(240,baseMs*Math.abs(target-from)/180);
 const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
 const step=now=>{const t=Math.min(1,(now-t0)/dur);flip.theta=from+(target-from)*ease(t);setLeaf(flip.theta,py);
  if(t<1)rafId=requestAnimationFrame(step);else endFlip(done)};
 rafId=requestAnimationFrame(step);
}
function startFlip(dir){if(beginFlip(dir))animateFlip(dir>0?180:0,760,.5)}
function turnBook(step){if(sfHost.style.display==='block'){if(sf){if(step>0)sf.flipNext();else sf.flipPrev()}return}startFlip(step>0?1:-1)}
let sf=null,sfToken=0;
const sfHost=document.getElementById('sfHost'),bookStageEl=document.querySelector('.book-stage');
function destroySF(){if(sf){try{sf.destroy()}catch(_){}sf=null}sfHost.querySelectorAll('.sf-book').forEach(n=>n.remove())}
function showCustomBook(){destroySF();sfHost.style.display='none';bookStageEl.style.display='';renderBook()}
function updateSF(idx){
 const total=sf.getPageCount(),n=total-2;
 document.getElementById('bookPageIndicator').textContent=idx<=0?'Sampul':(idx>=total-1?'Akhir':'Hal. '+Math.min(idx,n)+' / '+n);
 document.getElementById('bookPrev').disabled=idx<=0;document.getElementById('bookNext').disabled=idx>=total-1;
}
function coverEl(kind){
 const b=libraryBooks[activeBook],d=document.createElement('div');
 d.className='sf-page sf-cover c'+(activeBook+1);d.setAttribute('data-density','hard');
 d.innerHTML=kind==='front'
  ?'<div class="sf-cover-in"><small>IUMAT · INFO UMKM ACEH TIMUR</small><strong>'+escHTML(b.title)+'</strong><em>Perpustakaan Digital</em></div>'
  :'<div class="sf-cover-in"><small>TERIMA KASIH TELAH MEMBACA</small><strong>IUMAT</strong><em>Info UMKM Aceh Timur</em></div>';
 return d;
}
function initSF(){
 destroySF();bookStageEl.style.display='none';sfHost.style.display='block';
 const b=libraryBooks[activeBook],el=document.createElement('div');el.className='sf-book';
 document.getElementById('bookModalTitle').textContent=b.title;
 el.appendChild(coverEl('front'));
 b.pages.forEach((pg,i)=>{const d=document.createElement('div');d.className='sf-page';d.innerHTML='<div class="sf-inner">'+pageHTML(i,i%2===0?'left':'right')+'</div>';el.appendChild(d)});
 el.appendChild(coverEl('back'));
 sfHost.insertBefore(el,sfHost.firstChild);
 const token=++sfToken;
 setTimeout(()=>{
  if(token!==sfToken||!bookModal.classList.contains('open'))return;
  try{
   sf=new St.PageFlip(el,{width:360,height:470,size:'stretch',minWidth:240,maxWidth:520,minHeight:320,maxHeight:700,
    showCover:true,usePortrait:true,flippingTime:850,maxShadowOpacity:.55,drawShadow:true,startPage:0});
   sf.on('flip',e=>updateSF(e.data));
   (sf.loadFromHTML||sf.loadFromHtml).call(sf,el.querySelectorAll('.sf-page'));
   updateSF(0);
  }catch(err){console.warn('StPageFlip gagal dimuat, memakai efek bawaan.',err);showCustomBook()}
 },60);
}
function openBook(i){cancelAnimationFrame(rafId);flip=null;drag=null;bookLeaf.style.display='none';activeBook=i;activePage=0;bookModal.classList.add('open');document.body.style.overflow='hidden';document.getElementById('bookClose').focus();if(window.St&&window.St.PageFlip)initSF();else showCustomBook();}
function closeBook(){cancelAnimationFrame(rafId);flip=null;drag=null;sfToken++;destroySF();bookLeaf.style.display='none';bookModal.classList.remove('open');document.body.style.overflow='';}
document.querySelectorAll('.library-book').forEach(btn=>btn.addEventListener('click',()=>openBook(Number(btn.dataset.book))));
document.getElementById('bookClose').addEventListener('click',closeBook);
bookModal.addEventListener('click',e=>{if(e.target===bookModal)closeBook()});
document.addEventListener('keydown',e=>{if(!bookModal.classList.contains('open'))return;if(e.key==='Escape')closeBook();else if(e.key==='ArrowRight')turnBook(1);else if(e.key==='ArrowLeft')turnBook(-1)});

// Geser halaman dengan tangan: tepi halaman mengikuti posisi jari/mouse secara langsung.
bookSpread.addEventListener('pointerdown',e=>{
 if((e.pointerType==='mouse'&&e.button!==0)||flip)return;
 const r=bookSpread.getBoundingClientRect(),mid=r.left+r.width/2,last=libraryBooks[activeBook].pages.length-2;
 let dir=e.clientX>mid?1:-1;if((dir>0&&activePage>=last)||(dir<0&&activePage<=0))dir=0;
 drag={dir:dir,startX:e.clientX,startY:e.clientY,t:e.timeStamp,mid:mid,W:r.width/2,rect:r,started:false,grabOff:0,py:.5,samples:[[e.clientX,e.timeStamp]]};
});
bookSpread.addEventListener('pointermove',e=>{
 if(!drag||!drag.dir)return;
 const dx=e.clientX-drag.startX;
 if(!drag.started){
  if(Math.abs(dx)<6)return;
  if((drag.dir>0&&dx>0)||(drag.dir<0&&dx<0)){drag=null;return}
  if(!beginFlip(drag.dir)){drag=null;return}
  drag.started=true;drag.grabOff=drag.startX-(drag.mid+drag.dir*drag.W);
  try{bookSpread.setPointerCapture(e.pointerId)}catch(_){}
 }
 const edge=e.clientX-drag.grabOff,c=Math.max(-1,Math.min(1,(edge-drag.mid)/drag.W));
 flip.theta=Math.acos(c)*180/Math.PI;
 drag.py=Math.max(0,Math.min(1,(e.clientY-drag.rect.top)/drag.rect.height));
 setLeaf(flip.theta,drag.py);
 drag.samples.push([e.clientX,e.timeStamp]);if(drag.samples.length>6)drag.samples.shift();
});
function endBookDrag(e){
 if(!drag)return;const d=drag;drag=null;
 if(!d.started){
  if(e.type==='pointerup'&&d.dir&&Math.abs(e.clientX-d.startX)<6&&Math.abs(e.clientY-d.startY)<6&&e.timeStamp-d.t<350)startFlip(d.dir);
  return;
 }
 const sm=d.samples,f=sm[0],l=sm[sm.length-1],vx=(l[0]-f[0])/Math.max(1,l[1]-f[1]);
 const complete=d.dir>0?(flip.theta>90||vx<-.45):(flip.theta<90||vx>.45);
 animateFlip(complete?(d.dir>0?180:0):(d.dir>0?0:180),620,d.py);
}
bookSpread.addEventListener('pointerup',endBookDrag);bookSpread.addEventListener('pointercancel',endBookDrag);
document.getElementById('bookPrev').addEventListener('click',()=>turnBook(-1));document.getElementById('bookNext').addEventListener('click',()=>turnBook(1));

const search=document.getElementById('cari-umkm'),cat=document.getElementById('filter-kategori'),district=document.getElementById('filter-kecamatan');
function filterBusinesses(){let q=search.value.toLowerCase(),c=cat.value,d=district.value,shown=0;document.querySelectorAll('.business-card').forEach(card=>{let ok=card.dataset.name.includes(q)&&(!c||card.dataset.category===c)&&(!d||card.dataset.district===d);card.style.display=ok?'':'none';if(ok)shown++});document.getElementById('empty-state').style.display=shown?'none':'block'}
[search,cat,district].forEach(el=>el.addEventListener('input',filterBusinesses));

// Slider berita utama IUMAT: autoplay santai, tombol, indikator, dan swipe mobile.
const heroSlides=[
 {image:'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85',alt:'Pelaku usaha berdiskusi di ruang kerja',tag:'Sorotan IUMAT',title:'UMKM Lokal, Kekuatan Ekonomi yang Tumbuh dari Aceh Timur',slug:'umkm-lokal-kekuatan-ekonomi-aceh-timur',meta:'Redaksi IUMAT &nbsp;•&nbsp; 21 November 2026 &nbsp;•&nbsp; 5 menit baca'},
 {image:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85',alt:'Aneka roti dan kue',tag:'Kuliner',title:'Ragam Kuliner Lokal yang Punya Peluang Pasar',slug:'ragam-kuliner-lokal-peluang-pasar',meta:'Redaksi IUMAT &nbsp;•&nbsp; 21 November 2026 &nbsp;•&nbsp; 4 menit baca'},
 {image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',alt:'Produk lokal dan aksesori',tag:'Produk Lokal',title:'Kreativitas Produk Daerah Menjangkau Pasar Lebih Luas',slug:'kreativitas-produk-daerah-pasar-luas',meta:'Redaksi IUMAT &nbsp;•&nbsp; 20 November 2026 &nbsp;•&nbsp; 4 menit baca'}
];
const heroZone=document.getElementById('heroZone'),hero=document.getElementById('iumatHero'),heroImage=document.getElementById('heroImage'),heroDots=[...document.querySelectorAll('.hero-controls .dot')];
let heroIndex=0,heroTimer,heroStartX=0;
function restartHeroMotion(){const motionClass='kenburns-'+(heroIndex+1);heroImage.classList.remove('kenburns-1','kenburns-2','kenburns-3');void heroImage.offsetWidth;heroImage.classList.add(motionClass)}
function syncHeroArticleLink(){
 const title=document.getElementById('heroTitle');
 const item=heroSlides[heroIndex];
 title.textContent='';
 const link=document.createElement('a');
 link.className='hero-detail-title-link';
 link.href='berita.html?slug='+encodeURIComponent(item.slug);
 link.textContent=item.title;
 link.setAttribute('aria-label','Baca berita lengkap: '+item.title);
 title.appendChild(link);
 hero.classList.add('has-detail-link');
 hero.setAttribute('aria-label','Berita utama IUMAT. Klik untuk membaca berita lengkap.');
}
restartHeroMotion();
syncHeroArticleLink();
hero.addEventListener('click',event=>{
 if(event.target.closest('button,a'))return;
 window.location.href='berita.html?slug='+encodeURIComponent(heroSlides[heroIndex].slug);
});
function showHero(index){heroIndex=(index+heroSlides.length)%heroSlides.length;const item=heroSlides[heroIndex];heroZone.classList.add('is-changing');setTimeout(()=>{heroImage.onload=()=>{restartHeroMotion();heroZone.classList.remove('is-changing');heroImage.onload=null};heroImage.src=item.image;heroImage.alt=item.alt;document.getElementById('heroTag').textContent=item.tag;syncHeroArticleLink();document.getElementById('heroMeta').innerHTML=item.meta;if(heroImage.complete){restartHeroMotion();heroZone.classList.remove('is-changing')}},420);heroDots.forEach((dot,i)=>{dot.classList.toggle('active',i===heroIndex);if(i===heroIndex)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current')});const bar=document.getElementById('heroProgress');bar.style.transition='none';bar.style.width='0';requestAnimationFrame(()=>requestAnimationFrame(()=>{bar.style.transition='width 7s linear';bar.style.width='100%'}));}
function startHero(){clearInterval(heroTimer);heroTimer=setInterval(()=>showHero(heroIndex+1),7000)}
document.getElementById('heroPrev').addEventListener('click',()=>{showHero(heroIndex-1);startHero()});document.getElementById('heroNext').addEventListener('click',()=>{showHero(heroIndex+1);startHero()});heroDots.forEach(dot=>dot.addEventListener('click',()=>{showHero(Number(dot.dataset.slide));startHero()}));hero.addEventListener('mouseenter',()=>clearInterval(heroTimer));hero.addEventListener('mouseleave',startHero);hero.addEventListener('touchstart',e=>{heroStartX=e.changedTouches[0].clientX},{passive:true});hero.addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-heroStartX;if(Math.abs(delta)>45){showHero(heroIndex+(delta<0?1:-1));startHero()}},{passive:true});startHero();

// Slider Top 10 berita hangat: dua kartu tampil sekaligus, loop tanpa batas.
const hotStories=[
 {image:'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=700&q=85',alt:'Aneka roti dan kue',tag:'Kuliner',title:'Ragam Kuliner Lokal yang Punya Peluang Pasar',slug:'ragam-kuliner-lokal-peluang-pasar',meta:'21 Nov 2026'},
 {image:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=85',alt:'Produk lokal dan aksesori',tag:'Produk Lokal',title:'Kreativitas Produk Daerah Menjangkau Pasar Lebih Luas',slug:'kreativitas-produk-daerah-pasar-luas',meta:'20 Nov 2026'},
 {image:'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=85',alt:'Aktivitas memasak',tag:'UMKM',title:'Peluang Usaha Kuliner Rumahan Terus Menarik Perhatian',slug:'peluang-usaha-kuliner-rumahan',meta:'19 Nov 2026'},
 {image:'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=85',alt:'Hasil pertanian segar',tag:'Pertanian',title:'Produk Hasil Bumi Lokal Berpeluang Naik Kelas',slug:'produk-hasil-bumi-lokal-peluang-naik-kelas',meta:'18 Nov 2026'},
 {image:'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=700&q=80',alt:'Kerajinan tangan',tag:'Kerajinan',title:'Karya Kreatif Perajin Lokal Menjangkau Pasar Baru',slug:'karya-kreatif-perajin-lokal-pasar-baru',meta:'17 Nov 2026'},
 {image:'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=700&q=80',alt:'Kopi disajikan',tag:'Kopi & Minuman',title:'Potensi Kopi dan Minuman Lokal Jadi Daya Tarik',slug:'potensi-kopi-minuman-lokal',meta:'16 Nov 2026'},
 {image:'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=700&q=80',alt:'Transaksi di toko',tag:'Bisnis',title:'Strategi Pelayanan untuk Menjaga Kepercayaan Pembeli',slug:'strategi-pelayanan-pelanggan-kepercayaan-pembeli',meta:'15 Nov 2026'},
 {image:'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=700&q=80',alt:'Diskusi tim usaha',tag:'Ekonomi',title:'Kolaborasi Membuka Peluang Baru bagi Pelaku UMKM',slug:'kolaborasi-jejaring-peluang-usaha-kecil',meta:'14 Nov 2026'},
 {image:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=85',alt:'Catatan perencanaan bisnis',tag:'Tips UMKM',title:'Langkah Sederhana Menata Identitas Produk Usaha',slug:'langkah-sederhana-menata-identitas-kemasan-produk-umkm',meta:'13 Nov 2026'},
 {image:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=80',alt:'Pembayaran digital',tag:'Digitalisasi',title:'Pembayaran Digital Memudahkan Transaksi Usaha Kecil',slug:'pembayaran-digital-transaksi-usaha-kecil',meta:'12 Nov 2026'}
];
let hotIndex=0,hotTimer,hotTouchX=0;
const hotCards=[...document.querySelectorAll('.hot-card')],hotCache={};let hotDir=1,hotToken=0;
function loadHotImage(src){return new Promise(res=>{let c=hotCache[src];if(c&&c.complete)return res();if(!c){c=new Image();c.src=src;hotCache[src]=c}c.addEventListener('load',res,{once:true});c.addEventListener('error',res,{once:true});setTimeout(res,900)})}
function fillHot(slot,item,rank){const card=hotCards[slot];card.dataset.articleSlug=item.slug;card.setAttribute('aria-label','Baca berita: '+item.title);const img=document.getElementById('hotImage'+slot);img.src=item.image;img.alt=item.alt;document.getElementById('hotTag'+slot).textContent=item.tag;document.getElementById('hotTitle'+slot).textContent=item.title;document.getElementById('hotMeta'+slot).textContent=item.meta;document.getElementById('hotRank'+slot).textContent=String(rank+1).padStart(2,'0')}
function renderHot(initial){
 const token=++hotToken,dir=hotDir;
 document.getElementById('hotPosition').textContent=String(hotIndex+1).padStart(2,'0')+'–'+String((hotIndex+1)%10+1).padStart(2,'0')+' / 10';
 hotCards.forEach((card,slot)=>{
  const rank=(hotIndex+slot)%hotStories.length,item=hotStories[rank];
  if(initial){fillHot(slot,item,rank);return}
  const delay=slot*90;
  card.style.setProperty('--hot-delay',delay+'ms');
  card.style.setProperty('--hot-x',(dir>0?-22:22)+'px');
  card.classList.add('is-changing');
  Promise.all([loadHotImage(item.image),new Promise(r=>setTimeout(r,330+delay))]).then(()=>{
   if(token!==hotToken)return;
   fillHot(slot,item,rank);
   card.style.setProperty('--hot-x',(dir>0?22:-22)+'px');
   card.style.transition='none';void card.offsetWidth;card.style.transition='';
   card.classList.remove('is-changing');
  });
 });
 for(let k=2;k<4;k++){const nx=hotStories[(hotIndex+k)%hotStories.length],pv=hotStories[(hotIndex-k+hotStories.length)%hotStories.length];[nx,pv].forEach(x=>{if(!hotCache[x.image]){const im=new Image();im.src=x.image;hotCache[x.image]=im}})}
}
function moveHot(step){hotDir=step>0?1:-1;hotIndex=(hotIndex+step+hotStories.length)%hotStories.length;renderHot()}
function startHot(){clearInterval(hotTimer);hotTimer=setInterval(()=>moveHot(1),6500)}
document.getElementById('hotPrev').addEventListener('click',()=>{moveHot(-1);startHot()});document.getElementById('hotNext').addEventListener('click',()=>{moveHot(1);startHot()});document.getElementById('hotWindow').addEventListener('mouseenter',()=>clearInterval(hotTimer));document.getElementById('hotWindow').addEventListener('mouseleave',startHot);document.getElementById('hotWindow').addEventListener('touchstart',e=>{hotTouchX=e.changedTouches[0].clientX},{passive:true});document.getElementById('hotWindow').addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-hotTouchX;if(Math.abs(dx)>35){moveHot(dx<0?1:-1);startHot()}},{passive:true});renderHot(true);startHot();

// Hubungkan kartu Berita Pilihan dan Berita Terkini ke artikel berdasarkan slug.
const featuredCardSlugs=[
 'potensi-usaha-kuliner-rumahan-tren-produk-lokal',
 'langkah-sederhana-menata-identitas-kemasan-produk-umkm',
 'kreativitas-keterampilan-modal-usaha-berdaya-saing',
 'produk-hasil-bumi-lokal-pengolahan-bernilai-tambah'
];
document.querySelectorAll('#berita .cards .card').forEach((card,index)=>{
 const slug=featuredCardSlugs[index];
 if(slug){card.dataset.articleSlug=slug;card.setAttribute('aria-label','Baca berita: '+card.querySelector('h3').textContent.trim())}
});
const latestCardSlugs=[
 'strategi-pelayanan-pelanggan-kepercayaan-pembeli',
 'kolaborasi-jejaring-peluang-usaha-kecil',
 'kemudahan-pembayaran-digital-bagi-pelaku-umkm'
];
document.querySelectorAll('#terkini .latest-list .latest-item').forEach((card,index)=>{
 const slug=latestCardSlugs[index];
 if(slug){card.dataset.articleSlug=slug;card.setAttribute('aria-label','Baca berita: '+card.querySelector('h3').textContent.trim())}
});
function enableArticleCardNavigation(){
 document.querySelectorAll('[data-article-slug]').forEach(card=>{
  card.setAttribute('role','link');card.setAttribute('tabindex','0');
  if(card.dataset.articleNavigationReady==='true')return;
  card.dataset.articleNavigationReady='true';
  const navigate=()=>{const slug=card.dataset.articleSlug;if(slug)window.location.href='berita.html?slug='+encodeURIComponent(slug)};
  card.addEventListener('click',event=>{if(event.target.closest('button,a'))return;navigate()});
  card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();navigate()}});
 });
}
enableArticleCardNavigation();



// Hero: ukur tinggi header+navigasi agar foto full-bleed berada di belakangnya; header jadi solid saat digulir.
const iumatTop=document.querySelector('.site-top');
function syncTopHeight(){document.documentElement.style.setProperty('--top-h',iumatTop.offsetHeight+'px')}
function syncTopSolid(){iumatTop.classList.toggle('is-solid',window.scrollY>40)}
syncTopHeight();syncTopSolid();
window.addEventListener('load',syncTopHeight);window.addEventListener('resize',syncTopHeight);window.addEventListener('scroll',syncTopSolid,{passive:true});
if('ResizeObserver' in window)new ResizeObserver(syncTopHeight).observe(iumatTop);
