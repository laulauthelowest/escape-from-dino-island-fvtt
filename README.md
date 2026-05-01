# 🦕 Escape from Dino Island – Foundry VTT System

Ein inoffizielles Foundry VTT System für **Escape from Dino Island** von Sam Tung & Sam Roberts.

> *Überleben! Mysterien! Prähistorische Biester!*

## Features

- ✅ **8 vollständige Charakterklassen** (Ärztin, Ingenieur, Jägerin, Kind, Paläontologe, Soldatin, Überlebender, Schmugglerin)
- ✅ **Editierbare Character Sheets** mit Tabs (Manöver, Ausrüstung, Geschichten)
- ✅ **Würfelsystem** mit schönen Chat-Cards (Misserfolg / Teilerfolg / Voller Erfolg)
- ✅ **Roll-Bonus** pro Charakter für freigeschaltete Boni
- ✅ **Fortschritts-Manöver** ein/ausschaltbar per Checkbox
- ✅ **Verletzungstracking** (Dino-Schaden, Außer Gefecht)
- ✅ **Geschichten abhaken** (Stories You Tell)
- ✅ **Ausrüstungsliste** editierbar
- ✅ **Gerücht-Feld** pro Charakter
- ✅ **DM-Bildschirm** als Makro mit allen Zufallstabellen
- ✅ **Dinosaurier-Sheets** und **NPC-Sheets**
- ✅ Deutsche Benutzeroberfläche (mit englischem Fallback)

## Installation

### Methode 1: Via Manifest-URL (empfohlen)

1. In Foundry VTT → **Spielsysteme** → **System installieren**
2. Manifest-URL einfügen:
   ```
   https://raw.githubusercontent.com/YOUR_USERNAME/escape-from-dino-island-fvtt/main/system.json
   ```
3. **Installieren** klicken

### Methode 2: Manuell

1. Das Repository als ZIP herunterladen
2. Den Ordner `escape-from-dino-island` in deinen Foundry-Datenordner kopieren:
   - Windows: `%AppData%\FoundryVTT\Data\systems\`
   - macOS: `~/Library/Application Support/FoundryVTT/Data/systems/`
   - Linux: `~/.local/share/FoundryVTT/Data/systems/`
3. Foundry neu starten

## DM-Bildschirm Makro

1. In Foundry: **Makros** → **Neues Makro** erstellen
2. Typ: **Script**
3. Den Inhalt der Datei `DM-Screen-Makro.js` einfügen
4. Makro auf die Leiste ziehen und ausführen

Der DM-Bildschirm enthält alle Zufallstabellen aus dem Spiel mit einem 🎲-Würfelbutton, der das Ergebnis in den Chat postet.

## GitHub Pages & Updates

1. Erstelle ein GitHub Repository mit dem Namen `escape-from-dino-island-fvtt`
2. Lade alle Dateien hoch
3. Passe in `system.json` die `url`, `manifest` und `download` URLs an:
   ```json
   "manifest": "https://raw.githubusercontent.com/DEIN_NAME/escape-from-dino-island-fvtt/main/system.json",
   "download": "https://github.com/DEIN_NAME/escape-from-dino-island-fvtt/releases/download/v1.0.0/escape-from-dino-island.zip"
   ```
4. Erstelle ein GitHub Release namens `v1.0.0` und lade die ZIP-Datei hoch

## Würfeln

- **Klick auf den Stat-Button** (Clever / Fit / Besonnen) → würfelt 2W6 + Stat
- **Klick auf ein Manöver** → würfelt mit dem zugehörigen Stat
- **Roll-Bonus** (auf dem Sheet einstellbar) → wird automatisch addiert
- Fortschritts-Manöver erst **freischalten** (Checkbox), dann würfelbar

## Lizenz

Dieses System ist ein Community-Fanprojekt. Das Originalspiel gehört Sam Tung & Sam Roberts.  
"Escape from Dino Island" steht unter Creative Commons-Lizenz – bitte beachte die Originallizenzbedingungen.

Systemcode: MIT License

---

*Powered by the Apocalypse* 🦖
