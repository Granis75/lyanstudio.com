const capabilities = [
  {
    title: 'Event Operations',
    summary: 'On-site coordination and operational support for events, competitions and live experiences.',
    points: ['Event logistics', 'Venue support', 'Participant flows', 'Operational coordination', 'Day-of-event support']
  },
  {
    title: 'Player & Athlete Experience',
    summary: 'Supporting athletes, players and participants before and during events.',
    points: ['Participant liaison', 'Player & athlete support', 'Schedules and on-site coordination', 'Hospitality', 'Backstage support']
  },
  {
    title: 'Guest & Partner Experience',
    summary: 'Helping guests, creators, partners and teams navigate the event smoothly.',
    points: ['Guest coordination', 'Hospitality', 'Partner support', 'On-site assistance', 'Experience management']
  },
  {
    title: 'Content & Event Coverage',
    summary: 'Documenting events, people and the culture surrounding them.',
    points: ['Photography', 'Event coverage', 'Interviews', 'Editorial content', 'Behind-the-scenes stories']
  }
];

const experience = [
  {
    title: 'Red Bull BC One Algeria',
    role: 'Event Operations & Athlete Support',
    summary: 'Event organization, athlete assistance, participant coordination and photographer/media support.',
    meta: 'Algeria · 2014–2016'
  },
  {
    title: 'Street Art & Urban Culture',
    role: 'Event Organization & Participant Relations',
    summary: 'On-site coordination, artist relations and operational support around street-art and urban-culture events in Algeria.',
    meta: 'Algeria'
  },
  {
    title: 'Event & Venue Operations',
    role: 'Paris',
    summary: 'Experience across events, venues and hospitality environments, including guest reception, crowd flows, event setup and on-site execution.',
    meta: 'Paris · 2018–2020'
  },
  {
    title: 'Competitive Sport',
    role: 'Judo',
    summary: 'National-level competitive background, 2nd Dan black belt, coaching and athlete development experience.',
    meta: 'Algeria'
  }
];

const journalCategories = [
  {
    title: 'Esports',
    summary: 'Competitions, players and the ecosystem around them.'
  },
  {
    title: 'Gaming Culture',
    summary: 'Arcades, communities, games and places.'
  },
  {
    title: 'Live Events',
    summary: 'What happens around the stage, venue and crowd.'
  },
  {
    title: 'People',
    summary: 'Players, creators, organizers and people shaping the scene.'
  }
];

const articles = [
  {
    slug: 'field-notes',
    category: 'Live Events',
    title: 'Field notes from live environments',
    excerpt: 'A working format for observations from venues, production areas, participant spaces and the moments around the stage.',
    status: 'Template'
  },
  {
    slug: 'participant-flow',
    category: 'People',
    title: 'Participant flow as experience',
    excerpt: 'How clear timings, calm handoffs and good backstage information can change the way players and guests move through an event.',
    status: 'Draft space'
  },
  {
    slug: 'coverage-culture',
    category: 'Gaming Culture',
    title: 'Documenting the culture around events',
    excerpt: 'Photography, interviews and behind-the-scenes stories as a record of the people who make live scenes feel alive.',
    status: 'Draft space'
  }
];

const articleBodies = {
  'field-notes': [
    'This template is prepared for future field reports, photography notes, event recaps and interviews.',
    'The format keeps the focus on useful context: where the event happened, who was involved, what the live environment required, and what the surrounding culture looked like.',
    'It is intentionally quiet. Lyan Studio can publish real notes here without turning them into advertising copy.'
  ],
  'participant-flow': [
    'Participant experience often depends on small operational details: clear schedules, calm arrivals, accessible information and people who know where the next handoff is.',
    'This draft space can become a practical note on player, athlete, guest or partner movement during live events.'
  ],
  'coverage-culture': [
    'Event coverage is more than recording the stage. It can include the people waiting, preparing, supporting, competing and building the atmosphere around the main moment.',
    'This draft space is ready for photography-led stories and interviews from gaming, sport and urban culture.'
  ]
};

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

function renderCapabilities() {
  const list = document.querySelector('[data-capability-list]');
  if (!list) return;

  list.innerHTML = capabilities.map((item, index) => `
    <article class="capability-card reveal">
      <p class="card-kicker">${String(index + 1).padStart(2, '0')}</p>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.summary)}</p>
      <ul>
        ${item.points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}
      </ul>
    </article>
  `).join('');
}

function renderExperience() {
  const list = document.querySelector('[data-experience-list]');
  if (!list) return;

  list.innerHTML = experience.map((item) => `
    <article class="experience-card reveal">
      <div>
        <p class="card-kicker">${escapeHtml(item.role)}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.summary)}</p>
      </div>
      <p class="experience-meta">${escapeHtml(item.meta)}</p>
    </article>
  `).join('');
}

function renderCategories() {
  const list = document.querySelector('[data-category-list]');
  if (!list) return;

  list.innerHTML = journalCategories.map((item) => `
    <article class="category-card reveal">
      <p class="card-kicker">Category</p>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.summary)}</p>
    </article>
  `).join('');
}

function renderArticles() {
  const list = document.querySelector('[data-article-list]');
  if (!list) return;

  list.innerHTML = articles.map((item) => `
    <a class="article-card reveal" href="article.html?post=${encodeURIComponent(item.slug)}">
      <div>
        <p class="article-meta">${escapeHtml(item.category)} · ${escapeHtml(item.status)}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.excerpt)}</p>
      </div>
      <span class="article-link">Open article template</span>
    </a>
  `).join('');
}

function hydrateArticlePage() {
  const articleRoot = document.querySelector('[data-article-page]');
  if (!articleRoot) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('post') || 'field-notes';
  const article = articles.find((item) => item.slug === slug) || articles[0];
  const body = articleBodies[article.slug] || articleBodies['field-notes'];

  document.title = `${article.title} — Lyan Studio Journal`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', article.excerpt);
  articleRoot.innerHTML = `
    <a class="article-back" href="index.html#journal">Journal</a>
    <p class="section-label">${escapeHtml(article.category)}</p>
    <h1>${escapeHtml(article.title)}</h1>
    <p class="article-dek">${escapeHtml(article.excerpt)}</p>
    <div class="article-body">
      ${body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
    </div>
  `;
}

function initRevealObserver() {
  const revealItems = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((el) => observer.observe(el));
}

renderCapabilities();
renderExperience();
renderCategories();
renderArticles();
hydrateArticlePage();
initRevealObserver();
