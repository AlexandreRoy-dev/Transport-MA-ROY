# Transport M-A Roy

Site: https://transport.roymarketing.ca

Bilingual (FR-CA default / EN) marketing site for Transport M-A Roy inc. Sale and rental of 20' and 40' shipping containers in the Eastern Townships.

GitHub Pages serves the exported Next.js files (`index.html`, `/fr`, `/en`). This README is not the website.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). French is the default locale (`/fr`). English lives at `/en`.

## Replace later

- Contact details in `messages/fr.json` and `messages/en.json` (`contact.phone`, `contact.email`)
- Logo in `public/brand/`
- Photography in `public/media/`

## Stack

Next.js App Router, Tailwind CSS v4, next-intl, scroll-triggered motion.
