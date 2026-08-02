import { T, fontDisplay, fontMono } from "../../config/tokens";

/* ── Datenschutzerklärung ──────────────────────────────────────────
   Rechtstext erstellt mit dem Generator von e-recht24.de auf Basis
   der vom Betreiber gemachten Angaben. Der Wortlaut wird hier
   unverändert übernommen — Änderungen an diesem Text sollten über
   den e-recht24-Generator erfolgen, damit die Erklärung weiterhin
   dem dortigen Stand entspricht.
   ────────────────────────────────────────────────────────────────── */

const H2 = ({ children }) => (
  <h2
    className="text-2xl sm:text-3xl font-black tracking-tight mt-14 mb-5 first:mt-0"
    style={{ ...fontDisplay, color: T.text }}
  >
    {children}
  </h2>
);

const H3 = ({ children }) => (
  <h3 className="text-lg font-bold mt-9 mb-3" style={{ ...fontDisplay, color: T.text }}>
    {children}
  </h3>
);

const P = ({ children }) => (
  <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: T.muted }}>
    {children}
  </p>
);

const Ul = ({ children }) => (
  <ul className="list-disc pl-5 space-y-2 mb-4 text-sm sm:text-base leading-relaxed" style={{ color: T.muted }}>
    {children}
  </ul>
);

const A = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline underline-offset-2 hover:opacity-70 break-words"
    style={{ color: T.blue }}
  >
    {children}
  </a>
);

/** Für gesetzlich vorgeschriebene Hervorhebungen (Art. 21 DSGVO) */
const Emphasis = ({ children }) => (
  <p
    className="text-xs sm:text-sm leading-relaxed mb-4 uppercase font-semibold rounded-2xl p-5"
    style={{ color: T.text, backgroundColor: T.wash, border: `1px solid ${T.lineSoft}` }}
  >
    {children}
  </p>
);

export default function DatenschutzPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
      <a
        href="/"
        className="inline-flex items-center gap-1.5 text-xs mb-10 hover:underline underline-offset-4"
        style={{ ...fontMono, color: T.faint }}
      >
        ← Zurück zur Startseite
      </a>

      <div className="max-w-3xl">
        <p className="text-xs tracking-widest uppercase mb-3" style={{ ...fontMono, color: T.blue }}>
          Rechtliches
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-12" style={{ ...fontDisplay, color: T.text }}>
          Datenschutzerklärung
        </h1>

        <H2>1. Datenschutz auf einen Blick</H2>

        <H3>Allgemeine Hinweise</H3>
        <P>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
          passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
          persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie
          unserer unter diesem Text aufgeführten Datenschutzerklärung.
        </P>

        <H3>Datenerfassung auf dieser Website</H3>
        <p className="font-semibold text-sm mb-2" style={{ color: T.text }}>
          Wer ist verantwortlich für die Datenerfassung auf dieser Website?
        </p>
        <P>
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können
          Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
        </P>
        <p className="font-semibold text-sm mb-2" style={{ color: T.text }}>
          Wie erfassen wir Ihre Daten?
        </p>
        <P>
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um
          Daten handeln, die Sie in ein Kontaktformular eingeben.
        </P>
        <P>
          Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
          IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit
          des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
        </P>
        <p className="font-semibold text-sm mb-2" style={{ color: T.text }}>
          Wofür nutzen wir Ihre Daten?
        </p>
        <P>
          Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere
          Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge
          geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote,
          Bestellungen oder sonstige Auftragsanfragen verarbeitet.
        </P>
        <p className="font-semibold text-sm mb-2" style={{ color: T.text }}>
          Welche Rechte haben Sie bezüglich Ihrer Daten?
        </p>
        <P>
          Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
          gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder
          Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können
          Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter
          bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
        </P>
        <P>Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.</P>

        <H2>2. Hosting</H2>
        <P>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</P>
        <H3>IONOS</H3>
        <P>
          Anbieter ist die IONOS SE, Elgendorfer Str. 57, 56410 Montabaur (nachfolgend IONOS). Wenn Sie unsere
          Website besuchen, erfasst IONOS verschiedene Logfiles inklusive Ihrer IP-Adressen. Details entnehmen Sie
          der Datenschutzerklärung von IONOS: <A href="https://www.ionos.de/terms-gtc/terms-privacy">https://www.ionos.de/terms-gtc/terms-privacy</A>.
        </P>
        <P>
          Die Verwendung von IONOS erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes
          Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine entsprechende
          Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a
          DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf
          Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die
          Einwilligung ist jederzeit widerrufbar.
        </P>
        <p className="font-semibold text-sm mb-2" style={{ color: T.text }}>
          Auftragsverarbeitung
        </p>
        <P>
          Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes
          geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der
          gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren
          Weisungen und unter Einhaltung der DSGVO verarbeitet.
        </P>

        <H2>3. Allgemeine Hinweise und Pflichtinformationen</H2>

        <H3>Datenschutz</H3>
        <P>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
          personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie
          dieser Datenschutzerklärung.
        </P>
        <P>
          Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene
          Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende
          Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie
          und zu welchem Zweck das geschieht.
        </P>
        <P>
          Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail)
          Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
          möglich.
        </P>

        <H3>Hinweis zur verantwortlichen Stelle</H3>
        <P>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</P>
        <div className="rounded-2xl p-5 mb-4" style={{ backgroundColor: T.wash, border: `1px solid ${T.lineSoft}` }}>
          <p className="text-sm leading-relaxed" style={{ color: T.text }}>
            Orhan Kahraman
            <br />
            Weichselstr. 41
            <br />
            12045 Berlin
            <br />
            <br />
            E-Mail: <A href="mailto:herotax@outlook.de">herotax@outlook.de</A>
          </p>
        </div>
        <P>
          Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen
          über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen
          o. Ä.) entscheidet.
        </P>

        <H3>Speicherdauer</H3>
        <P>
          Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben
          Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein
          berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen,
          werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer
          personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im
          letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
        </P>

        <H3>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</H3>
        <P>
          Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf
          Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien
          nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung
          personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49
          Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr
          Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf
          Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur
          Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre
          Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese
          zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind, auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO.
          Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f
          DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden
          Absätzen dieser Datenschutzerklärung informiert.
        </P>

        <H3>Empfänger von personenbezogenen Daten</H3>
        <P>
          Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei
          ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich.
          Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer
          Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten
          an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe
          haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von
          Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen
          Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über
          gemeinsame Verarbeitung geschlossen.
        </P>

        <H3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</H3>
        <P>
          Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine
          bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
          Datenverarbeitung bleibt vom Widerruf unberührt.
        </P>

        <H3>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</H3>
        <Emphasis>
          Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie
          jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die
          Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein auf diese
          Bestimmungen gestütztes Profiling. Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht,
          entnehmen Sie dieser Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen
          personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige
          Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen oder die
          Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch
          nach Art. 21 Abs. 1 DSGVO).
        </Emphasis>
        <Emphasis>
          Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, so haben Sie das
          Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum
          Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher
          Direktwerbung in Verbindung steht. Wenn Sie widersprechen, werden Ihre personenbezogenen Daten
          anschließend nicht mehr zum Zwecke der Direktwerbung verwendet (Widerspruch nach Art. 21 Abs. 2
          DSGVO).
        </Emphasis>

        <H3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</H3>
        <P>
          Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
          Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes
          oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger
          verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
        </P>

        <H3>Recht auf Datenübertragbarkeit</H3>
        <P>
          Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags
          automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format
          aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen
          verlangen, erfolgt dies nur, soweit es technisch machbar ist.
        </P>

        <H3>Auskunft, Berichtigung und Löschung</H3>
        <P>
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
          Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den
          Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie
          zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
        </P>

        <H3>Recht auf Einschränkung der Verarbeitung</H3>
        <P>
          Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in
          folgenden Fällen:
        </P>
        <Ul>
          <li>
            Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir
            in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die
            Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          </li>
          <li>
            Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie
            statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
          </li>
          <li>
            Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung,
            Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der
            Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          </li>
          <li>
            Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen
            Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen
            überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
            zu verlangen.
          </li>
        </Ul>
        <P>
          Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von
          ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder
          Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder
          juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder
          eines Mitgliedstaats verarbeitet werden.
        </P>

        <H3>SSL- bzw. TLS-Verschlüsselung</H3>
        <P>
          Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum
          Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw.
          TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
          von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
        </P>
        <P>
          Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht
          von Dritten mitgelesen werden.
        </P>

        <H3>Widerspruch gegen Werbe-E-Mails</H3>
        <P>
          Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von
          nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die
          Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung
          von Werbeinformationen, etwa durch Spam-E-Mails, vor.
        </P>

        <H2>4. Datenerfassung auf dieser Website</H2>
        <H3>Cookies</H3>
        <P>
          Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten auf
          Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung
          (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies
          werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät
          gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
        </P>
        <P>
          Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog.
          Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von
          Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen).
        </P>
        <P>
          Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte
          Webseitenfunktionen ohne diese nicht funktionieren würden (z. B. die Warenkorbfunktion oder die Anzeige
          von Videos). Andere Cookies können zur Auswertung des Nutzerverhaltens oder zu Werbezwecken
          verwendet werden.
        </P>
        <P>
          Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur Bereitstellung
          bestimmter, von Ihnen erwünschter Funktionen (z. B. für die Warenkorbfunktion) oder zur Optimierung der
          Website (z. B. Cookies zur Messung des Webpublikums) erforderlich sind (notwendige Cookies), werden auf
          Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird.
          Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von notwendigen Cookies zur
          technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur
          Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die
          Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1
          TDDDG); die Einwilligung ist jederzeit widerrufbar.
        </P>
        <P>
          Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und
          Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell
          ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der
          Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
        </P>
        <P>
          Sofern weitere Cookies und Dienste auf dieser Website eingesetzt werden, können Sie dies dieser
          Datenschutzerklärung entnehmen.
        </P>

        <H2>5. Soziale Medien</H2>
        <H3>Instagram</H3>
        <P>
          Auf dieser Website sind Funktionen des Dienstes Instagram eingebunden. Diese Funktionen werden
          angeboten durch die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland.
        </P>
        <P>
          Wenn das Social-Media-Element aktiv ist, wird eine direkte Verbindung zwischen Ihrem Endgerät und dem
          Instagram-Server hergestellt. Instagram erhält dadurch Informationen über den Besuch dieser Website
          durch Sie.
        </P>
        <P>
          Wenn Sie in Ihrem Instagram-Account eingeloggt sind, können Sie durch Anklicken des Instagram-Buttons
          die Inhalte dieser Website mit Ihrem Instagram-Profil verlinken. Dadurch kann Instagram den Besuch dieser
          Website Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine
          Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Instagram erhalten.
        </P>
        <P>
          Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und §
          25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.
        </P>
        <P>
          Soweit mit Hilfe des hier beschriebenen Tools personenbezogene Daten auf unserer Website erfasst und an
          Facebook bzw. Instagram weitergeleitet werden, sind wir und die Meta Platforms Ireland Limited, Merrion
          Road Dublin 4, Dublin, D04 X2K5, Irland gemeinsam für diese Datenverarbeitung verantwortlich (Art. 26
          DSGVO). Die gemeinsame Verantwortlichkeit beschränkt sich dabei ausschließlich auf die Erfassung der
          Daten und deren Weitergabe an Facebook bzw. Instagram. Die nach der Weiterleitung erfolgende
          Verarbeitung durch Facebook bzw. Instagram ist nicht Teil der gemeinsamen Verantwortung. Die uns
          gemeinsam obliegenden Verpflichtungen wurden in einer Vereinbarung über gemeinsame Verarbeitung
          festgehalten. Den Wortlaut der Vereinbarung finden Sie unter:{" "}
          <A href="https://www.facebook.com/legal/controller_addendum">https://www.facebook.com/legal/controller_addendum</A>.
          Laut dieser Vereinbarung sind wir für die Erteilung der Datenschutzinformationen beim Einsatz des
          Facebook- bzw. Instagram-Tools und für die datenschutzrechtlich sichere Implementierung des Tools auf
          unserer Website verantwortlich. Für die Datensicherheit der Facebook bzw. Instagram-Produkte ist
          Facebook verantwortlich. Betroffenenrechte (z. B. Auskunftsersuchen) hinsichtlich der bei Facebook bzw.
          Instagram verarbeiteten Daten können Sie direkt bei Facebook geltend machen. Wenn Sie die
          Betroffenenrechte bei uns geltend machen, sind wir verpflichtet, diese an Facebook weiterzuleiten.
        </P>
        <P>
          Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt.
          Details finden Sie hier:{" "}
          <A href="https://www.facebook.com/legal/EU_data_transfer_addendum">https://www.facebook.com/legal/EU_data_transfer_addendum</A>,{" "}
          <A href="https://privacycenter.instagram.com/policy/">https://privacycenter.instagram.com/policy/</A> und{" "}
          <A href="https://de-de.facebook.com/help/566994660333381">https://de-de.facebook.com/help/566994660333381</A>.
        </P>
        <P>
          Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Instagram:{" "}
          <A href="https://privacycenter.instagram.com/policy/">https://privacycenter.instagram.com/policy/</A>.
        </P>
        <P>
          Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework" (DPF). Der
          DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung
          europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll. Jedes nach
          dem DPF zertifizierte Unternehmen verpflichtet sich, diese Datenschutzstandards einzuhalten. Weitere
          Informationen hierzu erhalten Sie vom Anbieter unter folgendem Link:{" "}
          <A href="https://www.dataprivacyframework.gov/participant/4452">https://www.dataprivacyframework.gov/participant/4452</A>.
        </P>

        <H2>6. Analyse-Tools und Werbung</H2>
        <H3>IONOS WebAnalytics</H3>
        <P>
          Diese Website nutzt die Analysedienste von IONOS WebAnalytics (im Folgenden: IONOS). Anbieter ist die
          1&amp;1 IONOS SE, Elgendorfer Straße 57, D – 56410 Montabaur. Im Rahmen der Analysen mit IONOS können
          u. a. Besucherzahlen und -verhalten (z. B. Anzahl der Seitenaufrufe, Dauer eines Webseitenbesuchs,
          Absprungraten), Besucherquellen (d. h., von welcher Seite der Besucher kommt), Besucherstandorte sowie
          technische Daten (Browser- und Betriebssystemversionen) analysiert werden. Zu diesem Zweck speichert
          IONOS insbesondere folgende Daten:
        </P>
        <Ul>
          <li>Referrer (zuvor besuchte Webseite)</li>
          <li>angeforderte Webseite oder Datei</li>
          <li>Browsertyp und Browserversion</li>
          <li>verwendetes Betriebssystem</li>
          <li>verwendeter Gerätetyp</li>
          <li>Uhrzeit des Zugriffs</li>
          <li>IP-Adresse in anonymisierter Form (wird nur zur Feststellung des Orts des Zugriffs verwendet)</li>
        </Ul>
        <P>
          Die Datenerfassung erfolgt laut IONOS vollständig anonymisiert, sodass sie nicht zu einzelnen Personen
          zurückverfolgt werden kann. Cookies werden von IONOS WebAnalytics nicht gespeichert.
        </P>
        <P>
          Die Speicherung und Analyse der Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der
          Websitebetreiber hat ein berechtigtes Interesse an der statistischen Analyse des Nutzerverhaltens, um
          sowohl sein Webangebot als auch seine Werbung zu optimieren. Sofern eine entsprechende Einwilligung
          abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und §
          25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen
          im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist
          jederzeit widerrufbar.
        </P>
        <P>
          Weitere Informationen zur Datenerfassung und Verarbeitung durch IONOS WebAnalytics entnehmen Sie der
          Datenschutzerklärung von IONOS unter folgendem Link:{" "}
          <A href="https://www.ionos.de/terms-gtc/datenschutzerklaerung/">https://www.ionos.de/terms-gtc/datenschutzerklaerung/</A>
        </P>
        <p className="font-semibold text-sm mb-2" style={{ color: T.text }}>
          Auftragsverarbeitung
        </p>
        <P>
          Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes
          geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der
          gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren
          Weisungen und unter Einhaltung der DSGVO verarbeitet.
        </P>

        <H2>7. Newsletter</H2>
        <H3>Newsletterdaten</H3>
        <P>
          Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine
          E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der
          angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind. Weitere
          Daten werden nicht bzw. nur auf freiwilliger Basis erhoben. Diese Daten verwenden wir ausschließlich für
          den Versand der angeforderten Informationen und geben diese nicht an Dritte weiter.
        </P>
        <P>
          Die Verarbeitung der in das Newsletteranmeldeformular eingegebenen Daten erfolgt ausschließlich auf
          Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Die erteilte Einwilligung zur Speicherung der
          Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand des Newsletters können Sie jederzeit
          widerrufen, etwa über den „Austragen"-Link im Newsletter. Die Rechtmäßigkeit der bereits erfolgten
          Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.
        </P>
        <P>
          Die von Ihnen zum Zwecke des Newsletter-Bezugs bei uns hinterlegten Daten werden von uns bis zu Ihrer
          Austragung aus dem Newsletter bei uns bzw. dem Newsletterdiensteanbieter gespeichert und nach der
          Abbestellung des Newsletters oder nach Zweckfortfall aus der Newsletterverteilerliste gelöscht. Wir
          behalten uns vor, E-Mail-Adressen aus unserem Newsletterverteiler nach eigenem Ermessen im Rahmen
          unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO zu löschen oder zu sperren.
        </P>
        <P>Daten, die zu anderen Zwecken bei uns gespeichert wurden, bleiben hiervon unberührt.</P>
        <P>
          Nach Ihrer Austragung aus der Newsletterverteilerliste wird Ihre E-Mail-Adresse bei uns bzw. dem
          Newsletterdiensteanbieter ggf. in einer Blacklist gespeichert, sofern dies zur Verhinderung künftiger
          Mailings erforderlich ist. Die Daten aus der Blacklist werden nur für diesen Zweck verwendet und nicht mit
          anderen Daten zusammengeführt. Dies dient sowohl Ihrem Interesse als auch unserem Interesse an der
          Einhaltung der gesetzlichen Vorgaben beim Versand von Newslettern (berechtigtes Interesse im Sinne des
          Art. 6 Abs. 1 lit. f DSGVO). Die Speicherung in der Blacklist ist zeitlich nicht befristet. Sie können der
          Speicherung widersprechen, sofern Ihre Interessen unser berechtigtes Interesse überwiegen.
        </P>

        <H2>8. Plugins und Tools</H2>
        <H3>YouTube mit erweitertem Datenschutz</H3>
        <P>
          Diese Website bindet Videos der Website YouTube ein. Betreiber der Website ist die Google Ireland Limited
          („Google"), Gordon House, Barrow Street, Dublin 4, Irland.
        </P>
        <P>
          Wenn Sie eine dieser Website besuchen, auf denen YouTube eingebunden ist, wird eine Verbindung zu den
          Servern von YouTube hergestellt. Dabei wird dem YouTube-Server mitgeteilt, welche unserer Seiten Sie
          besucht haben. Wenn Sie in Ihrem YouTube-Account eingeloggt sind, ermöglichen Sie YouTube, Ihr
          Surfverhalten direkt Ihrem persönlichen Profil zuzuordnen. Dies können Sie verhindern, indem Sie sich aus
          Ihrem YouTube-Account ausloggen.
        </P>
        <P>
          Wir nutzen YouTube im erweiterten Datenschutzmodus. Videos, die im erweiterten Datenschutzmodus
          abgespielt werden, werden nach Aussage von YouTube nicht zur Personalisierung des Surfens auf YouTube
          eingesetzt. Anzeigen, die im erweiterten Datenschutzmodus ausgespielt werden, sind ebenfalls nicht
          personalisiert. Im erweiterten Datenschutzmodus werden keine Cookies gesetzt. Stattdessen werden
          jedoch sogenannte Local Storage Elemente im Browser des Users gespeichert, die ähnlich wie Cookies
          personenbezogene Daten beinhalten und zur Wiedererkennung eingesetzt werden können. Details zum
          erweiterten Datenschutzmodus finden Sie hier:{" "}
          <A href="https://support.google.com/youtube/answer/171780">https://support.google.com/youtube/answer/171780</A>.
        </P>
        <P>
          Gegebenenfalls können nach der Aktivierung eines YouTube-Videos weitere Datenverarbeitungsvorgänge
          ausgelöst werden, auf die wir keinen Einfluss haben.
        </P>
        <P>
          Die Nutzung von YouTube erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote.
          Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende
          Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a
          DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf
          Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die
          Einwilligung ist jederzeit widerrufbar.
        </P>
        <P>
          Weitere Informationen über Datenschutz bei YouTube finden Sie in deren Datenschutzerklärung unter:{" "}
          <A href="https://policies.google.com/privacy?hl=de">https://policies.google.com/privacy?hl=de</A>.
        </P>
        <P>
          Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework" (DPF). Der
          DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung
          europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll. Jedes nach
          dem DPF zertifizierte Unternehmen verpflichtet sich, diese Datenschutzstandards einzuhalten. Weitere
          Informationen hierzu erhalten Sie vom Anbieter unter folgendem Link:{" "}
          <A href="https://www.dataprivacyframework.gov/participant/5780">https://www.dataprivacyframework.gov/participant/5780</A>.
        </P>

        <H3>Google Fonts (lokales Hosting)</H3>
        <P>
          Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die von Google
          bereitgestellt werden. Die Google Fonts sind lokal installiert. Eine Verbindung zu Servern von Google
          findet dabei nicht statt.
        </P>
        <P>
          Weitere Informationen zu Google Fonts finden Sie unter{" "}
          <A href="https://developers.google.com/fonts/faq">https://developers.google.com/fonts/faq</A> und in der
          Datenschutzerklärung von Google: <A href="https://policies.google.com/privacy?hl=de">https://policies.google.com/privacy?hl=de</A>.
        </P>

        <p className="text-xs mt-14 pt-8" style={{ ...fontMono, color: T.faint, borderTop: `1px solid ${T.lineSoft}` }}>
          Erstellt mit dem Datenschutz-Generator von{" "}
          <A href="https://www.e-recht24.de">e-recht24.de</A>.
        </p>
      </div>
    </div>
  );
}
