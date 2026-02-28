# Samyo Ghosh – Professional Portfolio Website

A job-application-focused portfolio website with modern visuals, iOS-like fluid UI, and recruiter-friendly content.

## What this portfolio includes

- Professional hero section with clear role positioning: **Full-Stack Web Developer**.
- Resume/CV download button (`RESUME.pdf`) in top navigation.
- About section with practical developer summary and career objective.
- Skills section using both static skill highlights and dynamic GitHub-derived skills.
- Projects section that loads from GitHub and falls back to curated project cards:
  - Calculator App
  - To-Do List App
  - Portfolio Website
- Contact section with direct details and a lightweight contact form UI.
- Experience & Education section to support job-application screening.

## Personal details

- **Name:** Samyo Ghosh
- **Email:** samyoghosh2004@gmail.com
- **Phone:** Available on request
- **GitHub:** https://github.com/samyoghosh2004
- **Location:** India

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub REST API

## Project structure

```text
.
├── index.html      # Main portfolio sections and content (about, skills, projects, experience, contact)
├── styles.css      # Theme, animations, responsive styling, forms
├── script.js       # GitHub projects/skills integration and fallback handling
└── README.md       # Documentation
```

## Data loading behavior

The site calls:

```text
https://api.github.com/users/samyoghosh2004/repos?sort=updated&per_page=100
```

Then it:
1. Filters out forked repositories.
2. Sorts repositories by latest update date.
3. Renders up to 9 recent repositories.
4. Enriches skill pills from repo language metadata.
5. Shows curated project cards if GitHub data is unavailable.

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Before submitting applications

- Add your real phone number in `index.html` if you want it visible.
- Place your resume file as `RESUME.pdf` in project root.
- Optionally add LinkedIn and deployment links.
- Replace the placeholder education statement with your exact college and degree details.
- Keep GitHub repositories updated for best project visibility.
