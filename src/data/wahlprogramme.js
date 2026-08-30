/**
 * Data: Wahlprogramme & Spitzenkandidaten der Berliner Parteien für die Wahl zum Regierenden Bürgermeister
 * Stand: August 2026
 */

export const WAHLPROGRAMME_DATA = {
  title: "Wahlprogramme & Spitzenkandidaten 2026",
  subtitle: "Berliner Abgeordnetenhauswahl · Führung im Roten Rathaus",
  lastUpdated: "22. August 2026",
  wahlOMatDate: "24.08.2026",
  wahlOMatUrl: "https://www.wahl-o-mat.de/berlin2026/",
  parties: [
    {
      id: "cdu",
      name: "CDU Berlin",
      shortName: "CDU",
      color: "#0054A6",
      bgGradient: "from-blue-950/60 via-slate-900/90 to-slate-900",
      borderColor: "border-blue-500/40",
      hoverBorderColor: "hover:border-blue-400/70",
      accentColor: "text-blue-400",
      badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      tabActive: "bg-blue-600 text-white shadow-lg shadow-blue-900/30",
      website: "https://cdu.berlin/",
      wahlprogrammUrl: "https://berlin-wird.de/image/uploads/data/regierungsprogramm2026_2031.pdf",
      wahlprogrammTitle: "Regierungsprogramm 2026–2031 (PDF)",
      candidate: {
        name: "Stefan Evers",
        party: "CDU",
        role: "Spitzenkandidat für das Rote Rathaus",
        description: "Aktueller Finanz- und Kultursenator; er übernahm die Spitzenkandidatur nach dem überraschenden Rückzug des Regierenden Bürgermeisters Kai Wegner im Juli 2026.",
        website: "https://www.stefan-evers.de/"
      }
    },
    {
      id: "spd",
      name: "SPD Berlin",
      shortName: "SPD",
      color: "#E3000F",
      bgGradient: "from-red-950/60 via-slate-900/90 to-slate-900",
      borderColor: "border-red-500/40",
      hoverBorderColor: "hover:border-red-400/70",
      accentColor: "text-red-400",
      badgeBg: "bg-red-500/20 text-red-300 border-red-500/40",
      tabActive: "bg-red-600 text-white shadow-lg shadow-red-900/30",
      website: "https://spd.berlin/",
      wahlprogrammUrl: "https://spd.berlin/media/2026/08/SPD_Berlin_Wahlprogramm_20260521-v4-1.pdf",
      wahlprogrammTitle: "SPD Berlin Wahlprogramm 2026 (PDF)",
      candidate: {
        name: "Steffen Krach",
        party: "SPD",
        role: "Spitzenkandidat für das Rote Rathaus",
        description: "Regionspräsident von Hannover, der für die Berliner SPD das Rote Rathaus zurückerobern soll.",
        website: "https://spd.berlin/steffen-krach/"
      }
    },
    {
      id: "gruene",
      name: "Bündnis 90/Die Grünen Berlin",
      shortName: "Grüne",
      color: "#46962B",
      bgGradient: "from-emerald-950/60 via-slate-900/90 to-slate-900",
      borderColor: "border-emerald-500/40",
      hoverBorderColor: "hover:border-emerald-400/70",
      accentColor: "text-emerald-400",
      badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      tabActive: "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30",
      website: "https://gruene.berlin/",
      wahlprogrammUrl: "https://gruene.berlin/fileadmin/BE/lv_berlin/files/Wahlprogramm_2026_Online.pdf",
      wahlprogrammTitle: "Wahlprogramm 2026 Online (PDF)",
      candidate: {
        name: "Werner Graf",
        party: "Grüne",
        role: "Nominierter Kandidat für den Regierenden Bürgermeister",
        description: "Tritt offiziell im Spitzenduo mit Bettina Jarasch an, ist jedoch der nominierte Kandidat für das Amt des Regierenden Bürgermeisters.",
        website: "https://werner-graf.net/"
      }
    },
    {
      id: "dielinke",
      name: "Die Linke Berlin",
      shortName: "Die Linke",
      color: "#BE3075",
      bgGradient: "from-rose-950/60 via-slate-900/90 to-slate-900",
      borderColor: "border-rose-500/40",
      hoverBorderColor: "hover:border-rose-400/70",
      accentColor: "text-rose-400",
      badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      tabActive: "bg-rose-600 text-white shadow-lg shadow-rose-900/30",
      website: "https://dielinke.berlin/",
      wahlprogrammUrl: "https://dielinke.berlin/fileadmin/download/2026/0106_Wahlprogramm_LVB_A5.pdf",
      wahlprogrammTitle: "Wahlprogramm LVB 2026 (PDF)",
      candidate: {
        name: "Elif Eralp",
        party: "Die Linke",
        role: "Spitzenkandidatin für das Rote Rathaus",
        description: "Juristin und Abgeordnete, die die Berliner Linke erstmals als Spitzenkandidatin anführt.",
        website: "https://elif-fuer-berlin.de/"
      }
    },
    {
      id: "afd",
      name: "AfD Berlin",
      shortName: "AfD",
      color: "#009EE0",
      bgGradient: "from-sky-950/60 via-slate-900/90 to-slate-900",
      borderColor: "border-sky-500/40",
      hoverBorderColor: "hover:border-sky-400/70",
      accentColor: "text-sky-400",
      badgeBg: "bg-sky-500/20 text-sky-300 border-sky-500/40",
      tabActive: "bg-sky-600 text-white shadow-lg shadow-sky-900/30",
      website: "https://afd.berlin/",
      wahlprogrammUrl: "https://afd.berlin/abgeordnetenhauswahl/#flipbook-df_1783/1/",
      wahlprogrammTitle: "Wahlprogramm 2026 (Flipbook)",
      candidate: {
        name: "Dr. Kristin Brinker",
        party: "AfD",
        role: "Spitzenkandidatin für das Rote Rathaus",
        description: "Fraktions- und Parteichefin der Berliner AfD, die bereits zum dritten Mal als Spitzenkandidatin antrat/antritt.",
        website: "https://afd.berlin/dr-kristin-brinker/"
      }
    }
  ]
};
