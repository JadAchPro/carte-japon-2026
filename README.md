# Carte Interactive — Voyage Japon 2026

Carte web interactive retraçant le voyage de Jad au Japon (6 mars – 1er avril 2026).

## Stack

- HTML5 / CSS3 / JS vanilla
- Leaflet.js (carte)
- OSRM (tracés routiers pré-calculés)
- GitHub Pages (hébergement)

## Structure

```
app/
├── index.html    # Page principale
├── style.css     # Styles (modal, carrousel, responsive)
├── script.js     # Logique carte + interactions
├── data.json     # Données étapes, routes, photos
└── photos/       # Photos du voyage
```

## Déploiement

Hébergé sur GitHub Pages : `https://jadachpro.github.io/carte-japon-2026/`

## Ajout de contenu

1. Ajouter une entrée dans `data.json` → `stages[]`
2. Si nouvelle ville : récupérer la route OSRM, ajouter dans `routes[]`
3. Copier les photos dans `app/photos/`
4. Push sur GitHub
