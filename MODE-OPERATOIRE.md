# Mode opératoire — Mise à jour de la carte Japon 2026

> Date de création : 2026-03-09

## Contexte

Carte interactive du voyage Japon 2026 de Jad, déployée sur GitHub Pages.

- **Projet** : `/home/workspace_jad/projects/cartes-voyage/`
- **URL live** : `https://jadachpro.github.io/carte-japon-2026/`
- **Repo GitHub** : `JadAchPro/carte-japon-2026`

## Sources des données

- **Récits** : `/home/openclaw/indiv-pokedex/workspace-pokedex/travel/2026-03-japon/CARNET.md`
- **Photos** : `/home/openclaw/indiv-pokedex/workspace-pokedex/travel/2026-03-japon/photos/`

Jad peut aussi déposer des photos directement dans ce dossier sans passer par Pokédex.

## Procédure de mise à jour

Quand Jad demande "mets à jour la carte" :

### 1. Lire le carnet

Lire `CARNET.md` (source ci-dessus) et comparer avec les étapes existantes dans `app/data.json`. Identifier les nouvelles étapes et les étapes modifiées.

### 2. Copier les nouvelles photos

Copier les photos manquantes depuis la source vers `app/photos/`.

### 3. Mettre à jour data.json

- **Nouvelles étapes** : ajouter un objet dans `stages[]` avec `id`, `city`, `country`, `coords`, `dates`, `summary`, `highlights[]`, `photos[]`
- **Nouvelles photos** : ajouter dans le `photos[]` de l'étape concernée (`file` = chemin relatif `photos/nom.jpg`, `caption` = description)
- **Nouvelle route** : appel OSRM pour le tracé entre deux villes, ajouter dans `routes[]`
  ```
  curl "https://router.project-osrm.org/route/v1/driving/LON1,LAT1;LON2,LAT2?overview=full&geometries=geojson"
  ```
  Extraire `routes[0].geometry` et stocker dans `routes[]`.

### 4. Redéployer

```bash
rm -rf /tmp/deploy-carte && mkdir /tmp/deploy-carte
cp -r /home/workspace_jad/projects/cartes-voyage/app/* /tmp/deploy-carte/
cd /tmp/deploy-carte && git init && git add . && git commit -m "update carte"
git branch -M main
git remote add origin "https://$(gh auth token)@github.com/JadAchPro/carte-japon-2026.git"
git push -u origin main --force
```

### 5. Déclencher le build

```bash
gh api repos/JadAchPro/carte-japon-2026/pages/builds -X POST
```

Propagation : 1-2 min.

## Structure data.json

```json
{
  "stages": [
    {
      "id": 1,
      "city": "Nom ville",
      "country": "Pays",
      "coords": [latitude, longitude],
      "dates": "X–Y mars 2026",
      "summary": "Résumé de l'étape",
      "highlights": ["point 1", "point 2"],
      "photos": [
        {"file": "photos/nom.jpg", "caption": "Description"}
      ]
    }
  ],
  "routes": [
    {
      "from": "Ville A",
      "to": "Ville B",
      "geometry": { "type": "LineString", "coordinates": [...] }
    }
  ]
}
```

## Notes

- Les étapes hors Japon (ex: Paris) sont dans data.json mais filtrées de la carte par script.js
- Profil OSRM `driving` ≈ corridor Tokaido, visuellement acceptable à l'échelle Japon
- Compresser les photos si > 200 KB
