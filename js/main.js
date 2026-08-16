const capabilities = [
  {
    title: 'Event Operations',
    summary: 'Coordination and operational support across event preparation, on-site delivery and live execution.',
    points: ['Event-day delivery', 'Field coordination', 'Stakeholder coordination', 'Operational follow-up', 'On-site support']
  },
  {
    title: 'Player & Athlete Services',
    summary: 'Supporting players, athletes and participants through clear communication, practical assistance and coordinated event-day services.',
    points: ['Participant liaison', 'Player & athlete support', 'Arrival & on-site coordination', 'Operational requests', 'Event-day assistance']
  },
  {
    title: 'Guest & Participant Experience',
    summary: 'Supporting guests and participants through clear communication, coordinated service, smooth flows and reliable on-site delivery.',
    points: ['Guest relations', 'Participant support', 'Service delivery', 'Guest flows', 'On-site coordination']
  },
  {
    title: 'On-site Services',
    summary: 'Practical support for guests, participants and event teams, helping information, requests and services move efficiently across the venue.',
    points: ['Guest support', 'Participant assistance', 'Information coordination', 'Flow support', 'Team liaison']
  }
];

const experience = [
  {
    title: 'Red Bull BC One Algeria',
    summary: 'Athlete support, participant coordination and media assistance around live competition operations.',
    tags: ['Live Events', 'Athlete Experience', 'Media Support'],
    meta: ''
  },
  {
    title: 'Street Art & Urban Culture',
    summary: 'Artist relations, participant coordination and on-site support within street-art and urban-culture events.',
    tags: ['Culture', 'Events', 'Participant Relations'],
    meta: ''
  },
  {
    title: 'Live Event Operations',
    summary: 'Operational assignments across major festivals, fashion and luxury events, public events and exhibitions. Major Festivals — Lollapalooza, Rock en Seine: spectator flow coordination, access operations and logistical support across guest and VIP areas. Luxury & Fashion — Paris Fashion Week: set-up coordination, backstage logistics and guest flow management. Public Events & Exhibitions: access coordination, zone operations and on-site event delivery.',
    tags: ['Live Events', 'Guest Flows', 'Backstage Operations', 'VIP Operations'],
    meta: ''
  },
  {
    title: 'Combat Sports',
    summary: 'Experience across competitions, workshops, training and coaching environments, with first-hand understanding of athlete needs, preparation and event-day dynamics.',
    tags: ['Sport', 'Athlete Experience', 'Participant Support', 'Coaching'],
    meta: ''
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
    imageAlt: 'Players waiting backstage before competition.',
    author: 'Anis Allouache · Lyan Studio',
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
    imageAlt: 'Athlete seated backstage before competition.',
    author: 'Anis Allouache · Lyan Studio',
    date: 'August 13, 2026',
    readingTime: '3 min read',
    pullQuote: 'The scale changes. The underlying human problem does not.',
    body: [
      'Competition begins long before an athlete enters the public space.',
      'In combat sports, the hours before a match can involve preparation, warm-up, coaching, equipment checks, waiting periods and constant changes in intensity.',
      'The athlete is preparing to perform.',
      'The event team has a different responsibility: making sure the environment around that preparation works.',
      'This is where athlete flow becomes important.',
      'Competition and coaching environments make one thing clear: athletes do not experience an event the same way spectators do.',
      'For spectators, waiting is part of the day.',
      'For an athlete, uncertainty around timing can affect an entire preparation routine.',
      'A delayed call, unclear information or unnecessary movement between different areas may seem like small operational details. For someone preparing to compete, they become another thing to process.',
      'Good athlete operations therefore rely on three basic principles:',
      '**clear timing, clear movement and clear points of contact.**',
      'Athletes should know where they are expected, what happens next and who is responsible for communicating changes.',
      'The same principle applies whether the environment is a martial arts tournament, a fighting-game competition or another live sporting event.',
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
    image: 'assets/journal/journal-fgc-freeplay.png',
    imageAlt: 'Players gathered around fighting-game freeplay setups at a live event.',
    author: 'Anis Allouache · Lyan Studio',
    date: 'August 13, 2026',
    readingTime: '3 min read',
    pullQuote: '',
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
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.summary)}</p>
        <ul class="experience-tags">
          ${item.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}
        </ul>
      </div>
      ${item.meta ? `<p class="experience-meta">${escapeHtml(item.meta)}</p>` : ''}
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
initRevealObserver();
