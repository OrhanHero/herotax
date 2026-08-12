# IONOS-Checkliste — was im Kundenkonto zu prüfen und einzustellen ist

| Feld | Wert |
|---|---|
| Grundlage | Sicherheitsanalyse herotax.de vom 12.08.2026, offene Punkte O1–O7 |
| Gehört zu | [SICHERHEIT.md](./SICHERHEIT.md), Abschnitt 5 |
| Adressat | wer Zugang zum IONOS-Kundenkonto hat — oder eine Claude-Sitzung mit Browserzugriff (Claude in Chrome, lokale Sitzung) |
| Stand | 12.08.2026 |

Alles in diesem Dokument setzt einen Login im IONOS-Kundenkonto voraus. Aus dem
Repository heraus ist keiner dieser Punkte erreichbar — kein Skript, kein
Workflow und kein Deployment kann sie ersetzen. Die Härtung in
`public/.htaccess` und im Deployment ist umgesetzt und live nachgemessen; was
hier steht, ist der Rest.

> **Zu den Menübezeichnungen:** IONOS benennt seine Oberfläche gelegentlich um
> und zeigt je nach gebuchtem Produkt unterschiedliche Menüs. Die folgenden
> Pfade sind deshalb als *wonach zu suchen ist* zu lesen, nicht als
> garantierte Klickfolge. Entscheidend ist jeweils die Beschreibung der
> Funktion — danach lässt sich der richtige Menüpunkt auch dann finden, wenn
> er anders heißt.

---

## Kurzfassung: was umzustellen ist

> **Wichtige Einschränkung, bevor Sie suchen.** Aus der Deployment-Konfiguration
> (`access-5019090422.webspace-host.com`, Benutzer `su486213`) geht hervor:
> herotax.de läuft auf einem **IONOS Shared-Webhosting-Paket**, nicht auf einem
> eigenen Server. Ein Teil der Maßnahmen aus dem Analysebericht setzt aber
> Serverzugriff voraus und existiert bei Shared-Hosting schlicht nicht. Wer
> danach im Portal sucht, sucht vergeblich.

| # | Einstellung | Gibt es das hier? | Portal |
|---|---|---|---|
| **1** | Bot-/DDoS-Schutz bzw. WAF | **fraglich** — bei IONOS separat vermarktet, nicht Teil des Standard-Webhostings | `mein.ionos.de` |
| **2** | Bot-Filter im Reporting | wahrscheinlich | `analytics.ionos.de` |
| **3** | Logfile-Zugriff und -Aufbewahrung | je nach Paket | `mein.ionos.de` |
| **4** | Automatische Backups | je nach Paket | `mein.ionos.de` |
| ~~5~~ | ~~Fail2Ban, `ServerTokens Prod`~~ | **nein — entfällt** | braucht Root-/Managed-Server |

**Was daraus folgt:** Auf Shared-Hosting ist die Härtung in
`public/.htaccess` weitgehend die **Obergrenze** dessen, was sich an dieser
Stelle erreichen lässt. Sie ist umgesetzt und live nachgemessen. Alles
darüber hinaus — echtes Rate-Limiting, IP-Sperren, Erkennung gefälschter
Crawler — braucht eine Instanz **vor** dem Webspace. Siehe Teil C.

### Das in einer Nachricht klären

Statt im Portal zu suchen, ist der schnellste Weg eine Frage an den
IONOS-Support. Vorschlag zum Kopieren:

> Guten Tag,
>
> für meinen Webhosting-Vertrag zur Domain herotax.de (Webspace
> `access-5019090422.webspace-host.com`) bitte ich um Auskunft zu vier
> Punkten:
>
> 1. Ist in meinem Tarif ein Bot-Schutz, DDoS-Schutz oder eine Web
>    Application Firewall enthalten oder zubuchbar? Falls zubuchbar: welches
>    Produkt und zu welchem Preis?
> 2. Kann ich die Roh-Access-Logs des Webspace herunterladen? Wenn ja, wo,
>    und wie lange werden sie vorgehalten? Lässt sich die Aufbewahrungsdauer
>    verlängern?
> 3. Gibt es automatische Backups des Webspace, und wie viele Stände werden
>    wie lange aufbewahrt?
> 4. Lässt sich Bot-/Robot-Traffic in IONOS WebAnalytics aus den Berichten
>    herausfiltern?
>
> Hintergrund ist eine Sicherheitsauswertung, bei der umfangreiches
> automatisiertes Scanning festgestellt wurde.
>
> Vielen Dank

Die Antwort darauf entscheidet, ob Teil A überhaupt etwas hergibt — und ob
Teil C nötig wird.

---

## Teil C — wenn es die Einstellungen nicht gibt

Das ist der wahrscheinliche Fall. Dann bleibt eine Möglichkeit, und die
funktioniert unabhängig von IONOS: **einen Dienst vor die Domain schalten.**

**Cloudflare (kostenloser Tarif) deckt in einem Zug ab:**

| Offener Punkt | Was Cloudflare liefert |
|---|---|
| O1 — WAF/Bot-Schutz (M5) | Bot-Erkennung inkl. Verifikation, ob eine IP wirklich zu Google/OpenAI/Perplexity gehört — genau das, was gegen die „fake"-Crawler fehlt |
| O2 — Rate-Limiting/IP-Sperren (M4) | Rate-Limiting-Regeln, IP- und Länder-Sperren |
| O5 — Alarmierung (M12) | Verfügbarkeits- und Fehlerbenachrichtigungen |
| O4 — Statuscodes (M11) | Analytics **mit** HTTP-Statuscodes und Herkunftsländern — also genau das, was IONOS WebAnalytics prinzipiell nicht zeigt |

**Was es kostet:** nichts im Basistarif.

**Was es bedeutet:** Die DNS-Verwaltung der Domain zieht zu Cloudflare um.
Der Webspace bei IONOS bleibt unverändert, es ändert sich nur, wohin die
Domain zeigt. Das ist ein überschaubarer, aber bewusster Schritt — er sollte
entschieden und nicht nebenbei gemacht werden.

**Was es nicht ändert:** Die Härtung in `public/.htaccess` bleibt in Kraft und
wirkt weiter als zweite Schicht.

Falls Cloudflare nicht gewünscht ist, ist das ebenfalls eine legitime
Entscheidung. Dann gilt: Die Seite ist gehärtet, die Angriffe laufen ins
Leere, und das Restrisiko liegt beim Grundrauschen des Scannings — das war
in der Analyse mit MITTEL bewertet und ist durch die umgesetzten Maßnahmen
gesunken.

---

## Teil A — `mein.ionos.de` (Hosting): hier liegt der Schutz

### A1 · WAF / Bot- und DDoS-Schutz aktivieren — **wichtigster Punkt** (O1, M5)

**Wonach suchen:** im Hosting- oder Domain-Bereich nach „Website-Sicherheit",
„Bot-Schutz", „DDoS-Schutz", „Web Application Firewall" oder „SiteLock".
Je nach Tarif ist das enthalten, zubuchbar oder gar nicht verfügbar.

**Zu prüfen:**

- Ist eine solche Funktion im gebuchten Tarif enthalten? Falls ja: ist sie
  eingeschaltet?
- Falls zubuchbar: Was kostet sie, und deckt sie Bot-Erkennung ab (nicht nur
  Malware-Scan des Webspace)?
- Falls vorhanden und aktiv: Gibt es eine Regelstärke oder einen
  Challenge-Modus, der sich anheben lässt?

**Warum das der einzige Punkt mit echtem Schutzwert ist:** Die Analyse fand
gefälschte KI-Crawler („fake PerplexityBot", „fake OpenAI bot"). Der
User-Agent-Filter in `public/.htaccess` erreicht die prinzipiell nicht — wer
seinen User-Agent fälscht, wird nicht über den User-Agent erkannt. Nötig ist
eine Prüfung, ob die Quell-IP zum angegebenen Anbieter gehört, und die kann
nur der Hoster leisten.

**Wenn nichts verfügbar ist:** Ein vorgeschalteter Dienst wie Cloudflare
(kostenloser Tarif genügt für Bot-Schutz und Rate-Limiting) wäre die
Alternative. Das bedeutet, die DNS-Verwaltung der Domain dorthin umzuziehen —
eine größere Entscheidung, die nicht nebenbei getroffen werden sollte.

---

### A2 · Access-Logs herunterladen — und die Aufbewahrung hochsetzen (O4, M11)

**Wonach suchen:** „Logfiles", „Statistiken", „Protokolle" oder „Serverlogs"
im Hosting-Bereich. Oft als `.gz` pro Tag, teils auch per SFTP im
Kontoverzeichnis (nicht im Web-Root) abrufbar.

**Umstellen (Punkt 3 der Kurzfassung):** Falls sich die Aufbewahrungsdauer
der Logfiles einstellen lässt, auf das **Maximum** setzen. Standardmäßig
halten Hoster Logs oft nur wenige Tage vor. Nach einem Vorfall braucht man
genau die Wochen davor — und dann ist es zu spät, die Einstellung zu ändern.

**Zu holen:** mindestens die Tage **02.08., 06.08. und 11.08.2026** — an
diesen Tagen lagen 17 bis 23 Seitenaufrufe pro Sitzung, was auf
Scanner-Läufe hindeutet. Wenn verfügbar, gleich den ganzen Zeitraum ab
02.08.2026 (Go-Live).

**Danach im Repository:**

```bash
npm run security:logs -- access.log
npm run security:logs -- logs/*.gz        # .gz wird direkt gelesen
```

**Worauf es ankommt:** Das Skript gibt fünf Blöcke aus; der entscheidende ist
**Block ⑶ „Secret-Pfad mit HTTP 200"**. Der muss leer sein. Ist er es nicht,
bricht das Skript mit Exit-Code 1 ab und nennt IP, Zeitpunkt und User-Agent —
dann ist ein Zugangsdatum abgeflossen und muss rotiert werden.

Das ist die einzige Frage der Analyse, die sich **rückwirkend nicht anders**
klären lässt. WebAnalytics kann sie prinzipiell nicht beantworten, weil es
keine Statuscodes ausweist.

---

### A3 · Serverkonfiguration — nur bei Managed/Root-Server (O2, O3)

Auf reinem Shared-Webhosting gibt es diese Möglichkeiten nicht; dann sind die
Punkte gegenstandslos und A1 ist der Ersatz.

**Umstellen (Punkt 5 der Kurzfassung):**

- **Fail2Ban-artige IP-Sperre** bei gehäuften 403/404 pro IP. Die
  Kandidatenliste liefert `npm run security:logs` im Block „Top IPs mit
  Fehlerantworten". Richtwert aus der Analyse: 15 Treffer in 60 Sekunden →
  24 Stunden Sperre.
- **`ServerTokens Prod` / `ServerSignature Off`** — lässt sich in `.htaccess`
  nicht setzen (Serverkontext); ein Versuch dort löst HTTP 500 aus. Reduziert,
  was Scanner wie Censys über den Server indexieren können.

---

### A4 · Backup und Restore (O7, M15)

**Umstellen (Punkt 4 der Kurzfassung):**

- Gibt es automatische, versionierte Backups des Webspace? Falls abschaltbar
  oder abgeschaltet: **einschalten**.
- Aufbewahrung auf den höchsten verfügbaren Wert setzen.
- Einmal einen Restore ausprobieren und das Ergebnis notieren.

**Was bereits abgedeckt ist:** Die Seite selbst ist vollständig aus dem
Repository wiederherstellbar (GitHub → Actions → *Build and Deploy to IONOS*
→ Run workflow). Das wurde am 12.08.2026 dreimal aus frischem Checkout
ausgeführt, jedes Mal mit grünem Smoketest. Offen ist nur die **forensische
Sicherung**: einen manipulierten Stand sichern zu können, statt ihn beim
Wiederherstellen zu überschreiben.

---

## Teil B — `analytics.ionos.de`: hier wird gemessen

Hier lässt sich nichts absichern. Zwei Dinge sind trotzdem zu tun.

### B1 · Bot-Traffic aus dem Reporting filtern (O6, M14)

**Wonach suchen:** in den Kontoeinstellungen oder Berichtsoptionen nach
„Robots", „Bots", „Filter" oder „Spam-Filter".

**Warum:** Die Analyse hat eine Absprungrate von 2,32 % bei 11 Sekunden
Sitzungsdauer gemessen — für eine echte Website unplausibel. Beide Werte
entstehen durch Bot-Sitzungen mit mehreren schnellen Requests. Solange der
Bot-Traffic nicht herausgerechnet ist, sind sämtliche Marketing-Kennzahlen
unbrauchbar. Geschätzt über 50 % des Gesamttraffics ist nicht-menschlich.

Falls sich Bots nicht ausfiltern lassen: wenigstens den Robot-Bericht separat
im Blick behalten und die Hauptkennzahlen mit dem Vorbehalt lesen.

---

### B2 · Wirkung der Härtung gegenprüfen

Das ist der eigentliche Grund, warum sich ein Blick in WebAnalytics jetzt
lohnt. Die Härtung ging am 12.08.2026 live. **Frühestens nach 7 Tagen**
(also ab dem 19.08.2026) sollte der Fehlerseiten-Bericht folgendes Bild
zeigen — im Vergleich zu den Zahlen der Analyse:

| Fehlerseite | vorher | erwartet nachher | warum |
|---|---:|---|---|
| `/` | **201** | **verschwindet ganz** | Der Soft-404 ist behoben. Unbekannte Pfade landen nicht mehr als HTTP 200 auf der Startseite. **Das ist der wichtigste Prüfwert.** |
| `/favicon.ico` | 35 | verschwindet | Datei existiert jetzt |
| `/robots.txt` | 25 | verschwindet | Datei existiert jetzt |
| `/th1s_1s_a_4o4.html` | 16 | bleibt, jetzt als echter 404 | Fingerprinting-Sonde, existiert weiterhin nicht |
| `/wp-admin/install.php` | 295 | **bleibt zunächst** | Wird jetzt mit 403 abgewiesen. Der Scanner sieht keinen Treffer mehr, hört aber nicht sofort auf zu fragen. |

**Wichtig zur Einordnung:** Eine 403-Antwort verhindert den *Erfolg* eines
Scans, nicht den *Versuch*. Die Zahl der Angriffsaufrufe sinkt dadurch nicht
sofort — sie sinkt erst, wenn Botnetze die Domain als unergiebig aussortieren,
und das dauert Wochen bis Monate. Wer nach einer Woche unveränderte
`wp-admin`-Zahlen sieht, sollte daraus **nicht** schließen, die Maßnahmen
wirkten nicht.

Zwei Werte, an denen sich die Wirkung wirklich ablesen lässt:

1. **`/` ist aus dem Fehlerseiten-Bericht verschwunden** → M6 greift.
2. **Kein Pfad aus dem Anhang der Analyse taucht in „meistbesuchte Seiten"
   auf** → nichts davon wird mehr mit 200 ausgeliefert.

Läuft eines von beiden anders, bitte melden — dann stimmt etwas mit der
ausgelieferten `.htaccess` nicht.

---

### B3 · Was WebAnalytics prinzipiell nicht kann

Damit dort nicht nach Antworten gesucht wird, die es nicht gibt. Laut
Abschnitt 2 der Analyse liefert IONOS WebAnalytics **nicht**:

- IP-Adressen und Geodaten
- HTTP-Statuscodes (404, 403 und 500 sind nicht unterscheidbar)
- Request-Methoden
- Zeitstempel auf Request-Ebene

Alles davon steht in den Roh-Logs (A2). Wer wissen will, aus welchen Netzen
die Scans kamen oder ob je ein Secret ausgeliefert wurde, kommt an A2 nicht
vorbei.

---

## Reihenfolge

1. **A1** — WAF prüfen und aktivieren. Der einzige Punkt, der die
   Angriffsoberfläche wirklich verkleinert.
2. **A2** — Logs holen und auswerten. Beantwortet die letzte offene
   Sicherheitsfrage.
3. **B1** — Bot-Filter, damit die Kennzahlen wieder brauchbar werden.
4. **B2** — ab 19.08.2026 gegenprüfen.
5. **A3, A4** — je nach gebuchtem Produkt.

---

## Als Auftrag für eine Claude-Sitzung mit Browserzugriff

Der folgende Text lässt sich unverändert in eine Sitzung mit
Browser-Zugriff geben (Claude in Chrome oder eine lokale Sitzung mit
aktiviertem Chrome-Connector), sobald die entsprechenden Seiten geöffnet sind:

> Ich habe herotax.de nach einer Sicherheitsanalyse gehärtet. Bitte prüfe im
> geöffneten IONOS-Konto und berichte, ohne Einstellungen zu verändern:
>
> **In `mein.ionos.de`:**
> 1. Gibt es im gebuchten Tarif eine Web Application Firewall, einen
>    Bot-Schutz oder DDoS-Schutz? Ist die Funktion enthalten, zubuchbar oder
>    nicht verfügbar — und ist sie eingeschaltet?
> 2. Wo lassen sich die Roh-Access-Logs herunterladen, und welcher Zeitraum
>    ist verfügbar? Ich brauche 02.08., 06.08. und 11.08.2026.
> 3. Handelt es sich um Shared-Webhosting oder um einen Managed/Root-Server?
>    Davon hängt ab, ob Fail2Ban und ServerTokens überhaupt möglich sind.
> 4. Gibt es automatische Backups des Webspace — wie viele Stände, wie lange
>    aufbewahrt?
>
> **In `analytics.ionos.de`:**
> 5. Lässt sich Bot-/Robot-Traffic aus den Berichten herausfiltern? Wenn ja,
>    wo?
> 6. Zeige mir den aktuellen Fehlerseiten-Bericht. Konkret: Taucht `/` noch
>    als Fehlerseite auf? Tauchen `/favicon.ico` und `/robots.txt` noch auf?
>
> Bitte nichts umstellen — nur berichten, was du siehst. Frage 6 ist erst ab
> dem 19.08.2026 aussagekräftig, weil die Härtung am 12.08.2026 live ging.

Der ausdrückliche Hinweis „nichts verändern" ist Absicht: Eine Prüfung soll
den Zustand feststellen, nicht verändern. Was danach umgestellt wird, sollte
eine bewusste Entscheidung sein — insbesondere bei kostenpflichtigen
Zubuchungen.
