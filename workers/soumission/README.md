# Proxy de soumission

Worker Cloudflare optionnel. Le site reste un export statique. Next.js ne compile pas ce dossier, et le lint l'ignore.

Le formulaire envoie un JSON à `POST /api/soumission`. Le worker vérifie les champs, puis le transmet à GoHighLevel. L'URL du webhook est le secret `GHL_WEBHOOK_URL`. Elle n'est pas dans le dépôt.

Origines acceptées : `https://transportmar.ca` et `https://www.transportmar.ca`. Les autres reçoivent un refus. `OPTIONS` répond avec les en-têtes CORS.

## Mise en place

1. Copier `wrangler.toml.example` vers `wrangler.toml` (fichier local, ignoré par git).
2. Déployer depuis ce dossier : `npx wrangler deploy`.
3. Enregistrer le secret : `npx wrangler secret put GHL_WEBHOOK_URL`.
4. Dans les variables du dépôt GitHub, mettre `SOUMISSION_ENDPOINT` à l'URL publique du worker qui se termine par `/api/soumission`.

Le prochain déploiement du site (push sur `main`) embarque cette adresse dans la page. Ce dossier ne se déploie pas tout seul.
