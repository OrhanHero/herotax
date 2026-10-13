# HERO Tax: isolierte Entwicklungsumgebung für das App-Begleitprojekt

Stand: 14. Oktober 2026.

## Zweck und Branch

Branch: `chore/app-companion-environment`. Dieser Branch isoliert die bisher lokalen Werkzeugänderungen für die Zusammenarbeit mit der mobilen Begleit-App. Der bestehende Branch `GoogleAntigravityIDE` wird durch diese Arbeit nicht verändert. Eine Übernahme ist eine spätere, gesonderte Entscheidung.

Die eigentliche iOS-/Android-App und ihre universelle Web-Version liegen im separaten Repository [OrhanHero/hero](https://github.com/OrhanHero/hero), unter `mobile/`, auf Branch `claude/hero-md-arbeitsanleitung-jn93m4`. Dieses Website-Repository bleibt die Kontext- und Inhaltsreferenz. Hier wurde keine mobile App, kein App-Backend und keine Daten-Synchronisierung ergänzt.

## Enthaltene Änderungen

- Vite 8.3.4 und stabiler React Compiler 1.0 mit Babel-Integration in `vite.config.js`.
- Aktualisierte `package.json` und reproduzierbares `package-lock.json`.
- Node 24.21.0 und npm 11.19.0: Versiondateien, Engines und Package Manager.
- Versionsgebundene npm-Installationsfreigaben für `cpu-features@0.0.10` und `ssh2@1.17.0`; keine pauschale Freigabe.
- `.github/workflows/quality.yml`: Build, Linter und Routenprüfung mit gepinnten GitHub Actions.
- README und diese separate Übergabedokumentation.

Der Änderungssatz bearbeitet keine Website-Komponenten, Artikel oder Produktlogik. Er enthält weder Deployment noch Windows-Sync. Bestehende Inhalte werden vom aktuellen Ausgangsbranch übernommen, nicht zurückgesetzt.

## Eigenständiger Start

Checkout dieses Branches und Node/npm-Versionen zuerst prüfen. Aus dem Repository-Stamm:

```sh
npm ci
npm run lint
npm run check:routes
npm run build
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Kein API-Key oder SFTP-Zugang ist für diese lokalen Prüfungen erforderlich. Die SSH-Pakete gehören zu bestehenden optionalen Betriebswerkzeugen; deren Installationsfreigabe autorisiert kein Deployment. Vite liefert die Website, führt aber weder PHP-Feeds noch Apache-Konfiguration aus.

## Gemeinsame Arbeit mit der App

Für den Drei-App-Ablauf beide Repositories nebeneinander auschecken: `hero/` und `herotax/`. Die Website muss auf diesem Modernisierungsbranch liegen. Im `hero`-Stamm:

```sh
npm ci
npm run env:install
npm run env:doctor
npm run env:check
npm run env:dev
```

Alternativer Website-Pfad: `HERO_WEBSITE_DIR` setzen. Der gemeinsame Ablauf erwartet die Toolchain dieses Branches. `hero` kann unabhängig mit `--core-only` betrieben und geprüft werden. Der gemeinsame Smoke-Test `npm run env:smoke` braucht alle drei gestarteten Dienste.

## Prüfstand und Grenzen

Die lokalen Änderungen bestanden zuvor `npm ci`, Vite-Produktionsbuild, Oxlint und die Prüfung von zehn Routen. Nach Übernahme des aktuellen Website-Ausgangsstands werden Build, Linter und Routen erneut geprüft. Das konkrete Ergebnis steht im Abschnitt Abnahme unten. Der React Compiler ist aktiviert; eine gemessene Performance-Steigerung wird nicht behauptet.

Der GitHub-Workflow wird versioniert; sein tatsächliches Ergebnis auf GitHub muss separat geprüft werden. Kein Hosting-Release, keine Übertragung in einen Windows-Sync-Ordner, keine PHP-/Apache-Abnahme. Native Gerätetests und signierte Builds betreffen das `hero`-Repository und stehen dort im Entwicklungsplan.

## Fortführung durch einen anderen Agenten

1. `AGENTS.md` und diese Datei lesen; Schreibweise HERO Tax beachten.
2. Branch und lokale Änderungen prüfen. Werkzeugänderungen ausschließlich auf diesem Branch fortführen, solange keine andere Anweisung vorliegt.
3. Für mobile Funktionen die [Übergabe in hero](https://github.com/OrhanHero/hero/blob/claude/hero-md-arbeitsanleitung-jn93m4/docs/AGENTEN-UEBERGABE.md) und den dortigen Entwicklungsplan lesen.
4. Den nächsten konkreten Arbeitsschritt mit Abnahmekriterien wählen und fachliche Grenzen dokumentieren.
5. Passende Prüfungen ausführen, Ergebnisse und neue Grenzen hier aktualisieren. Eine Zusammenführung in den bisherigen Website-Branch oder eine Veröffentlichung separat behandeln.

## Abnahme

Am 14. Oktober 2026 bestanden: `npm run lint`, `npm run check:routes` (zehn Routen) und `npm run build` (Vite 8.3.4). Ausgangspunkt dieses Branches ist der aktuelle Website-Commit `35da49a5c9186ce097e30d4009d8a378508e4931`. Der Diff gegen diesen Ausgangspunkt enthält ausschließlich die oben aufgeführten Werkzeug- und Dokumentationsdateien.
