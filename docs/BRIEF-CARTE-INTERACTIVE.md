# BRIEF — Carte Interactive Voyage Japon

**Date** : 9 mars 2026  
**Projet** : Interface visuelle interactive du voyage Japon (6 mars - 1er avril 2026)  
**Objectif** : Créer un souvenir visuel et navigable du voyage

---

## 📋 BESOIN UTILISATEUR

Créer une carte interactive du Japon qui permet de :

1. **Visualiser le parcours** sur une carte avec :
   - Une pastille pour chaque ville/lieu visité
   - Des lignes reliant les pastilles qui retracent le chemin réellement parcouru (pas des lignes droites)
   - Pastilles ordonnées dans l'ordre chronologique de visite

2. **Naviguer dans les souvenirs** :
   - Clic sur une pastille → affichage du détail
   - Détail = récit jour par jour + photos associées
   - Peut ouvrir une page dédiée ou un panneau latéral

3. **Interface finale** :
   - Carte visuelle, esthétique, immersive
   - Souvenir interactif du voyage
   - Facile à partager/consulter

---

## 🎯 FONCTIONNALITÉS CLÉS

### Vue carte principale
- Fond : carte du Japon (stylisée ou réaliste)
- Pastilles colorées pour chaque étape (Tokyo, Osaka, etc.)
- Lignes de parcours entre les pastilles (tracé du chemin réel)
- Timeline ou légende avec ordre chronologique

### Détail d'une étape (au clic)
- **Option A** : Panneau latéral qui s'ouvre
- **Option B** : Page dédiée

Contenu du détail :
- Nom de la ville/lieu
- Dates de séjour
- Récit jour par jour (extrait de `par-jour/XX-mars.md`)
- Photos associées (depuis `photos/`)
- Statistiques : km parcourus, personnes rencontrées, highlights

### Navigation
- Boutons "Suivant/Précédent" pour naviguer entre les étapes
- Retour à la vue carte
- Filtres optionnels : par date, par type d'activité, par ville

---

## 🛠️ STACK TECHNIQUE PROPOSÉE

### Option 1 : Web classique (HTML/CSS/JS)
**Avantages** : Simple, portable, fonctionne partout, facile à héberger  
**Stack** :
- **HTML5** : structure
- **CSS3** : design, animations
- **JavaScript vanilla** : interactivité
- **Leaflet.js** ou **Mapbox GL JS** : carte interactive
- **Markdown-it.js** (optionnel) : pour parser les fichiers `.md` en HTML

**Fichiers générés** :
```
carte-interactive/
├── index.html          # Page principale
├── style.css           # Styles
├── script.js           # Logique interactive
├── data/
│   ├── itinerary.json  # Données du voyage (villes, dates, coords)
│   └── recits/         # Récits jour par jour (JSON ou MD)
├── photos/             # Photos du voyage
└── assets/
    └── map-icons/      # Icônes des pastilles
```

### Option 2 : SVG personnalisée
**Avantages** : Contrôle total du design, pas de dépendance carte  
**Stack** :
- **HTML/CSS/JS**
- **SVG** : carte du Japon dessinée/stylisée
- **GSAP** (optionnel) : animations fluides

### Option 3 : Framework moderne (Next.js / React)
**Avantages** : Performance, SEO, expérience fluide  
**Inconvénient** : Plus complexe à mettre en place  
**Stack** :
- **Next.js** ou **React**
- **Tailwind CSS** : design
- **Mapbox GL JS** ou **React Leaflet** : carte

---

## 📐 PROPOSITION D'ARCHITECTURE

### Structure des données
Créer un fichier `itinerary.json` qui centralise :

```json
{
  "voyage": {
    "titre": "Japon 2026",
    "dates": "6 mars - 1er avril 2026",
    "etapes": [
      {
        "id": 1,
        "ville": "Tokyo",
        "coords": [35.6762, 139.6503],
        "dates": "7-9 mars 2026",
        "jours": ["07-mars", "08-mars", "09-mars"],
        "recit": "par-jour/07-mars.md",
        "photos": ["photos/2026-03-07_*.jpg"],
        "highlights": ["Guest house Yuta & Nana", "Montagne Takao", "Hareruya"],
        "km_parcourus": 25
      },
      {
        "id": 2,
        "ville": "Osaka",
        "coords": [34.6937, 135.5023],
        "dates": "9-13 mars 2026",
        "jours": ["09-mars", "10-mars", "11-mars", "12-mars", "13-mars"],
        "recit": "par-jour/09-mars.md",
        "photos": ["photos/2026-03-09_*.jpg"],
        "highlights": ["Shinkansen", "Hôtel avec salon"],
        "km_parcourus": 0
      }
    ],
    "trajet": [
      {"de": "Tokyo", "vers": "Osaka", "mode": "Shinkansen", "duree": "3h"}
    ]
  }
}
```

### Workflow de génération
1. **Parser les fichiers existants** :
   - `CARNET.md` → extraire les étapes, dates, villes
   - `par-jour/*.md` → récits détaillés
   - `photos/*.jpg` → lister et associer aux jours

2. **Générer `itinerary.json`** automatiquement

3. **Créer l'interface HTML/CSS/JS** :
   - Charger `itinerary.json`
   - Afficher la carte avec pastilles
   - Gérer les clics et affichage des détails

---

## 🎨 DESIGN & UX

### Palette de couleurs
- Fond carte : tons neutres (gris clair, beige)
- Pastilles : gradient Tokyo → Osaka (bleu → orange ?)
- Lignes de parcours : trait animé (dash-offset)
- Texte : typographie épurée, moderne

### Animations
- Apparition progressive des pastilles (fade-in)
- Ligne de parcours qui se dessine au chargement
- Transition fluide lors du clic sur une pastille
- Carrousel de photos avec navigation

### Responsive
- Desktop : vue carte à gauche, détail à droite
- Mobile : vue pleine page, navigation par swipe

---

## 📦 LIVRABLES

### Version 1 (MVP)
- [ ] Carte interactive avec pastilles Tokyo + Osaka
- [ ] Lignes de parcours entre les étapes
- [ ] Clic sur pastille → affichage récit + photos
- [ ] Navigation précédent/suivant
- [ ] Design simple mais fonctionnel

### Version 2 (Améliorée)
- [ ] Timeline horizontale en bas de page
- [ ] Filtres par type d'activité (culture, food, transport, etc.)
- [ ] Statistiques globales (km, jours, photos, rencontres)
- [ ] Mode "replay" : animation du parcours jour par jour
- [ ] Export PDF du carnet complet

### Version 3 (Deluxe)
- [ ] Intégration des photos GPS (si métadonnées dispo)
- [ ] Mode 3D de la carte
- [ ] Annotations vocales (si souhaité)
- [ ] Partage social (lien unique)

---

## 🚀 PLAN D'EXÉCUTION

### Étape 1 : Préparation des données
1. Finaliser `CARNET.md` avec toutes les étapes du voyage
2. Compléter `par-jour/*.md` pour chaque jour
3. Organiser `photos/` avec nommage cohérent
4. Créer `itinerary.json` (manuel ou auto-généré)

### Étape 2 : Développement MVP
1. HTML : structure de base (carte + panneau détail)
2. CSS : design v1
3. JS : logique d'affichage carte + clics
4. Intégration Leaflet.js pour la carte
5. Test local

### Étape 3 : Enrichissement
1. Ajouter toutes les étapes (au fur et à mesure du voyage)
2. Intégrer les photos
3. Peaufiner le design
4. Ajouter animations

### Étape 4 : Déploiement
1. Hébergement : GitHub Pages, Netlify, ou Vercel (gratuit)
2. Lien partageable
3. Optionnel : nom de domaine custom (voyage-japon-2026.com ?)

---

## 🤔 QUESTIONS À TRANCHER

1. **Niveau de détail de la carte** :
   - Carte monde centrée sur Japon ?
   - Carte Japon entière ?
   - Zoom sur région Tokyo-Osaka uniquement ?

2. **Affichage du détail** :
   - Panneau latéral (slide-in) ?
   - Modal overlay ?
   - Page dédiée (changement d'URL) ?

3. **Photos** :
   - Carrousel classique ?
   - Grille avec lightbox ?
   - Mosaïque Pinterest-style ?

4. **Trajet entre les villes** :
   - Ligne droite stylisée ?
   - Ligne qui suit vraiment le trajet (routes/rails) ?
   - Animation de déplacement ?

5. **Technologie finale** :
   - HTML/CSS/JS vanilla (simple, rapide) ?
   - Framework moderne (plus puissant, plus complexe) ?

---

## 💡 INSPIRATIONS

- **Google Maps Timeline** : vue chronologique des déplacements
- **Notion Travel Template** : mise en page élégante
- **Polarsteps** : app de voyage avec carte + photos
- **Atlas Obscura** : carte interactive de lieux
- **AirBnB Trips** : interface épurée, focus photo

---

## 📌 NOTES

- Le projet peut évoluer au fur et à mesure du voyage (ajout progressif des étapes)
- Possibilité de créer un script Python pour auto-générer `itinerary.json` depuis `CARNET.md`
- Les photos peuvent être compressées pour le web (optimisation)
- Prévoir un mode "travail en cours" tant que le voyage n'est pas terminé

---

**Prochaine étape** : Valider le brief, trancher les questions, démarrer le MVP ! 🗾✨
