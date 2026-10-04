import { ExternalLink, ShieldCheck } from "lucide-react";
import { ELECTION_CONFIG } from "../../../data/electionResults";

const LINKS = [
  {
    href: ELECTION_CONFIG.aghUrl,
    title: "20. Abgeordnetenhaus",
    detail: "Erst- & Zweitstimmen",
    cls: "bg-blue-500/15 hover:bg-blue-500/25 border-blue-500/40 text-blue-200",
    icon: "text-blue-400",
    detailCls: "text-slate-400",
  },
  {
    href: ELECTION_CONFIG.bvvUrl,
    title: "Bezirke (BVV)",
    detail: "12 Kommunalwahlen",
    cls: "bg-fuchsia-500/15 hover:bg-fuchsia-500/25 border-fuchsia-500/40 text-fuchsia-200",
    icon: "text-fuchsia-400",
    detailCls: "text-slate-400",
  },
  {
    href: ELECTION_CONFIG.rbbDashboardUrl,
    title: "rbb24 Wahlabend",
    detail: "Liveticker & Analyse",
    cls: "bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/40 text-amber-200",
    icon: "text-amber-400",
    detailCls: "text-amber-400",
  },
];

/** ElectionSourceLinks — amtliche Datenquellen und Portale. */
const ElectionSourceLinks = () => (
  <div className="relative z-10 pt-3 border-t border-slate-800 text-xs space-y-2">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
        <ShieldCheck size={13} className="text-amber-400" />
        Amtliche Daten &amp; Portale:
      </span>
      <span className="text-[10px] text-slate-400 font-mono">wahlen-berlin.de · rbb24.de</span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {LINKS.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-lg border hover:text-white text-[11px] font-mono flex items-center justify-between gap-1.5 transition-all ${l.cls}`}
        >
          <div className="truncate">
            <span className="font-bold block">{l.title}</span>
            <span className={`text-[10px] ${l.detailCls}`}>{l.detail}</span>
          </div>
          <ExternalLink size={12} className={`shrink-0 ${l.icon}`} />
        </a>
      ))}
    </div>
  </div>
);

export default ElectionSourceLinks;
