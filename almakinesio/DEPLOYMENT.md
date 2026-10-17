# Mise en ligne sur GitHub et Netlify

## 1. Publier le dépôt sur GitHub

Créez un dépôt GitHub vide, puis poussez ce projet sur la branche `main`. Ne publiez aucun fichier `.env`.

## 2. Connecter Netlify

1. Dans Netlify, choisissez **Add new site → Import an existing project**.
2. Sélectionnez le dépôt GitHub.
3. Netlify détectera automatiquement `netlify.toml`.
4. Les réglages attendus sont :
   - Build command : `pnpm build`
   - Publish directory : `dist`
   - Node.js : `22`
5. Lancez le premier déploiement.

## 3. Connecter le domaine

Ajoutez `almakinesio.com` dans **Domain management** puis suivez les indications DNS de Netlify. Configurez `www.almakinesio.com` comme domaine principal si cette forme est conservée dans les métadonnées du site.

Activez ensuite le certificat HTTPS automatique et vérifiez que :

- `https://www.almakinesio.com/` affiche la version française ;
- `https://www.almakinesio.com/es/` affiche la version espagnole ;
- `https://www.almakinesio.com/robots.txt` est accessible ;
- `https://www.almakinesio.com/sitemap.xml` est accessible.

## 4. Demander l’indexation

1. Ajoutez le domaine dans [Google Search Console](https://search.google.com/search-console).
2. Validez la propriété DNS.
3. Soumettez `https://www.almakinesio.com/sitemap.xml`.
4. Demandez l’indexation de `/` et `/es/`.
5. Ajoutez également l’entreprise à Bing Webmaster Tools.

L’apparition dans les résultats n’est jamais instantanée ni garantie par le code seul. Elle dépend notamment de la validation du domaine, du contenu, de la fiche Google Business et des liens entrants.
