# PLAN D'ACTION — Carte Interactive Voyage Japon

**Objectif** : Interface web interactive avec carte, parcours, récits et photos

---

## 🎯 RÉSUMÉ EXPRESS

**Quoi** : Page web avec carte du Japon + pastilles cliquables (villes) + récits + photos  
**Pour qui** : Toi (souvenir personnel partageable)  
**Stack recommandée** : HTML/CSS/JS + Leaflet.js (carte) → simple, portable, gratuit  
**Hébergement** : GitHub Pages ou Netlify (gratuit)

---

## ⚡ MVP (VERSION MINIMALE)

### Ce qu'on construit d'abord
1. **Carte interactive** du Japon (Leaflet.js)
2. **2 pastilles** : Tokyo + Osaka
3. **Ligne de parcours** entre les deux (Shinkansen)
4. **Clic sur pastille** → panneau latéral avec :
   - Dates de séjour
   - Récit résumé
   - 3-5 photos
5. **Navigation** : boutons Précédent/Suivant

### Fichiers à créer
```
carte-interactive/
├── index.html       # Page principale
├── style.css        # Design
├── script.js        # Interactivité
├── data.json        # Données voyage (villes, dates, coords)
└── photos/          # Photos du voyage
```

---

## 📋 ÉTAPES DE RÉALISATION

### PHASE 1 — Préparation (maintenant)
- [x] Brief validé
- [ ] Décisions design prises (voir Questions ci-dessous)
- [ ] Structure `data.json` validée
- [ ] Photos organisées dans `photos/`

### PHASE 2 — MVP (1-2 jours)
- [ ] Créer `index.html` avec Leaflet.js
- [ ] Ajouter pastilles Tokyo + Osaka sur la carte
- [ ] Tracer ligne de parcours
- [ ] Coder panneau latéral détail
- [ ] Intégrer 1-2 récits + photos test
- [ ] Test local (ouvrir dans navigateur)

### PHASE 3 — Enrichissement (pendant le voyage)
- [ ] Ajouter nouvelles étapes au fur et à mesure
- [ ] Intégrer toutes les photos
- [ ] Peaufiner design (couleurs, typo, animations)
- [ ] Ajouter timeline horizontale

### PHASE 4 — Finalisation (fin de voyage)
- [ ] Compléter tous les récits
- [ ] Optimiser photos (compression web)
- [ ] Ajouter statistiques globales (km, jours, rencontres)
- [ ] Déployer en ligne (GitHub Pages)
- [ ] Partager le lien !

---

## ❓ QUESTIONS À TRANCHER (DÉCISIONS RAPIDES)

### 1. Affichage du détail d'une étape
- **A** : Panneau latéral qui slide depuis la droite (recommandé)
- **B** : Modal centré overlay
- **C** : Page dédiée (changement d'URL)

→ **Choix** : ___________

### 2. Niveau de zoom carte
- **A** : Carte monde centrée sur Japon
- **B** : Carte Japon entière (recommandé)
- **C** : Zoom région Tokyo-Osaka seulement

→ **Choix** : ___________

### 3. Style de la ligne de parcours
- **A** : Ligne droite entre les pastilles (simple)
- **B** : Ligne qui suit le trajet réel (routes/rails) (recommandé si possible)
- **C** : Ligne animée qui se dessine progressivement

→ **Choix** : ___________

### 4. Affichage des photos
- **A** : Carrousel horizontal (flèches gauche/droite)
- **B** : Grille 2x2 avec lightbox au clic (recommandé)
- **C** : Mosaïque Pinterest-style

→ **Choix** : ___________

### 5. Couleurs des pastilles
- **A** : Une seule couleur pour toutes (bleu Japon)
- **B** : Gradient chronologique (bleu → orange → rouge)
- **C** : Couleur par type de ville (métropole, campagne, montagne)

→ **Choix** : ___________

---

## 🛠️ STACK TECHNIQUE DÉTAILLÉE

### Frontend
- **HTML5** : structure
- **CSS3** : design responsive (desktop + mobile)
- **JavaScript ES6** : interactivité

### Librairies
- **Leaflet.js** (carte interactive, ~40KB, gratuit)
- **Markdown-it.js** (optionnel, pour parser `.md` en HTML)

### Hébergement
- **GitHub Pages** (gratuit, simple) OU
- **Netlify** (gratuit, drag & drop)

### Aucun serveur nécessaire → tout en front-end statique

---

## 📦 STRUCTURE DE `data.json`

```json
{
  "titre": "Voyage Japon 2026",
  "dates": "6 mars - 1er avril 2026",
  "etapes": [
    {
      "id": 1,
      "ville": "Tokyo",
      "coords": [35.6762, 139.6503],
      "dates": "7-9 mars",
      "resume": "Arrivée, guest house traditionnel, montagne Takao, Akihabara...",
      "photos": [
        "photos/tokyo-1.jpg",
        "photos/tokyo-2.jpg"
      ],
      "lien_recit": "par-jour/07-mars.md"
    },
    {
      "id": 2,
      "ville": "Osaka",
      "coords": [34.6937, 135.5023],
      "dates": "9-13 mars",
      "resume": "Shinkansen, hôtel avec salon...",
      "photos": [
        "photos/osaka-1.jpg"
      ],
      "lien_recit": "par-jour/09-mars.md"
    }
  ],
  "trajets": [
    {
      "de": 1,
      "vers": 2,
      "mode": "Shinkansen",
      "duree": "3h"
    }
  ]
}
```

---

## 🎨 MOODBOARD DESIGN

### Style général
- **Ambiance** : Épuré, moderne, japonisant (sans être kitsch)
- **Typo** : Sans-serif moderne (Inter, Outfit, ou Noto Sans JP)
- **Palette** :
  - Fond : blanc cassé ou gris très clair
  - Pastilles : bleu profond (#1E3A8A ?) ou rouge Japon (#C1272D ?)
  - Lignes : gris moyen avec animation dash
  - Accents : or/jaune pour highlights

### Inspirations visuelles
- Minimalisme japonais
- Google Maps (pour l'UX carte)
- Notion (pour la mise en page texte)

---

## 📅 TIMELINE PROPOSÉE

| Quand | Quoi |
|-------|------|
| **Maintenant** | Valider brief + décisions design |
| **J+1** | Créer structure HTML + intégrer Leaflet |
| **J+2** | Coder panneau détail + intégrer Tokyo/Osaka |
| **Pendant voyage** | Ajouter étapes au fur et à mesure |
| **Fin voyage** | Finaliser design + déployer en ligne |

---

## ✅ PROCHAINE ACTION

1. **Lire ce plan** et trancher les 5 questions (A/B/C)
2. **Me confirmer** les choix
3. **Je démarre le MVP** (structure HTML + carte + 2 pastilles)
4. **Tu testes en local** et on itère

---

**Prêt à lancer ?** 🚀🗾
