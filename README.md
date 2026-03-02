# Samyo Ghosh – Professional Portfolio Website

A job-application-focused portfolio website with modern visuals, iOS-like fluid UI, and recruiter-friendly content.

## Updated details from resume

- **Name:** Samyo Ghosh
- **Location:** Kolkata, India
- **Phone:** +91 8240236916
- **Email:** samyoghosh2004@gmail.com
- **Education:** Netaji Subhash Engineering College (First Year, GPA 7.5)
- **Hackathons:** EY TECHATHON 4.0 (qualified till second round), TATA STEEL TomorrowLAB 2023
- **Languages:** English, Bengali, Hindi
- **Hobbies:** Fitness, Swimming, Drawing

## What this portfolio includes

- Professional hero section with clear role positioning.
- Resume/CV download button (`RESUME.pdf`) in top navigation.
- Skills section synced with resume and enriched using GitHub language data.
- Projects section that loads from GitHub and falls back to curated project cards.
- Experience section with hackathons, education, and profile highlights.
- Contact section with icons and action-ready communication details.
- Dedicated LinkedIn section with:
  - direct profile button
  - optional public badge embed support

## LinkedIn setup options

Set these constants in `script.js`:

```js
const linkedinProfileUrl = 'https://www.linkedin.com/in/your-linkedin-username/';
const linkedinVanity = 'your-linkedin-username';
```

- If `linkedinProfileUrl` is set, the profile button becomes active.
- If both are set, the LinkedIn public badge script is loaded and badge markup is rendered.

## Project structure

```text
.
├── index.html                        # Portfolio structure and content
├── styles.css                        # Modern visuals, animations, responsive styling
├── script.js                         # GitHub data loading, LinkedIn setup, contact interactions
├── scripts/check-merge-conflicts.sh  # Marker guard utility
├── .githooks/pre-commit              # Optional pre-commit hook entry
└── README.md                         # Documentation
```

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Prevent merge-conflict mistakes (recommended)

Enable repository hooks:

```bash
git config core.hooksPath .githooks
```

The pre-commit hook runs `scripts/check-merge-conflicts.sh` and blocks commits containing `<<<<<<<`, `=======`, or `>>>>>>>`.
