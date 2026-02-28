# Samyo Ghosh Portfolio

A modern, aesthetic, and responsive portfolio website with iOS-inspired glassmorphism, smooth animations, and fluid transitions.

## Highlights

- **Hero-first design** with a polished gradient backdrop and glass UI.
- **iOS-like feel** through soft blur panels, spring-like hover motion, and reveal animations.
- **Live GitHub integration** that fetches repositories and displays project cards automatically.
- **Graceful fallback content** so the page still shows projects/skills even if GitHub is unreachable or username is incorrect.
- **Auto-generated skills section** based on repository language metadata.
- **Responsive layout** that works smoothly on desktop, tablet, and mobile.

## Personal details included

- **Name:** Samyo Ghosh
- **Email:** samyoghosh2004@gmail.com
- **Phone:** Available on request

## Tech stack

- HTML5
- CSS3 (glassmorphism, transitions, keyframe animation)
- Vanilla JavaScript (GitHub API integration + dynamic UI rendering)

## Project structure

```text
.
├── index.html      # Main page structure and content sections
├── styles.css      # Visual design, animations, responsive behavior
├── script.js       # GitHub API fetch, project rendering, skill extraction
└── README.md       # Documentation
```

## How projects and skills are populated

The site calls the GitHub API endpoint:

```text
https://api.github.com/users/samyoghosh2004/repos?sort=updated&per_page=100
```

Then it:
1. Filters out forked repositories.
2. Sorts by most recently updated.
3. Displays up to 9 repositories in the **Projects** section.
4. Extracts repository `language` values and maps them into the **Skills** section.

## Run locally

From the repository root, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Customization tips

- Change GitHub username in `script.js`:

```js
githubUser = 'your-github-username';
```

- Update biography, headings, or call-to-action links in `index.html`.
- Tweak animation timing and glass effects in `styles.css`.

## Notes

- If GitHub API rate limits are hit, network is blocked, or the username returns 404, the page shows fallback projects/skills with a clear warning.
- Phone number is currently intentionally hidden as "Available on request".

