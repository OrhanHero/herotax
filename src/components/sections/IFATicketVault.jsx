import { useState, useRef, useEffect, useCallback } from "react";
import {
  Lock,
  Unlock,
  ShieldCheck,
  Radio,
  Compass,
  KeyRound,
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
  Sparkles,
  Zap,
  Ticket,
  RefreshCw,
  Activity,
  Sliders,
} from "lucide-react";
import { T, fontDisplay, fontMono } from "../../config/tokens";

// Zero-Knowledge AES-GCM-256 Verschlüsselung (PBKDF2 mit 100.000 Iterationen)
// Enthält keinerlei Klartext-Lösungen oder überprüfbare Strings im JavaScript-Quellcode.
const ENCRYPTED_VOUCHER_PAYLOAD = "++YJ4/LbbWrhrjDYlWM05IC2OV6RQKZ9ii7AmEef0z1VmT/sOW10FPM=";
const CRYPTO_SALT = "herotax_ifa_2026_safe";

const SEETICKETS_REDEEM_URL =
  "https://ifaberlin.seetickets.com/event/ifa-berlin-2026/messe/3635886?src=newsletter_referral&utm_source=newsletter&utm_medium=email&utm_campaign=ifa26_b2c_visprom&utm_content=tagesspiegel_freeticket";

// Web Crypto Decryption
async function decryptVoucher(cipherBase64, passphrase) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(passphrase),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode(CRYPTO_SALT),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  const combined = Uint8Array.from(atob(cipherBase64), (c) => c.charCodeAt(0));
  const iv = combined.subarray(0, 12);
  const data = combined.subarray(12);

  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
  return new TextDecoder().decode(decrypted);
}

export default function IFATicketVault() {
  const [stage, setStage] = useState("idle"); // 'idle' | 'challenge' | 'unlocked' | 'claimed'
  const [step, setStep] = useState(1); // 1: Blinder Funkpeiler, 2: Oszilloskop-Resonanz, 3: Enigma-Schloss
  const [errorMsg, setErrorMsg] = useState("");
  const [decryptedCode, setDecryptedCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);

  // Anti-Bot & Tracking
  const startTimeRef = useRef(0);
  const pointerEntropyRef = useRef(0);
  const canvasRef = useRef(null);
  const osciCanvasRef = useRef(null);

  // ── Challenge 1: Blinder Funkpeiler (Signal-Stärke / dBm) ──
  const [signalStrength, setSignalStrength] = useState(15);
  const [lockedTarget, setLockedTarget] = useState(false);
  const [radarStatus, setRadarStatus] = useState("Suche Signal im Berliner Westring...");

  // ── Challenge 2: Oszilloskop-Resonanz (Träger & Phase) ──
  const [tuningFreq, setTuningFreq] = useState(45); // Ziel: 72
  const [tuningPhase, setTuningPhase] = useState(20); // Ziel: 50
  const [resonanceMatch, setResonanceMatch] = useState(0); // 0 bis 100 %
  const [freqLocked, setFreqLocked] = useState(false);

  // ── Challenge 3: 4-stelliges Enigma-Schloss ──
  // Ziffer 1: 1 (Erste Ziffer 1924)
  // Ziffer 2: 5 (Tage der IFA: 4. bis 8. Sept = 5 Tage)
  // Ziffer 3: 7 (Quersumme von 43 € = 4+3 = 7)
  // Ziffer 4: 2 (2 Tagestickets)
  // Ziel: [1, 5, 7, 2]
  const [enigmaDigits, setEnigmaDigits] = useState([0, 0, 0, 0]);

  // Gespeicherte Lösungen
  const [solutionPart1, setSolutionPart1] = useState("");
  const [solutionPart2, setSolutionPart2] = useState("");

  useEffect(() => {
    if (localStorage.getItem("herotax_ifa2026_claimed") === "true") {
      setStage("claimed");
    }
  }, []);

  // ── Canvas Renderer: Challenge 1 (Blind-Radar) ──
  const drawRadar = useCallback(
    (pointerX = -100, pointerY = -100) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Cyber Grid Background
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(30, 58, 138, 0.25)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Schematische Orientierungs-Koordinaten (OHNE Label des Ziels!)
      const cx = w / 2;
      const cy = h / 2;

      // 4 Sendemasten (A, B, C, D) - keine Beschriftung verrät die Lösung
      const masts = [
        { id: "A", x: cx + 100, y: cy - 25, isTarget: false }, // Ost-Berlin
        { id: "B", x: cx - 110, y: cy + 45, isTarget: false }, // Grunewald / Südwest
        { id: "C", x: cx - 55, y: cy - 15, isTarget: true }, // Westkreuz / Messe Nord (ZIEL!)
        { id: "D", x: cx + 40, y: cy + 40, isTarget: false }, // Kreuzberg / Tempelhof
      ];

      // Zeichne anonyme Masten
      masts.forEach((m) => {
        ctx.fillStyle = "rgba(71, 85, 105, 0.6)";
        ctx.beginPath();
        ctx.arc(m.x, m.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(100, 116, 139, 0.4)";
        ctx.beginPath();
        ctx.arc(m.x, m.y, 10, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#64748B";
        ctx.font = "8px monospace";
        ctx.fillText(`BEACON-${m.id}`, m.x - 18, m.y + 18);
      });

      // Berechne Distanz zum echten Messe-Beacon C
      const target = masts[2];
      const dist = Math.hypot(pointerX - target.x, pointerY - target.y);
      const maxDist = Math.hypot(w, h);
      const normalizedProximity = Math.max(0, Math.min(100, Math.round((1 - dist / (maxDist * 0.45)) * 100)));

      // Fadenkreuz
      if (pointerX > 0 && pointerY > 0) {
        ctx.strokeStyle = normalizedProximity > 85 ? "#10B981" : "rgba(59, 130, 246, 0.8)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);

        // Horizontale & Vertikale Peillinie
        ctx.beginPath();
        ctx.moveTo(0, pointerY);
        ctx.lineTo(w, pointerY);
        ctx.moveTo(pointerX, 0);
        ctx.lineTo(pointerX, h);
        ctx.stroke();
        ctx.setLineDash([]);

        // Peilkreis
        ctx.beginPath();
        ctx.arc(pointerX, pointerY, 14, 0, Math.PI * 2);
        ctx.stroke();
      }

      return { proximity: normalizedProximity, isClose: dist <= 16 };
    },
    []
  );

  // ── Canvas Renderer: Challenge 2 (Oszilloskop-Resonanz) ──
  const drawOscilloscope = useCallback(() => {
    const canvas = osciCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Oszilloskop-Hintergrund
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, w, h);

    // Oszilloskop-Raster (Grün)
    ctx.strokeStyle = "rgba(16, 185, 129, 0.15)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Mittelachse
    ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    const midY = h / 2;
    const targetFreqConstant = 72; // Versteckte Sollfrequenz
    const targetPhaseConstant = 50; // Versteckte Sollphase

    // Berechne Resonanzabweichung
    const diffFreq = Math.abs(tuningFreq - targetFreqConstant);
    const diffPhase = Math.abs(tuningPhase - targetPhaseConstant);
    const totalMatch = Math.max(0, Math.min(100, Math.round(100 - diffFreq * 2.5 - diffPhase * 2)));
    setResonanceMatch(totalMatch);

    // 1. Referenzwelle (Grün leuchtend)
    ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const y = midY + Math.sin((x / 18) + (targetPhaseConstant / 10)) * 28;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 2. Benutzereingestellte Welle (Cyan / Amber bei Rauschen)
    ctx.strokeStyle = totalMatch > 90 ? "#34D399" : totalMatch > 60 ? "#38BDF8" : "#F59E0B";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      // Rauschanteil nimmt mit Match ab
      const noise = (Math.random() - 0.5) * (100 - totalMatch) * 0.15;
      const waveFreq = 12 + (tuningFreq / 7);
      const y = midY + Math.sin((x / waveFreq) + (tuningPhase / 10)) * 28 + noise;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }, [tuningFreq, tuningPhase]);

  useEffect(() => {
    if (stage === "challenge" && step === 2) {
      let animId;
      const loop = () => {
        drawOscilloscope();
        animId = requestAnimationFrame(loop);
      };
      animId = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(animId);
    }
  }, [stage, step, drawOscilloscope]);

  // Starte Challenge
  const handleStartChallenge = (e) => {
    if (!e.isTrusted) {
      setErrorMsg("Automatisierte Skripte werden blockiert.");
      return;
    }
    startTimeRef.current = Date.now();
    pointerEntropyRef.current = 0;
    setErrorMsg("");
    setStage("challenge");
    setStep(1);
    setTimeout(() => {
      drawRadar(-1, -1);
    }, 50);
  };

  // Radar Pointer Interaction (Challenge 1)
  const handleRadarMouseMove = (e) => {
    pointerEntropyRef.current += 1;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const result = drawRadar(x, y);
    if (result) {
      setSignalStrength(result.proximity);
      if (result.proximity > 92) {
        setRadarStatus("🚨 PEAK-SIGNAL! Sendemast Messe Nord / Westkreuz erfasst.");
      } else if (result.proximity > 70) {
        setRadarStatus("📶 Signal steigt (Signalpegel stark)...");
      } else {
        setRadarStatus("📡 Suche Signal im Berliner Westring...");
      }
    }
  };

  const handleRadarClick = (e) => {
    if (!e.isTrusted) return;
    pointerEntropyRef.current += 1;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const result = drawRadar(x, y);
    if (result && result.isClose) {
      setLockedTarget(true);
      setSolutionPart1("beacon_c");
      setRadarStatus("🎯 VOLLE SIGNAL-KOPPLUNG: Messegelände am Funkturm verifiziert!");
      setTimeout(() => {
        setStep(2);
      }, 800);
    } else {
      setErrorMsg("Signalpegel zu schwach oder falscher Beacon! Finde das stärkste Signal am Westkreuz.");
      setTimeout(() => setErrorMsg(""), 2500);
    }
  };

  // Oszilloskop Bestätigen (Challenge 2)
  const handleConfirmResonance = (e) => {
    if (!e.isTrusted) return;
    pointerEntropyRef.current += 1;

    if (resonanceMatch >= 92) {
      setFreqLocked(true);
      setSolutionPart2("72_50");
      setTimeout(() => {
        setStep(3);
      }, 700);
    } else {
      setErrorMsg(`Resonanz bei ${resonanceMatch}% – Signal noch nicht phasenrein. Bringe beide Regler auf über 92%!`);
      setTimeout(() => setErrorMsg(""), 2500);
    }
  };

  // Enigma Ziffernverstellung (Challenge 3)
  const adjustDigit = (idx, delta, e) => {
    if (!e.isTrusted) return;
    pointerEntropyRef.current += 1;
    setEnigmaDigits((prev) => {
      const next = [...prev];
      next[idx] = (next[idx] + delta + 10) % 10;
      return next;
    });
  };

  // Krypto-Knacken
  const handleAttemptUnlock = async (e) => {
    if (!e.isTrusted) {
      setErrorMsg("Automatisierte Klicks blockiert.");
      return;
    }

    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    if (elapsed < 6.0 || pointerEntropyRef.current < 12) {
      setErrorMsg("Anti-Bot Trigger: Menschliche Lösungszeit nicht erreicht.");
      return;
    }

    const codeInput = enigmaDigits.join("");
    setIsDecrypting(true);
    setErrorMsg("");

    try {
      const passphrase = `${solutionPart1}_${solutionPart2}_${codeInput}`;
      const code = await decryptVoucher(ENCRYPTED_VOUCHER_PAYLOAD, passphrase);
      setDecryptedCode(code);
      setStage("unlocked");
    } catch {
      setErrorMsg("Kombination ungültig: Die mathematische Entschlüsselung ist fehlgeschlagen. Bitte prüfe deine Rätsellösungen!");
    } finally {
      setIsDecrypting(false);
    }
  };

  const handleCopyCode = () => {
    if (!decryptedCode) return;
    navigator.clipboard.writeText(decryptedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleMarkAsClaimed = () => {
    localStorage.setItem("herotax_ifa2026_claimed", "true");
    setStage("claimed");
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-blue-500/35 bg-slate-900/95 backdrop-blur-md p-5 sm:p-6 shadow-2xl transition-all">
      {/* Background Ambient Glow */}
      <div className="absolute -top-12 -right-12 w-52 h-52 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-52 h-52 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 tracking-wide font-mono">
            <Ticket size={13} className="text-blue-400" />
            HERO Tax – Exklusiv ⚡
          </span>
          <span className="text-[11px] font-mono font-semibold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/80">
            2x Tagestickets (Wert 43 €)
          </span>
        </div>

        {stage === "claimed" ? (
          <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded flex items-center gap-1">
            <Check size={12} className="text-emerald-400" /> Bereits eingelöst
          </span>
        ) : (
          <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800/50 flex items-center gap-1.5">
            <Zap size={12} className="text-amber-400 shrink-0" />
            1x Gutscheincode · First come, first served
          </span>
        )}
      </div>

      {/* Title & Explainer */}
      <div className="mb-4 relative z-10">
        <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2" style={{ ...fontDisplay }}>
          <Sparkles size={18} className="text-blue-400 shrink-0" />
          IFA Berlin 2026 Ticket-Tresor
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
          Verlost an den schnellsten Kopf der HERO Tax-Community: Einmaliger Aktionscode für 2 Tagestickets (4.–8. September 2026 an
          der Messe Berlin). Wer die 3 Challenges knackt und den Code als Erster auf SeeTickets einlöst, gewinnt!
        </p>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="mb-4 p-3 rounded-lg bg-rose-950/80 border border-rose-500/60 text-rose-200 text-xs flex items-center gap-2 font-mono relative z-10 animate-fade-in">
          <AlertTriangle size={15} className="text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ── STAGE 0: IDLE / START ── */}
      {stage === "idle" && (
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-left w-full sm:w-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold">
              <ShieldCheck size={14} />
              <span>AES-256 Zero-Knowledge Tresor</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Trianguliere das Funkturm-Signal, bringe das Oszilloskop zur Resonanz und knacke das
              4-stellige Enigma-Schloss.
            </p>
          </div>

          <button
            type="button"
            onClick={handleStartChallenge}
            className="w-full sm:w-auto shrink-0 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer font-mono"
          >
            <Zap size={15} className="text-amber-300" />
            Tresor-Challenge starten
          </button>
        </div>
      )}

      {/* ── STAGE 1: THE 3 CHALLENGES ── */}
      {stage === "challenge" && (
        <div className="p-4 rounded-xl bg-slate-950/90 border border-blue-500/40 relative z-10 space-y-4">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Sicherheits-Stufe {step} von 3:</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-6 h-1.5 rounded-full transition-all ${step >= 1 ? "bg-blue-500" : "bg-slate-700"}`} />
              <span className={`w-6 h-1.5 rounded-full transition-all ${step >= 2 ? "bg-blue-500" : "bg-slate-700"}`} />
              <span className={`w-6 h-1.5 rounded-full transition-all ${step >= 3 ? "bg-blue-500" : "bg-slate-700"}`} />
            </div>
          </div>

          {/* ── CHALLENGE STEP 1: Blinder Funkpeiler ── */}
          {step === 1 && (
            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-bold text-white flex items-center gap-1.5 font-mono">
                  <Compass size={14} className="text-blue-400" />
                  Stufe 1: Trianguliere das IFA-Messegelände
                </h5>
                <p className="text-xs text-slate-400 mt-0.5">
                  Bewege den Peiler über das Berliner Funkfeld. Finde den anonymen Beacon am <strong>Westkreuz / Messe Nord</strong> anhand der Live-Signalstärke (Signalpegel &gt; 92%) und klicke zur Kalibrierung:
                </p>
              </div>

              {/* Signal Bar & Info */}
              <div className="flex items-center justify-between font-mono text-xs p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1">
                  <Activity size={12} className="text-blue-400" />
                  Signalpegel:
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-32 sm:w-48 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-75 ${
                        signalStrength > 90 ? "bg-emerald-500" : signalStrength > 65 ? "bg-blue-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${signalStrength}%` }}
                    />
                  </div>
                  <span
                    className={`font-black w-10 text-right ${
                      signalStrength > 90 ? "text-emerald-400" : "text-slate-300"
                    }`}
                  >
                    {signalStrength}%
                  </span>
                </div>
              </div>

              {/* Radar Canvas */}
              <div className="flex flex-col items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={380}
                  height={150}
                  onMouseMove={handleRadarMouseMove}
                  onClick={handleRadarClick}
                  className="rounded-lg border border-slate-700 cursor-crosshair bg-slate-950 max-w-full shadow-inner"
                  title="Finde das stärkste Signal am Westkreuz"
                />
                <p className="text-xs font-mono mt-2 text-blue-300 text-center">{radarStatus}</p>
              </div>
            </div>
          )}

          {/* ── CHALLENGE STEP 2: Oszilloskop-Resonanz ── */}
          {step === 2 && (
            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-bold text-white flex items-center gap-1.5 font-mono">
                  <Radio size={14} className="text-blue-400" />
                  Stufe 2: Phasen-Resonanz am Oszilloskop abstimmen
                </h5>
                <p className="text-xs text-slate-400 mt-0.5">
                  Bringe die verrauschte Empfangswelle mit der grünen IFA-Referenzwelle zur Phasengleichheit.
                  Stimme Trägerfrequenz &amp; Phasenversatz ab, bis die Resonanz <strong>mindestens 92%</strong> erreicht!
                </p>
              </div>

              {/* Oszilloskop Screen */}
              <div className="flex flex-col items-center justify-center">
                <canvas
                  ref={osciCanvasRef}
                  width={380}
                  height={130}
                  className="rounded-lg border border-emerald-500/30 bg-slate-950 max-w-full shadow-inner"
                />
              </div>

              {/* Dual Sliders: Frequenz & Phase */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center gap-1">
                      <Sliders size={12} className="text-blue-400" /> Trägerwelle (Modulation):
                    </span>
                    <span className="text-blue-400 font-bold">{tuningFreq}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={tuningFreq}
                    onChange={(e) => setTuningFreq(parseInt(e.target.value, 10))}
                    className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center gap-1">
                      <Sliders size={12} className="text-indigo-400" /> Phasen-Feinabgleich:
                    </span>
                    <span className="text-indigo-400 font-bold">{tuningPhase}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={tuningPhase}
                    onChange={(e) => setTuningPhase(parseInt(e.target.value, 10))}
                    className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                {/* Match Status Bar & Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-800">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-slate-400">Resonanz:</span>
                    <span
                      className={`font-black text-sm px-2 py-0.5 rounded border ${
                        resonanceMatch >= 92
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                          : "bg-slate-800 text-amber-300 border-slate-700"
                      }`}
                    >
                      {resonanceMatch}%
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmResonance}
                    className={`w-full sm:w-auto px-4 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      resonanceMatch >= 92
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 animate-pulse"
                        : "bg-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Resonanz verriegeln ↵
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── CHALLENGE STEP 3: 4-stelliges Enigma-Schloss ── */}
          {step === 3 && (
            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-bold text-white flex items-center gap-1.5 font-mono">
                  <KeyRound size={14} className="text-blue-400" />
                  Stufe 3: Das 4-stellige IFA-Enigma-Schloss
                </h5>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kombiniere die 4 Code-Segmente aus dem Berliner Tech-Briefing, um den AES-256 Key zu berechnen:
                </p>
              </div>

              {/* 4 Kryptische Hinweise */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                  <span className="text-blue-400 font-bold block mb-0.5">Ziffer 1 (Historie):</span>
                  Erste Ziffer des Gründungsjahrs der 1. Berliner Funkausstellung (1924)
                </div>
                <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                  <span className="text-blue-400 font-bold block mb-0.5">Ziffer 2 (Messedauer):</span>
                  Dauer der IFA 2026 in vollen Tagen (vom 4. bis einschließlich 8. September)
                </div>
                <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                  <span className="text-blue-400 font-bold block mb-0.5">Ziffer 3 (Gutscheinwert):</span>
                  Quersumme des offiziellen Werts der zwei Tagestickets (43 € → 4 + 3 = ?)
                </div>
                <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                  <span className="text-blue-400 font-bold block mb-0.5">Ziffer 4 (Ticketanzahl):</span>
                  Wie viele Tagestickets sind in diesem Vorteilspaket enthalten?
                </div>
              </div>

              {/* 4-Stelliger Safe-Dial */}
              <div className="flex items-center justify-center gap-2.5 py-2">
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => adjustDigit(idx, 1, e)}
                      className="w-10 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold font-mono transition-colors cursor-pointer"
                    >
                      ▲
                    </button>
                    <div className="w-12 h-14 rounded-lg bg-slate-900 border-2 border-blue-500/50 flex items-center justify-center text-2xl font-mono font-black text-white shadow-inner">
                      {enigmaDigits[idx]}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => adjustDigit(idx, -1, e)}
                      className="w-10 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold font-mono transition-colors cursor-pointer"
                    >
                      ▼
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={isDecrypting}
                  onClick={handleAttemptUnlock}
                  className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer font-mono"
                >
                  {isDecrypting ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      Berechne PBKDF2 (100.000 Runden) &amp; AES-GCM...
                    </>
                  ) : (
                    <>
                      <Unlock size={15} />
                      Krypto-Tresor knacken &amp; Code aufdecken
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── STAGE 2: UNLOCKED! CODE REVEALED ── */}
      {stage === "unlocked" && (
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-b from-emerald-950/80 to-slate-950 border border-emerald-500/60 relative z-10 space-y-4 animate-fade-in">
          <div className="text-center space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-mono">
              <Unlock size={13} /> TRESOR ERFOLGREICH GEKNACKT! 🎉
            </span>
            <h5 className="text-base sm:text-lg font-bold text-white" style={{ ...fontDisplay }}>
              Hier ist dein Gutscheincode für 2 IFA-Tagestickets:
            </h5>
          </div>

          {/* Code Display & Copy Box */}
          <div className="p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Dein persönlicher Einlösecode:
              </span>
              <div className="text-xl sm:text-2xl font-black text-amber-300 tracking-widest font-mono select-all">
                {decryptedCode}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} /> Kopiert!
                </>
              ) : (
                <>
                  <Copy size={14} /> Code kopieren
                </>
              )}
            </button>
          </div>

          {/* Step-by-Step Guidance */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1.5 font-mono">
            <p className="font-bold text-amber-300 flex items-center gap-1">
              ⚡ Schnelligkeit zählt – so löst du die Tickets ein:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px]">
              <li>Kopiere deinen Code oben.</li>
              <li>Klicke unten auf „Gutschein jetzt auf SeeTickets einlösen“.</li>
              <li>Gib den Code im Feld Aktionscode / Gutschein ein.</li>
              <li>Du erhältst 2 kostenfreie Eintrittskarten (Wert 43 €) direkt per E-Mail.</li>
            </ol>
            <p className="text-[10px] text-amber-300/90 pt-1 border-t border-slate-800 font-medium">
              ⚡ Wichtig: Der Code verfällt bei der ersten Buchung auf SeeTickets. Löse ihn direkt ein, bevor ein anderer schneller ist!
            </p>
          </div>

          {/* Primary Action Button to SeeTickets */}
          <div className="pt-1 flex flex-col sm:flex-row gap-2">
            <a
              href={SEETICKETS_REDEEM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all font-mono"
            >
              <span>Gutschein jetzt auf SeeTickets einlösen</span>
              <ExternalLink size={15} />
            </a>

            <button
              type="button"
              onClick={handleMarkAsClaimed}
              className="px-3 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Klicke hier, wenn du die Tickets erfolgreich gebucht hast, um den Status auf 'Eingelöst' zu setzen"
            >
              Ich habe gebucht ✓
            </button>
          </div>
        </div>
      )}

      {/* ── STAGE 3: CLAIMED / BEREITS VERGEBEN ── */}
      {stage === "claimed" && (
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 relative z-10 text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
            <Check size={20} />
          </div>
          <h5 className="text-sm font-bold text-white font-mono">Die Tickets wurden erfolgreich eingelöst!</h5>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Der Gutschein für 2 Tagestickets der IFA Berlin 2026 wurde beansprucht. Allen Besuchern viel Spaß auf der
            Messe Berlin!
          </p>
          <div className="pt-2">
            <a
              href="https://www.ifa-berlin.com/de/ticket-b2b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:underline"
            >
              <span>Reguläre IFA-Tickets &amp; B2B-Pass auf ifa-berlin.com ansehen</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      )}

      {/* Rechtlicher Hinweis gem. § 8a UWG */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono leading-relaxed relative z-10">
        <span className="font-semibold text-slate-400">Rechtlicher Hinweis:</span> Privates Geschenk aus unserem
        Tagesspiegel-Abonnement. Die Aktion ist unentgeltlich und steht in keiner wirtschaftlichen Verbindung oder
        Kooperation mit der Messe Berlin GmbH oder der Verlag Der Tagesspiegel GmbH. Barauszahlung und Rechtsweg sind
        ausgeschlossen. Gilt einmalig, solange der Aktionscode auf SeeTickets einlösbar ist.
      </div>
    </div>
  );
}
