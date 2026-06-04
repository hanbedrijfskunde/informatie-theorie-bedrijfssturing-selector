# Informatie Theorie & Bedrijfssturing Selector

Interactieve visualisatie- en simulatietool die de Informatietheorie van Claude
Shannon verbindt met bedrijfskundige Edstacks over e-business, datagedreven
sturing, optimalisatie en IT-architectuur.

**Live:** https://hanbedrijfskunde.github.io/informatie-theorie-bedrijfssturing-selector/

## Lokaal draaien

**Vereisten:** Node.js 20+

```bash
npm install
npm run dev
```

De app draait dan op http://localhost:3000.

## Productie-build

```bash
npm run build      # output in dist/
npm run preview    # bekijk de build lokaal
```

## Publiceren naar GitHub Pages

Deployment gebeurt volledig automatisch via GitHub Actions
([.github/workflows/deploy.yml](.github/workflows/deploy.yml)):

1. Push naar de `main` branch.
2. De workflow bouwt de app en publiceert `dist/` naar GitHub Pages.

> **Eenmalige instelling:** ga in de GitHub repo naar **Settings → Pages** en
> zet **Source** op **GitHub Actions**.

De `base` in [vite.config.ts](vite.config.ts) staat ingesteld op de repo-naam,
zodat alle assets correct laden onder het project-subpad.
