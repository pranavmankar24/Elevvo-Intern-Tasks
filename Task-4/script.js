/* ══════════════════════════════════════════
   Meridian Blog — script.js
   Data · Rendering · Filter · Pagination
   ══════════════════════════════════════════ */

'use strict';

/* ── Config ── */
const POSTS_PER_PAGE = 6;

/* ── Blog post data ── */
const ALL_POSTS = [
  /* ── TECH ── */
  {
    id: 1,
    title: "The Quiet Revolution of Local AI",
    desc: "How running models on your own hardware is changing what privacy means for developers and curious tinkerers alike.",
    category: "Tech",
    date: "June 12, 2025",
    readTime: "6 min read",
    featured: true,
    img: "https://miro.medium.com/v2/resize:fit:2688/format:webp/1*wL8-A8IRGnIZCHoCHUF2zw.jpeg",
  },
  {
    id: 2,
    title: "In Defence of the Text File",
    desc: "Why the humble .txt still beats every note-taking app I've ever tried, and what that says about software complexity.",
    category: "Tech",
    date: "May 28, 2025",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=700&q=80",
  },
  {
    id: 3,
    title: "RSS Is Not Dead — You Just Stopped Looking",
    desc: "A love letter to the open web and the feed reader tucked away in my browser's bookmarks bar.",
    category: "Tech",
    date: "May 9, 2025",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80",
  },
  {
    id: 4,
    title: "Terminal Aesthetics: Making Your Shell Beautiful",
    desc: "From Starship prompts to Catppuccin palettes — a practical tour of the modern CLI setup.",
    category: "Tech",
    date: "April 22, 2025",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=700&q=80",
  },

  /* ── TRAVEL ── */
  {
    id: 5,
    title: "Forty-Eight Hours in Tbilisi",
    desc: "Georgia's capital moves at its own unhurried pace. Wine in clay pots, sulphur baths at dusk, and a city that never quite resolved its past.",
    category: "Travel",
    date: "June 3, 2025",
    readTime: "8 min read",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQp49jUKmvOXOu1ugVPLm_nP1Z5KyUtHYvbQ&s",
  },
  {
    id: 6,
    title: "Slow Train Through the Lao Highlands",
    desc: "The Laos–China railway opened a new corridor into the interior. I took it north and watched the mountains arrive.",
    category: "Travel",
    date: "April 14, 2025",
    readTime: "10 min read",
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=700&q=80",
  },
  {
    id: 7,
    title: "What Porto Taught Me About Wasting Time Well",
    desc: "Tiled facades, afternoon espresso, and the realisation that doing less is its own kind of productivity.",
    category: "Travel",
    date: "March 30, 2025",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=700&q=80",
  },

  /* ── FOOD ── */
  {
    id: 8,
    title: "The Perfect Bowl of Tonkotsu, at Home",
    desc: "Eighteen hours of simmering, three components that matter, and why the tare is the thing everyone ignores.",
    category: "Food",
    date: "May 19, 2025",
    readTime: "9 min read",
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=700&q=80",
  },
  {
    id: 9,
    title: "The Sourdough Diaries: Month Six",
    desc: "My starter survived a heatwave, a holiday, and one catastrophic lid-off bake. Here's where we are.",
    category: "Food",
    date: "April 30, 2025",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&q=80",
  },
  {
    id: 10,
    title: "A Fermentation Shelf Worth Taking Seriously",
    desc: "Kombucha, kimchi, miso, and one jar of mystery that turned out fine. Building a living pantry one culture at a time.",
    category: "Food",
    date: "March 15, 2025",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=700&q=80",
  },

  /* ── LIFE ── */
  {
    id: 11,
    title: "On Keeping a Paper Journal in 2025",
    desc: "Every app promised friction-free capture. A cheap notebook delivered something else: actual thinking.",
    category: "Life",
    date: "June 8, 2025",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&q=80",
  },
  {
    id: 12,
    title: "The Library As Third Place",
    desc: "Not for books, exactly — but for the particular silence that belongs to other people thinking near you.",
    category: "Life",
    date: "May 22, 2025",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80",
  },
  {
    id: 13,
    title: "Six Months Without a Smartphone",
    desc: "I expected boredom. I got boredom, then something more unexpected: attention.",
    category: "Life",
    date: "April 5, 2025",
    readTime: "11 min read",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80",
  },
];

/* ── State ── */
let currentCategory = "All";
let currentPage     = 1;

/* ── DOM refs ── */
const featuredSection = document.getElementById('featuredSection');
const postsGrid       = document.getElementById('postsGrid');
const filterPills     = document.getElementById('filterPills');
const resultsCount    = document.getElementById('resultsCount');
const prevBtn         = document.getElementById('prevBtn');
const nextBtn         = document.getElementById('nextBtn');
const pageNumbers     = document.getElementById('pageNumbers');
const headerDate      = document.getElementById('headerDate');
const mobileMenuBtn   = document.getElementById('mobileMenuBtn');
const mobileNav       = document.getElementById('mobileNav');

/* ── Helpers ── */
function getCatClass(cat) {
  return `cat-${cat.toLowerCase()}`;
}

function formatDate(str) { return str; }

function filterPosts() {
  if (currentCategory === "All") return ALL_POSTS.filter(p => !p.featured);
  return ALL_POSTS.filter(p => p.category === currentCategory && !p.featured);
}

/* ── Render featured hero post ── */
function renderFeatured() {
  const post = ALL_POSTS.find(p => p.featured);
  if (!post) return;

  featuredSection.innerHTML = `
    <article class="featured-card" role="article" aria-label="Featured post: ${post.title}">
      <div class="featured-img-wrap">
        <img src="${post.img}" alt="${post.title}" loading="lazy" />
        <div class="featured-img-overlay"></div>
      </div>
      <div class="featured-body">
        <div class="feat-meta">
          <span class="feat-eyebrow">Featured · ${post.category}</span>
          <span class="feat-sep">·</span>
          <span class="feat-date">${post.date}</span>
        </div>
        <h2 class="featured-title">${post.title}</h2>
        <p class="featured-desc">${post.desc}</p>
        <a href="#" class="featured-read">
          Read article
          <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <span class="feat-tag ${getCatClass(post.category)}" style="margin-top:auto">${post.readTime}</span>
      </div>
    </article>
  `;
}

/* ── Render one post card ── */
function createCard(post, delay = 0) {
  const article = document.createElement('article');
  article.className = 'post-card';
  article.style.animationDelay = `${delay}ms`;
  article.setAttribute('role', 'article');
  article.setAttribute('aria-label', post.title);

  article.innerHTML = `
    <div class="card-img-wrap">
      <img src="${post.img}" alt="${post.title}" loading="lazy" />
      <span class="card-cat-badge ${getCatClass(post.category)}">${post.category}</span>
    </div>
    <div class="card-body">
      <p class="card-date">${post.date}</p>
      <h3 class="card-title">${post.title}</h3>
      <p class="card-desc">${post.desc}</p>
      <div class="card-footer">
        <span class="card-read-time">${post.readTime}</span>
        <a href="#" class="card-read-link">
          Read
          <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </div>
  `;

  return article;
}

/* ── Render the grid for the current page + category ── */
function renderGrid() {
  const filtered   = filterPosts();
  const totalPosts = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));

  // Clamp page
  if (currentPage > totalPages) currentPage = totalPages;

  const start    = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = filtered.slice(start, start + POSTS_PER_PAGE);

  // Update count
  resultsCount.textContent = `${totalPosts} ${totalPosts === 1 ? 'post' : 'posts'}`;

  // Clear grid
  postsGrid.innerHTML = '';

  if (pagePosts.length === 0) {
    postsGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">✦</div>
        <h3>Nothing here yet</h3>
        <p>No posts in this category — check back soon.</p>
      </div>
    `;
  } else {
    pagePosts.forEach((post, i) => {
      postsGrid.appendChild(createCard(post, i * 60));
    });
  }

  // Update pagination
  renderPagination(totalPages);

  // Scroll to grid smoothly
  if (currentPage > 1 || currentCategory !== 'All') {
    postsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ── Render pagination controls ── */
function renderPagination(totalPages) {
  pageNumbers.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = `page-num${i === currentPage ? ' active' : ''}`;
    btn.textContent = i;
    btn.addEventListener('click', () => {
      currentPage = i;
      renderGrid();
    });
    pageNumbers.appendChild(btn);
  }

  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = currentPage >= totalPages;

  // Hide pagination if only one page
  document.getElementById('pagination').style.display =
    totalPages <= 1 ? 'none' : 'flex';
}

/* ── Filter pill click handler ── */
filterPills.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    filterPills.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentCategory = pill.dataset.cat;
    currentPage = 1;
    renderGrid();
  });
});

/* ── Prev / Next buttons ── */
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) { currentPage--; renderGrid(); }
});
nextBtn.addEventListener('click', () => {
  const filtered   = filterPosts();
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  if (currentPage < totalPages) { currentPage++; renderGrid(); }
});

/* ── Mobile menu ── */
mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  const bars = mobileMenuBtn.querySelectorAll('span');
  const isOpen = mobileNav.classList.contains('open');
  bars[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
  bars[1].style.opacity   = isOpen ? '0' : '';
  bars[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    const bars = mobileMenuBtn.querySelectorAll('span');
    bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
  });
});

/* ── Header date ── */
headerDate.textContent = new Date().toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

/* ── Header shadow on scroll ── */
window.addEventListener('scroll', () => {
  document.querySelector('.site-header').style.boxShadow =
    window.scrollY > 10 ? '0 4px 24px rgba(0,0,0,0.4)' : 'none';
}, { passive: true });

/* ── Init ── */
renderFeatured();
renderGrid();
