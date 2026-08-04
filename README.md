# Trailmark — Tour & Travel Website

A responsive React tour & travel site for a fictional boutique expedition-travel
company. Built for a React fundamentals assignment focused on **component
decomposition**, **props drilling**, and **CSS inside React**.

## Design concept

Trailmark plans small-group trips to off-the-beaten-path routes (Faroe Islands,
Ladakh, Atacama, etc.) rather than resort tourism, so the design leans into a
**field-journal / cartography** aesthetic instead of generic travel-site
imagery: coordinates as data, a hand-drawn dashed route in the hero, and
real day-numbers only where there's an actual sequence (the itinerary).

- **Type:** Fraunces (display serif) + Inter (body) + JetBrains Mono (coordinates/stats)
- **Palette:** parchment `#F3ECDD`, deep pine `#1E2A22`, ochre `#C68A32`, teal `#2F5D62`, taupe `#8C7A5B`
- **Signature element:** an animated SVG route map in the hero that draws itself on load

## Component structure (assignment requirements)

**Reusable components (9 total, well over the 5 required):**
`Button`, `Navbar`, `Hero`, `DestinationCard`, `DestinationGrid`,
`ItineraryStep`, `Testimonial`, `Newsletter`, `Footer`

**Props drilling demo:** the "saved trip" heart toggle. State (`favorites`)
is lifted all the way up to `App`, then drilled down through two layers of
components before it's actually used:

```
App (owns `favorites` state + `toggleFavorite`)
 └─ DestinationsSection (passes props straight through)
     └─ DestinationGrid (passes each item's own slice down)
         └─ DestinationCard (actually renders the heart button, calls back up)
```

**CSS inside React:** every component has its own co-located `.css` file
(e.g. `DestinationCard.jsx` + `DestinationCard.css`), imported directly into
that component — no global stylesheet doing the work, aside from shared
design tokens (colors, fonts, spacing) defined once in `src/index.css` as
CSS custom properties.

## Project structure

```
trailmark/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css              # design tokens + global resets
│   ├── data/                  # content, separate from components
│   │   ├── destinations.js
│   │   ├── itinerary.js
│   │   └── testimonials.js
│   └── components/
│       ├── Navbar/
│       ├── Hero/
│       ├── Button/
│       ├── DestinationCard/
│       ├── DestinationGrid/    # + DestinationsSection.jsx
│       ├── ItineraryStep/
│       ├── Itinerary/
│       ├── Testimonial/        # + TestimonialSection.jsx
│       ├── Newsletter/
│       └── Footer/
```

## Run it locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deploy

### Vercel
1. Push this repo to GitHub (see below).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Vercel auto-detects Vite — no config needed. Deploy.

### Netlify
1. Push this repo to GitHub.
2. Go to [app.netlify.com](https://app.netlify.com) → "Add new site" → "Import an existing project".
3. Build command: `npm run build`  ·  Publish directory: `dist`
4. Deploy.

## Push to GitHub

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit: Trailmark tour & travel site"
git remote add origin <your-repo-url>
git push -u origin main
```

## Notes / possible extensions

- Destination images are hotlinked from Unsplash for demo purposes — swap in
  your own assets before a real deployment.
- The newsletter form is a controlled component with local state only (no
  backend) — wire it to a real email service if needed.
- Accessibility: visible focus rings on all interactive elements, `prefers-reduced-motion`
  respected for the hero animation, alt text on all images, `aria-pressed`/`aria-label`
  on the favorite toggle.
