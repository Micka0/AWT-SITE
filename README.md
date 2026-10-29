# Africa Wave Technology : site Next.js + Tailwind CSS

Site vitrine dynamique d’AWT : Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript.

## Démarrer

```bash
npm install
cp .env.example .env.local      # puis renseignez les valeurs (voir plus bas)
npm run dev                     # http://localhost:3000
npm run build && npm start      # production
```

Node.js 20 ou plus récent.

## Configuration (`.env.local`)

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, sitemap, image de partage) |
| `NEXT_PUBLIC_GOOGLE_FORM_URL` | **Lien de votre Google Form** : le QR code, le bouton et le QR téléchargeable s’y adaptent |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Réception des messages par e-mail via Resend |
| `CONTACT_WEBHOOK_URL` | Alternative : envoi vers Make, Zapier, n8n, Google Apps Script, Slack… |

**Recevoir les messages sur africawavetech7@gmail.com sans nom de domaine** : créez un compte gratuit sur resend.com avec cette même adresse, générez une clé API, puis renseignez `RESEND_API_KEY=...` et `CONTACT_TO_EMAIL=africawavetech7@gmail.com` (laissez `CONTACT_FROM_EMAIL` vide). Tant qu’aucun domaine n’est vérifié, Resend n’envoie qu’à l’adresse du compte, ce qui convient ici.

Sans l’une de ces deux options, le formulaire de contact affiche en production un message invitant à écrire par e-mail (rien n’est perdu en silence). En développement, les messages s’affichent dans le terminal.

## Modifier le contenu

Tout le texte est dans **`src/lib/site.ts`** : coordonnées (e-mail africawavetech7@gmail.com, téléphone et WhatsApp +225 077 878 25 68), chiffres clés, services et tarifs, méthode, réalisations, arguments, liens du pied de page. Les composants (`src/components`) n’ont pas besoin d’être touchés.

- **Cibles prioritaires** (Fintech, GouvTech) : objet `sector` du service « Solutions sectorielles ».
- **Vraies captures de projets** : placez les images dans `public/projects/` et remplacez, dans `src/components/Projects.tsx`, le composant `<Art />` par `next/image`.
- **Taux EUR** : la parité fixe 1 € = 655,957 FCFA est dans `FCFA_PER_EUR`.

## Fonctionnalités dynamiques

- En-tête fixe avec surlignage de la section visible, menu mobile
- Thème clair / sombre mémorisé, sans flash au chargement
- Compteurs animés, apparition progressive des blocs (respecte « réduire les animations »)
- Tarifs commutables FCFA / EUR
- « Demander un devis » pré-remplit le sujet du formulaire de contact
- Formulaire de contact validé des deux côtés (zod), anti-spam (champ piège + limite de débit), API `/api/contact`
- QR code généré côté serveur (aucun script externe)
- SEO : métadonnées, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`

## Déploiement

Vercel (recommandé) : importez le dépôt, ajoutez les variables d’environnement, déployez. Tout hébergeur Node.js convient (`npm run build && npm start`).

## Structure

```
src/app          layout, page, API de contact, polices locales, icône
src/components   sections et éléments interactifs
src/lib          contenu (site.ts), formats, schéma de validation, QR code
public/logos     logos horizontaux AWT (SVG, texte converti en tracés)
public/og.png    image de partage (1200 × 630)
```
