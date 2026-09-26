# 日本語工房 — Atelier Japonais

Une app web d'apprentissage du japonais, en français, en un seul fichier HTML.
L'oral passe d'abord par le romaji ; l'écriture japonaise accompagne toujours le mot.

**→ [Ouvrir l'atelier](https://hugo51oo.github.io/Atelier-Japonais/)**

## Les cinq rubriques

| | |
|---|---|
| **学 Leçons** | 16 leçons thématiques (société, histoire, politique, arts) : texte culturel, vocabulaire, point de grammaire et conjugaison, puis ~16 exercices mélangés — écoute, dictée, écrit en romaji, phrases à remettre dans l'ordre, conjugaison, quiz culturel. Leçon validée à 80 %. |
| **あ Kana** | Les 142 kana — hiragana et katakana, gojūon + dakuten : tableau avec suivi de maîtrise, quatre exercices (son → kana, kana → son, saisie, lecture de mots) et tracé guidé. |
| **字 Kanji** | 75 kanji tirés des leçons : sens, on'yomi et kun'yomi, exemples, et tracé guidé trait par trait (position, forme et sens vérifiés). |
| **筆 Feuille** | Calligraphie à main levée sur une feuille quadrillée : pinceau à largeur variable (il s'épaissit quand la main ralentit), modèle en filigrane, ordre des traits animé, impression et export en image. Les huit gestes de 永 en repère. |
| **辞 Dico** | Tous les mots croisés dans l'app, avec recherche et filtre par domaine, ajout de ses propres mots et révision en cartes. |

Progression, dico personnel et réglages sont sauvegardés dans le navigateur
(`localStorage`). La version publiée comme artifact Claude sauvegarde en plus côté
serveur, ce que cette version GitHub Pages ne fait pas.

La prononciation utilise la synthèse vocale de l'appareil : il faut une voix
japonaise installée (iPhone : Réglages › Accessibilité › Contenu énoncé › Voix).

Deux thèmes — papier washi et encre — suivent par défaut le réglage du système.

## Construire

```sh
python3 build.py
```

`src/` contient les sources :

- `shell.html` — structure de la page et feuille de style (jetons de couleur, deux thèmes)
- `content.js` — tout le contenu pédagogique : leçons, vocabulaire, grammaire, phrases, katakana, kanji
- `app.js` — la logique : moteur d'exercices, tracé sur canvas, dico, sauvegarde, synthèse vocale
- `strokes.json` — tracés de KanjiVG pour les kana et les kanji de l'app

La build produit `index.html` (page autonome) et `atelier-japonais.html`
(même page sans `<html>`/`<head>`, format attendu par les artifacts Claude).
Aucune dépendance, aucun outil de build au-delà de Python.

## Crédits

- Ordre et forme des traits : [KanjiVG](https://kanjivg.tagaini.net) d'Ulrich Apel,
  licence [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
  `src/strokes.json` en est dérivé et reste sous cette licence.
- Typographies : EB Garamond, Spectral et Shippori Mincho, via Google Fonts (SIL OFL).
- Le reste du code est publié sous licence MIT.
