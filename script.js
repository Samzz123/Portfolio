const githubUser = 'samyoghosh2004';
const repoApi = `https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=100`;

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

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
  });
}

function createProjectCard(repo) {
  const card = document.createElement('article');
  card.className = 'card project-card';

  card.innerHTML = `
    <h3>${repo.name}</h3>
    <p>${repo.description ?? 'No description provided for this repository yet.'}</p>
    <div class="meta">
      <span>${repo.language ?? 'Mixed stack'} • Updated ${formatDate(repo.updated_at)}</span>
      <a href="${repo.html_url}" target="_blank" rel="noreferrer">Open</a>
    </div>
  `;

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
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Bootstrap',
    'Figma',
    'Tailwind CSS',
    'Node.js',
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
  projectGrid.innerHTML = '<p class="loading">Fetching repositories from GitHub...</p>';

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

document.getElementById('year').textContent = new Date().getFullYear();
githubCta.href = `https://github.com/${githubUser}`;

loadGitHubData();


const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name')?.toString().trim() || 'there';
    formStatus.textContent = `Thanks ${name}! Please email me directly at samyoghosh2004@gmail.com.`;
    contactForm.reset();
  });
}
