/* ── KONFIGURATION (hier alles Austauschbare pflegen) ──────────── */
export const CONFIG = {
  whatsappUrl: "https://whatsapp.com/channel/0029VbBwfND4o7qDJ1Wi6N2d",
  instagram: "https://instagram.com/herotaxberlin",
  tiktok: "https://tiktok.com/@herotaxberlin",
  handle: "@herotaxberlin",
  impressumName: "Orhan Kahraman",
  contactEmail: "orhanhero@outlook.de",

  /* Beehiiv/Substack:
     Option A (Embed): iframe-URL hier eintragen und im
       Newsletter-Abschnitt den Embed-Block aktivieren.
     Option B (API): Endpoint eintragen und in handleSubscribe()
       den fetch()-Block aktivieren.                              */
  newsletter: {
    beehiivEmbedUrl: "", // z.B. "https://embeds.beehiiv.com/xxxxxxxx"
    beehiivApiEndpoint: "", // z.B. "https://api.beehiiv.com/v2/publications/pub_xxx/subscriptions"
  },

  /* Plausible Analytics:
     Script gehört in die index.html:
     <script defer data-domain="herotax.de" src="https://plausible.io/js/script.js"></script>
     Events werden im Code via window.plausible?.() gefeuert.     */
  plausibleDomain: "herotax.de",
};
