# Agentlyze

Marketing website for Agentlyze, an AI agent development studio. The site is a lightweight static build using semantic HTML, Tailwind CSS, and modular vanilla JavaScript.

## Local development

```bash
npm install
npm run dev
```

Then open the local URL printed in the terminal.

## Quality checks

```bash
npm run check
```

The checks enforce consistent formatting and validate the HTML structure and accessibility basics.

## Structure

```text
.
├── assets/images/    # Brand and page imagery
├── css/styles.css    # Site-specific styles
├── js/main.js        # Navigation, animation, and form behavior
├── index.html        # Page content and layout
└── .github/workflows # GitHub Pages deployment
```

Every push to `master` is deployed to GitHub Pages by the included workflow.
