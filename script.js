const githubUser = 'samyoghosh2004';
const repoApi = `https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=100`;

const linkedinProfileUrl = 'https://www.linkedin.com/in/your-linkedin-username/';
const linkedinVanity = 'your-linkedin-username';

const fallbackProjects = [
  {
    name: 'Calculator App',
    description:
      'A clean calculator application focused on intuitive interactions, responsive layout, and reliable arithmetic operations.',
    language: 'JavaScript',
    html_url: `https://github.com/${githubUser}?tab=repositories`,
    updated_at: '2026-01-15T12:00:00Z',
  },
  {
    name: 'To-Do List App',
    description:
      'Task management app with add/edit/delete workflow and user-friendly interface for daily productivity.',
    language: 'JavaScript',
    html_url: `https://github.com/${githubUser}?tab=repositories`,
    updated_at: '2025-12-20T12:00:00Z',
  },
  {
    name: 'Portfolio Website',
    description:
      'A modern full-stack portfolio style interface featuring smooth iOS-inspired animations and glassmorphism UI.',
    language: 'HTML',
    html_url: `https://github.com/${githubUser}`,
    updated_at: '2025-11-02T12:00:00Z',
  },
];

const projectGrid = document.getElementById('project-grid');
const skillsCloud = document.getElementById('skills-cloud');
const githubCta = document.getElementById('github-cta');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const linkedinCta = document.getElementById('linkedin-cta');
const linkedinProfileLink = document.getElementById('linkedin-profile-link');
const linkedinBadgeRoot = document.getElementById('linkedin-badge-root');
const linkedinNote = document.getElementById('linkedin-note');

function setupRevealAnimations() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
}

function setupLinkedIn() {
  if (!linkedinProfileLink || !linkedinNote) {
    return;
  }

  const hasRealLinkedIn = !linkedinProfileUrl.includes('your-linkedin-username');

  if (hasRealLinkedIn) {
    linkedinProfileLink.href = linkedinProfileUrl;
    if (linkedinCta) {
      linkedinCta.href = linkedinProfileUrl;
      linkedinCta.target = '_blank';
      linkedinCta.rel = 'noreferrer';
    }
    linkedinNote.textContent = 'LinkedIn profile configured. Public badge loads below if vanity username is set.';
  } else {
    linkedinProfileLink.href = '#';
    linkedinProfileLink.setAttribute('aria-disabled', 'true');
    linkedinProfileLink.classList.add('is-disabled');
    linkedinNote.textContent = 'Add your LinkedIn URL in script.js (linkedinProfileUrl) to enable direct profile link.';
  }

  const hasVanity = !linkedinVanity.includes('your-linkedin-username');
  if (!hasVanity || !linkedinBadgeRoot) {
    return;
  }

  linkedinBadgeRoot.innerHTML = `
    <div
      class="badge-base LI-profile-badge"
      data-locale="en_US"
      data-size="large"
      data-theme="light"
      data-type="VERTICAL"
      data-vanity="${linkedinVanity}"
      data-version="v1"
    >
      <a class="badge-base__link LI-simple-link" href="${linkedinProfileUrl}" target="_blank" rel="noreferrer">
        View LinkedIn Badge
      </a>
    </div>
  `;

  const script = document.createElement('script');
  script.src = 'https://platform.linkedin.com/badges/js/profile.js';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return 'recently';
  }
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
  });
}

function createProjectCard(repo) {
  const card = document.createElement('article');
  card.className = 'card project-card';

  const title = document.createElement('h3');
  title.textContent = repo.name;

  const description = document.createElement('p');
  description.textContent = repo.description ?? 'No description provided for this repository yet.';

  const meta = document.createElement('div');
  meta.className = 'meta';

  const info = document.createElement('span');
  info.textContent = `${repo.language ?? 'Mixed stack'} • Updated ${formatDate(repo.updated_at)}`;

  const link = document.createElement('a');
  link.href = repo.html_url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Open';

  meta.append(info, link);
  card.append(title, description, meta);

  return card;
}

function normalizeSkillName(language) {
  if (!language) {
    return null;
  }
  const map = {
    'Jupyter Notebook': 'Data Science / Jupyter',
    TypeScript: 'TypeScript',
    JavaScript: 'JavaScript',
    HTML: 'HTML',
    CSS: 'CSS',
    Python: 'Python',
    C: 'C',
    'C++': 'C++',
    Java: 'Java',
  };

  return map[language] ?? language;
}

function renderProjects(repos) {
  projectGrid.innerHTML = '';
  repos.forEach((repo) => {
    projectGrid.appendChild(createProjectCard(repo));
  });
}

function renderSkills(repos) {
  const skills = new Set([
    'Python',
    'C',
    'HTML',
    'CSS',
    'VS Code',
    'Adobe Illustrator',
    'Figma',
    'Git',
  ]);

  repos.forEach((repo) => {
    const skill = normalizeSkillName(repo.language);
    if (skill) {
      skills.add(skill);
    }
  });

  skillsCloud.innerHTML = '';

  [...skills].sort().forEach((skill) => {
    const pill = document.createElement('span');
    pill.className = 'skill-pill';
    pill.textContent = skill;
    skillsCloud.appendChild(pill);
  });
}

function useFallbackContent(reason) {
  renderProjects(fallbackProjects);
  renderSkills(fallbackProjects);

  const warning = document.createElement('p');
  warning.className = 'error';
  warning.textContent = reason ?? 'Live GitHub data is unavailable, so curated project highlights are shown.';

  projectGrid.prepend(warning);
}

async function loadGitHubData() {
  projectGrid.innerHTML = '<p class="loading" role="status" aria-live="polite">Fetching repositories from GitHub...</p>';

  try {
    const response = await fetch(repoApi, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    const filtered = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    if (filtered.length === 0) {
      useFallbackContent('No public repositories found yet; showing curated projects.');
      return;
    }

    renderProjects(filtered.slice(0, 9));
    renderSkills(filtered);
  } catch (error) {
    console.error(error);
    useFallbackContent('Could not load live GitHub data right now; showing curated projects instead.');
  }
}

function setupContactForm() {
  if (!contactForm || !formStatus) {
    return;
  }

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name')?.toString().trim() || 'there';
    formStatus.textContent = `Thanks ${name}! Please email me directly at samyoghosh2004@gmail.com or call +91 8240236916.`;
    contactForm.reset();
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
if (githubCta) {
  githubCta.href = `https://github.com/${githubUser}`;
}

setupRevealAnimations();
setupLinkedIn();
setupContactForm();
loadGitHubData();
