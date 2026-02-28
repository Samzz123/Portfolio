const githubUser = 'samyoghosh2004';
const repoApi = `https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=100`;

const fallbackProjects = [
  {
    name: 'Portfolio Website',
    description: 'Modern personal portfolio with smooth iOS-style UI animations and responsive design.',
    language: 'HTML',
    html_url: `https://github.com/${githubUser}`,
    updated_at: new Date().toISOString(),
  },
  {
    name: 'GitHub Projects Collection',
    description: 'A curated display of projects sourced from GitHub with clean presentation.',
    language: 'JavaScript',
    html_url: `https://github.com/${githubUser}?tab=repositories`,
    updated_at: new Date().toISOString(),
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
  const skills = new Set();
  repos.forEach((repo) => {
    const skill = normalizeSkillName(repo.language);
    if (skill) {
      skills.add(skill);
    }
  });

  skillsCloud.innerHTML = '';

  if (skills.size === 0) {
    skillsCloud.innerHTML = '<p class="error">No language data available yet.</p>';
    return;
  }

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
  warning.textContent =
    reason ??
    'Live GitHub data is temporarily unavailable, so fallback project content is shown.';

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
      if (response.status === 404) {
        throw new Error('GitHub user not found. Please verify the username in script.js.');
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    const filtered = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    if (filtered.length === 0) {
      useFallbackContent('No public repositories found yet; displaying fallback content.');
      return;
    }

    renderProjects(filtered.slice(0, 9));
    renderSkills(filtered);
  } catch (error) {
    console.error(error);
    useFallbackContent('Could not load live GitHub data right now; showing fallback content.');
  }
}

document.getElementById('year').textContent = new Date().getFullYear();
githubCta.href = `https://github.com/${githubUser}`;

loadGitHubData();
