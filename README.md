# Information Design — interactieve website

Een Next.js (App Router, TypeScript, Tailwind) site die de publicatie
*Information Design* van Rune Pettersson doorzoekbaar maakt via een
Finder-achtige kolommenbrowser, met een lichte en een donkere modus.

## Starten

```bash
npm install
npm run dev
```

Open daarna http://localhost:3000.

Voor een productie-build: `npm run build && npm run start`.

## Hoe de inhoud is opgebouwd

De brontekst (`2526_VC_Brontekst_MessageDesign.docx`) is automatisch verwerkt:

1. Pandoc zette het Word-document om naar een gestructureerde boom op basis
   van de kop-niveaus (Heading 1 t/m 4) die in het document zelf staan.
2. Elke kop werd een node met zijn eigen alinea's en afbeeldingen.
3. Het resultaat staat in `data/content.json` — dit bestand voedt de hele
   site. Wil je tekst aanpassen, dan kan dat direct in dit JSON-bestand,
   zonder dat je de React-code hoeft aan te raken.
4. Afbeeldingen staan in `public/media/`.

**Structuur in de app:**
- Kolom 1 = hoofdstukken (Heading 1)
- Kolom 2 = secties (Heading 2)
- Kolom 3 = subsecties (Heading 3)
- Content-paneel rechts = de lopende tekst + afbeeldingen van de gekozen
  subsectie, inclusief eventuele Heading 4-niveaus daaronder als
  tussenkopjes.

Titel en auteur (voorpagina) zijn automatisch herkend uit de eerste twee
regels van het document: **"Information Design 1"** en **"Rune Pettersson"**.
De korte intro-tekst op het startscherm is de eerste alinea van het Preface.

## Bekende beperkingen

- Het brondocument bevat tabellen; die zijn nu overgeslagen (gemarkeerd als
  `[TABLE OMITTED]` in de ruwe extractie) omdat tabelopmaak zich niet netjes
  laat vertalen naar de kaartweergave. Wil je die alsnog tonen, dan moeten
  we per tabel een eigen weergave bouwen.
- Van de ±35–67 ingesloten afbeeldingen in het document zijn er 11 automatisch
  als "vast anker bij een alinea" herkend en meegenomen. De rest stond los
  van een paragraaf (bijv. los zwevend of in een tabel) en is niet
  automatisch geplaatst — die kun je handmatig toevoegen aan de betreffende
  node in `content.json` (veld `images`, met pad naar `public/media/...`).
- Er is geen zoekfunctie; dat is een logische volgende stap gezien de omvang
  van de tekst (≈300 kopjes).

## Stijl aanpassen

- Kleuren: `tailwind.config.js` (`paper.*` = lichte modus, `ink.*` = donkere
  modus, `brass`/`moss` = accenten).
- Lettertypes: `app/globals.css`, CSS-variabelen `--font-display`,
  `--font-body`, `--font-ui`, `--font-script`. Dit zijn systeemlettertype-
  stapels (geen Google Fonts) zodat de site zonder internetverbinding
  gebouwd kan worden; pas gerust aan naar lettertypes die je zelf hebt
  geïnstalleerd of via `next/font/local` inlaadt.
