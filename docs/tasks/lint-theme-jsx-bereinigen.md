# Aufgabe: Lint-Warnungen in `src/theme.jsx` bereinigen

## Kontext
`npm run lint` (oxlint) meldet **4 Warnungen** vom Typ `react(only-export-components)` in `src/theme.jsx`.
Ursache: Die Datei exportiert neben React-Komponenten auch Nicht-Komponenten (Context, Hook, Utility-Funktionen).
Das stört React Fast Refresh im Dev-Modus.

Betroffene Exports in `src/theme.jsx`:
- `storeTheme` (Funktion, Zeile ~21)
- `useTheme` (Hook, Zeile ~93)
- `ThemeContext` (Context, Zeile ~30)

## Ziel
Nach der Bereinigung soll `npm run lint` **0 Warnungen und 0 Fehler** melden,
ohne dass sich das Laufzeitverhalten der App ändert.

## Vorgehen
1. **Erst lesen, dann ändern:** Lies `src/theme.jsx` vollständig, um alle Exports und deren Verwender zu verstehen.
2. **Nicht-Komponenten auslagern** – lege neue Dateien an, sodass jede Datei entweder nur Komponenten
   ODER nur Nicht-Komponenten exportiert. Empfohlene Aufteilung:
   - `src/theme-context.js` → `ThemeContext` (`createContext(...)`)
   - `src/theme-utils.js` → `storeTheme` (und ggf. weitere Utilities wie `getTheme` / `memoryTheme`-Handling)
   - `src/use-theme.js` → `useTheme` Hook
   - `src/theme.jsx` → behält **nur** die Provider-Komponente(n) und importiert Context/Utils/Hook aus den neuen Dateien
   - (Alternative, falls minimaler: nur den Context in eine eigene Datei ziehen – danach testen, ob die Warnungen verschwinden.)
3. **Alle Imports aktualisieren:** Suche projektweit nach Verwendern (`storeTheme`, `useTheme`, `ThemeContext`)
   und passe die Import-Pfade an. Suche über alle `src/**/*.{js,jsx}`-Dateien.
4. **Verifizieren:**
   - `npm run lint` → muss 0 Warnungen, 0 Fehler zeigen
   - `npm run build` → muss erfolgreich durchlaufen

## Rahmenbedingungen
- **Keine funktionalen Änderungen** – reines Refactoring (Datei-Aufteilung + Imports).
  Verhalten, Naming der Exports und Default-Theme dürfen sich nicht ändern.
- Keine Tests hinzufügen (nicht angefordert).
- Bestehenden Code-Stil des Projekts einhalten (ES-Module, Namenskonventionen,
  Dateiendungen: `.jsx` nur bei JSX-Inhalt, sonst `.js`).

## Definition of Done
- [ ] `src/theme.jsx` exportiert nur noch Komponenten
- [ ] Context/Hook/Utils in separate Datei(en) ausgelagert
- [ ] Alle Import-Pfade projektweit aktualisiert
- [ ] `npm run lint` → **0 warnings, 0 errors**
- [ ] `npm run build` → erfolgreich
