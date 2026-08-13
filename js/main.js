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

const articles = [
  {
    slug: 'player-experience',
    category: 'Esports',
    title: 'Behind Player Experience: Removing Friction Around Competition',
    deck: 'How clear movement, communication and backstage support help players focus on performance.',
    excerpt: 'Player experience is an operational layer: transport, accreditation, practice access, timing and communication all shape the day before competition begins.',
    image: 'assets/journal/journal-player-experience.png',
    imageAlt: 'Player preparing backstage beside a practice setup before competition.',
    author: 'Lyan Studio Journal',
    date: 'August 13, 2026',
    readingTime: '3 min read',
    pullQuote: 'The strongest event operations are often the least visible.',
    body: [
      'When people watch an esports tournament, they see the stage, the crowd, the broadcast and the match.',
      'Players experience something completely different.',
      'Their day can involve transport, accreditation, practice areas, media obligations, technical checks, waiting times, schedule changes and repeated movement between public and restricted spaces — all before competition begins.',
      'This is where player experience becomes an operational issue.',
      'Good player experience is not about luxury. It is about removing unnecessary friction.',
      'A player should know where to go, when to move and who to contact when something changes. Transport should make sense. Practice areas should be usable. Information should be consistent. Backstage movement should not create additional stress.',
      'None of these elements wins a match.',
      'But poorly managed operations can create distractions that have nothing to do with competition.',
      'The challenge becomes even greater at international events. Players may arrive from different countries, speak different languages and operate with different staff structures. Some travel with coaches and managers. Others arrive with a much smaller support system.',
      'Clear communication therefore matters as much as logistics.',
      'The strongest event operations are often the least visible.',
      'When participant flows work correctly, nobody talks about them. Players simply move from one stage of their day to another without having to think about the system behind it.',
      'That invisibility is part of the job.',
      'As esports continues to adopt the production standards of major sports and entertainment events, player experience should be treated as part of event infrastructure — alongside broadcast, venue operations and competition management.',
      'The goal is simple:',
      '**let players focus on playing.**',
      'Everything around them should make that easier, not harder.'
    ]
  },
  {
    slug: 'athlete-flow',
    category: 'Live Events / Sport',
    title: 'Before the Spotlight: Managing Athlete Flow in Combat Sports',
    deck: 'The unseen corridors, calls and waiting spaces that shape an athlete’s preparation before the public moment.',
    excerpt: 'Athlete flow depends on clear timing, clear movement and reliable points of contact, especially in the hours before competition.',
    image: 'assets/journal/journal-athlete-flow.png',
    imageAlt: 'Athlete in a gi seated backstage before entering a live competition area.',
    author: 'Lyan Studio Journal',
    date: 'August 13, 2026',
    readingTime: '3 min read',
    pullQuote: 'The scale changes. The underlying human problem does not.',
    body: [
      'Competition begins long before an athlete enters the public space.',
      'In combat sports, the hours before a match can involve preparation, warm-up, coaching, equipment checks, waiting periods and constant changes in intensity.',
      'The athlete is preparing to perform.',
      'The event team has a different responsibility: making sure the environment around that preparation works.',
      'This is where athlete flow becomes important.',
      'From competition experience and coaching environments, one thing becomes obvious quickly: athletes do not experience an event the same way spectators do.',
      'For spectators, waiting is part of the day.',
      'For an athlete, uncertainty around timing can affect an entire preparation routine.',
      'A delayed call, unclear information or unnecessary movement between different areas may seem like small operational details. For someone preparing to compete, they become another thing to process.',
      'Good athlete operations therefore rely on three basic principles:',
      '**clear timing, clear movement and clear points of contact.**',
      'Athletes should know where they are expected, what happens next and who is responsible for communicating changes.',
      'The same principle applies whether the environment is a martial arts tournament, a fighting-game competition or another live sporting event.',
      'The scale changes.',
      'The underlying human problem does not.',
      'There is also an important difference between controlling athletes and supporting them.',
      'Strong participant operations should not become intrusive.',
      'The objective is to create enough structure that the athlete can stop thinking about logistics.',
      'When this works, staff become reliable reference points inside an environment that can otherwise feel chaotic.',
      'That requires calm communication, awareness of timing and an understanding that different participants react differently under pressure.',
      'Live events are often judged by what happens in front of the audience.',
      'But much of the quality of an event is created somewhere else:',
      'in corridors, waiting areas, warm-up spaces and the transitions nobody sees.'
    ]
  },
  {
    slug: 'fgc-freeplay',
    category: 'Gaming Culture',
    title: 'Why Freeplay Is the Real Heart of Fighting Game Events',
    deck: 'Outside the bracket, casual setups create the conversations, rivalries and community memory around fighting-game events.',
    excerpt: 'Freeplay areas need enough structure to work, but enough openness for the community to make them its own.',
    image: 'assets/journal/journal-fgc-freeplay.svg',
    imageAlt: 'Neutral editorial image slot for fighting-game freeplay setups and community play.',
    author: 'Lyan Studio Journal',
    date: 'August 13, 2026',
    readingTime: '3 min read',
    pullQuote: 'For fighting-game events, the stage creates the highlights. Freeplay creates the community.',
    body: [
      'The main stage may produce the biggest moments of a fighting-game tournament.',
      'But it is not necessarily where the culture lives.',
      'Walk through a fighting-game event and the most interesting space can often be somewhere much less spectacular: rows of setups, players waiting for a seat, small groups watching matches and strangers asking each other one simple question:',
      '**“You want to play?”**',
      'That is freeplay.',
      'For games such as Street Fighter or Tekken, these spaces are more than additional entertainment around the tournament.',
      'They are part of the community infrastructure.',
      'A tournament bracket separates players by results.',
      'Freeplay brings them back together.',
      'A beginner can sit next to an experienced competitor. Players who only knew each other through usernames can finally meet. Matches continue without rankings, prize money or tournament pressure.',
      'This creates a particular challenge for event organizers.',
      'Freeplay needs structure, but too much structure can destroy what makes it valuable.',
      'There need to be enough setups, accessible circulation, functioning equipment and enough space for people to gather without blocking the entire venue.',
      'At the same time, the area needs to retain the feeling that anyone can sit down and play.',
      'That balance is one of the reasons fighting-game events feel different from many other esports environments.',
      'The audience is not completely separated from the competitors.',
      'Players move between competition, spectatorship and community interaction throughout the day.',
      'A professional player can lose a tournament match and, an hour later, be playing casual games a few metres away from someone attending their first major event.',
      'Those moments matter.',
      'They create conversations, rivalries, friendships and memories that cannot be programmed into a stage schedule.',
      'They are also some of the most interesting moments to document.',
      'Not because they look spectacular, but because they show what competitive gaming looks like when the broadcast cameras are somewhere else.',
      'For fighting-game events, the stage creates the highlights.',
      '**Freeplay creates the community.**'
    ]
  }
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

function inlineMarkup(value) {
  const escaped = escapeHtml(value);
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function isJournalArticlePath() {
  return /\/journal\/[^/]+\.html$/.test(window.location.pathname);
}

function assetPath(path) {
  return isJournalArticlePath() ? `../${path}` : path;
}

function articleUrl(slug) {
  return isJournalArticlePath() ? `${slug}.html` : `journal/${slug}.html`;
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

function renderArticleCards(selector = '[data-article-list]') {
  const list = document.querySelector(selector);
  if (!list) return;

  list.innerHTML = articles.map((item) => `
    <a class="article-card reveal" href="${articleUrl(item.slug)}">
      <img src="${escapeHtml(assetPath(item.image))}" alt="${escapeHtml(item.imageAlt)}" loading="eager" decoding="async" />
      <div class="article-card-body">
        <p class="article-meta">${escapeHtml(item.category)} · ${escapeHtml(item.readingTime)}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.excerpt)}</p>
      </div>
      <span class="article-link">Read article</span>
    </a>
  `).join('');
}

function renderJournalPage() {
  const list = document.querySelector('[data-journal-page-list]');
  if (!list) return;
  renderArticleCards('[data-journal-page-list]');
}

function hydrateArticlePage() {
  const articleRoot = document.querySelector('[data-article-page]');
  if (!articleRoot) return;

  const params = new URLSearchParams(window.location.search);
  const pathSlug = window.location.pathname.match(/\/journal\/([^/]+)\.html$/)?.[1];
  const slug = pathSlug || params.get('post') || articles[0].slug;
  const articleIndex = Math.max(0, articles.findIndex((item) => item.slug === slug));
  const article = articles[articleIndex] || articles[0];
  const nextArticle = articles[(articleIndex + 1) % articles.length];
  const canonicalUrl = `https://www.lyanstudio.com/${articleUrl(article.slug)}`;

  document.title = `${article.title} — Lyan Studio Journal`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', article.excerpt);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', `${article.title} — Lyan Studio Journal`);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', article.excerpt);
  document.querySelector('meta[property="og:image"]')?.setAttribute('content', `https://www.lyanstudio.com/${article.image}`);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);

  articleRoot.innerHTML = `
    <a class="article-back" href="${isJournalArticlePath() ? '../journal.html' : 'journal.html'}">Back to Journal</a>
    <header class="article-header">
      <p class="section-label">${escapeHtml(article.category)}</p>
      <h1>${escapeHtml(article.title)}</h1>
      <p class="article-dek">${escapeHtml(article.deck)}</p>
      <div class="article-byline">
        <span>${escapeHtml(article.author)}</span>
        <span>${escapeHtml(article.date)}</span>
        <span>${escapeHtml(article.readingTime)}</span>
      </div>
    </header>
    <figure class="article-figure">
      <img src="${escapeHtml(assetPath(article.image))}" alt="${escapeHtml(article.imageAlt)}" loading="eager" decoding="async" />
    </figure>
    <div class="article-body">
      ${article.body.map((paragraph, index) => {
        const pullQuote = index === Math.floor(article.body.length / 2)
          ? `<aside class="pull-quote">${escapeHtml(article.pullQuote)}</aside>`
          : '';
        return `${pullQuote}<p>${inlineMarkup(paragraph)}</p>`;
      }).join('')}
    </div>
    <aside class="related-article" aria-label="Related article">
      <p class="section-label">Next Article</p>
      <a href="${articleUrl(nextArticle.slug)}">
        <span>${escapeHtml(nextArticle.category)} · ${escapeHtml(nextArticle.readingTime)}</span>
        <strong>${escapeHtml(nextArticle.title)}</strong>
      </a>
    </aside>
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
renderArticleCards();
renderJournalPage();
hydrateArticlePage();
initRevealObserver();
