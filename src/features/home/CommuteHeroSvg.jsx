import { useId } from "react";

export default function CommuteHeroSvg() {
  const uid = useId().replace(/:/g, "");
  const ids = {
    roadGrad: `${uid}-roadGrad`,
    busGrad: `${uid}-busGrad`,
    skyGrad: `${uid}-skyGrad`,
    hazeGrad: `${uid}-hazeGrad`,
    windowGrad: `${uid}-windowGrad`,
    cloudBlur: `${uid}-cloudBlur`,
    softShadow: `${uid}-softShadow`,
  };

  return (
    <svg
      className="commute-svg"
      viewBox="0 0 520 360"
      role="img"
      aria-label="Commuter impact from fuel price hikes"
    >
      <defs>
        <linearGradient id={ids.roadGrad} x1="0" x2="1">
          <stop offset="0%" stopColor="#2b3440" />
          <stop offset="100%" stopColor="#1b232d" />
        </linearGradient>
        <linearGradient id={ids.busGrad} x1="0" x2="1">
          <stop offset="0%" stopColor="#f4b400" />
          <stop offset="100%" stopColor="#f6c340" />
        </linearGradient>
        <linearGradient id={ids.skyGrad} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#eaf4ff" />
          <stop offset="100%" stopColor="#f7fbff" />
        </linearGradient>
        <linearGradient id={ids.hazeGrad} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={ids.windowGrad} x1="0" x2="1">
          <stop offset="0%" stopColor="#cfeaff" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#e0f2fe" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.75" />
        </linearGradient>
        <filter id={ids.cloudBlur} x="-30%" y="-40%" width="160%" height="200%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <filter id={ids.softShadow} x="-40%" y="-60%" width="200%" height="260%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <rect width="520" height="360" rx="26" fill={`url(#${ids.skyGrad})`} />

      <g className="commute-sky">
        <circle cx="430" cy="70" r="66" fill="#fff4c2" opacity="0.55" />
        <circle cx="450" cy="58" r="34" fill="#fffbe6" opacity="0.62" />

        <g className="commute-clouds" filter={`url(#${ids.cloudBlur})`} opacity="0.65">
          <g transform="translate(40 36)">
            <ellipse cx="40" cy="24" rx="34" ry="18" fill="#ffffff" />
            <ellipse cx="66" cy="24" rx="26" ry="14" fill="#ffffff" />
            <ellipse cx="20" cy="28" rx="22" ry="12" fill="#ffffff" />
          </g>
          <g transform="translate(300 30)">
            <ellipse cx="40" cy="24" rx="30" ry="16" fill="#ffffff" />
            <ellipse cx="66" cy="24" rx="24" ry="12" fill="#ffffff" />
            <ellipse cx="18" cy="28" rx="20" ry="11" fill="#ffffff" />
          </g>
        </g>

        <g className="commute-skyline">
          <path
            d="M0 210 L0 180 L34 180 L34 195 L58 195 L58 168 L82 168 L82 188 L98 188 L98 165 L124 165 L124 198 L156 198 L156 172 L180 172 L180 190 L200 190 L200 160 L220 160 L220 205 L248 205 L248 175 L272 175 L272 195 L296 195 L296 170 L320 170 L320 200 L352 200 L352 165 L380 165 L380 192 L406 192 L406 172 L430 172 L430 205 L458 205 L458 180 L520 180 L520 210 Z"
            fill="#bcd2ff"
            opacity="0.5"
          />
          <rect x="0" y="188" width="520" height="40" fill={`url(#${ids.hazeGrad})`} opacity="0.75" />
        </g>
      </g>

      <g className="commute-lines">
        <rect x="40" y="70" width="90" height="6" rx="3" fill="#cfe3ff" />
        <rect x="130" y="92" width="60" height="6" rx="3" fill="#d9e9ff" />
        <rect x="260" y="60" width="90" height="6" rx="3" fill="#cfe3ff" />
        <rect x="330" y="84" width="70" height="6" rx="3" fill="#d9e9ff" />
      </g>

      <g className="scene scene-buildings">
        <rect x="10" y="120" width="70" height="90" rx="8" fill="#c7d2fe" />
        <rect x="90" y="140" width="80" height="70" rx="8" fill="#dbeafe" />
        <rect x="180" y="110" width="60" height="100" rx="8" fill="#bfdbfe" />
        <rect x="250" y="135" width="90" height="75" rx="8" fill="#e0e7ff" />
        <rect x="350" y="105" width="70" height="105" rx="8" fill="#cbd5f5" />
        <rect x="430" y="130" width="70" height="80" rx="8" fill="#dbeafe" />
        <rect x="14" y="120" width="10" height="90" rx="6" fill="#a5b4fc" opacity="0.35" />
        <rect x="92" y="140" width="10" height="70" rx="6" fill="#bfdbfe" opacity="0.55" />
        <rect x="182" y="110" width="10" height="100" rx="6" fill="#93c5fd" opacity="0.35" />
        <rect x="252" y="135" width="10" height="75" rx="6" fill="#c7d2fe" opacity="0.38" />
        <rect x="352" y="105" width="10" height="105" rx="6" fill="#a5b4fc" opacity="0.32" />
        <rect x="432" y="130" width="10" height="80" rx="6" fill="#bfdbfe" opacity="0.5" />
        <g fill="#eef2ff">
          <rect x="22" y="135" width="12" height="12" rx="2" />
          <rect x="40" y="135" width="12" height="12" rx="2" />
          <rect x="22" y="155" width="12" height="12" rx="2" />
          <rect x="40" y="155" width="12" height="12" rx="2" />
          <rect x="108" y="155" width="12" height="12" rx="2" />
          <rect x="128" y="155" width="12" height="12" rx="2" />
          <rect x="108" y="175" width="12" height="12" rx="2" />
          <rect x="128" y="175" width="12" height="12" rx="2" />
          <rect x="196" y="135" width="12" height="12" rx="2" />
          <rect x="216" y="135" width="12" height="12" rx="2" />
          <rect x="196" y="155" width="12" height="12" rx="2" />
          <rect x="216" y="155" width="12" height="12" rx="2" />
          <rect x="270" y="155" width="12" height="12" rx="2" />
          <rect x="290" y="155" width="12" height="12" rx="2" />
          <rect x="270" y="175" width="12" height="12" rx="2" />
          <rect x="290" y="175" width="12" height="12" rx="2" />
          <rect x="368" y="135" width="12" height="12" rx="2" />
          <rect x="388" y="135" width="12" height="12" rx="2" />
          <rect x="368" y="155" width="12" height="12" rx="2" />
          <rect x="388" y="155" width="12" height="12" rx="2" />
          <rect x="448" y="150" width="12" height="12" rx="2" />
          <rect x="468" y="150" width="12" height="12" rx="2" />
          <rect x="448" y="170" width="12" height="12" rx="2" />
          <rect x="468" y="170" width="12" height="12" rx="2" />
        </g>
      </g>

      <g className="scene scene-station">
        <rect x="20" y="170" width="120" height="40" rx="8" fill="#fee2e2" />
        <rect x="30" y="178" width="26" height="30" rx="6" fill="#f87171" />
        <rect x="62" y="178" width="50" height="10" rx="4" fill="#fb7185" />
        <rect x="62" y="192" width="50" height="10" rx="4" fill="#fb7185" />
        <rect x="76" y="152" width="56" height="16" rx="8" fill="#fecaca" />
        <rect x="76" y="152" width="56" height="4" fill="#f97316" />
        <rect x="24" y="170" width="6" height="40" rx="3" fill="#ef4444" opacity="0.18" />
      </g>

      <g className="scene scene-school">
        <rect x="30" y="165" width="130" height="45" rx="8" fill="#bbf7d0" />
        <rect x="42" y="175" width="26" height="28" rx="4" fill="#86efac" />
        <rect x="74" y="175" width="26" height="28" rx="4" fill="#86efac" />
        <rect x="106" y="175" width="26" height="28" rx="4" fill="#86efac" />
        <rect x="60" y="148" width="70" height="14" rx="6" fill="#4ade80" />
        <rect x="32" y="165" width="6" height="45" rx="3" fill="#16a34a" opacity="0.18" />
      </g>

      <g className="commute-road">
        <rect x="0" y="250" width="520" height="70" fill={`url(#${ids.roadGrad})`} />
        <rect x="0" y="240" width="520" height="12" fill="#95a4b8" opacity="0.6" />
        <g className="commute-road-marks">
          <path
            className="commute-lane"
            d="M0 286 H520"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="4"
            strokeDasharray="18 18"
          />
          <path className="commute-edge" d="M0 257 H520" fill="none" stroke="#111827" strokeOpacity="0.24" strokeWidth="2" />
          <path className="commute-edge" d="M0 316 H520" fill="none" stroke="#111827" strokeOpacity="0.22" strokeWidth="2" />
        </g>
      </g>

      <g className="commute-foreground">
        <rect x="0" y="230" width="520" height="8" fill="#cbd5e1" opacity="0.7" />
        <rect x="0" y="238" width="520" height="2" fill="#94a3b8" opacity="0.35" />
        <rect x="0" y="240" width="520" height="10" fill="#e2e8f0" opacity="0.65" />
        <rect x="0" y="248" width="520" height="2" fill="#94a3b8" opacity="0.28" />
        <g fill="#94a3b8">
          <rect x="60" y="205" width="4" height="30" rx="2" />
          <rect x="160" y="205" width="4" height="30" rx="2" />
          <rect x="360" y="205" width="4" height="30" rx="2" />
          <rect x="460" y="205" width="4" height="30" rx="2" />
        </g>
        <g fill="#86efac">
          <circle cx="90" cy="225" r="10" />
          <circle cx="200" cy="225" r="10" />
          <circle cx="320" cy="225" r="10" />
          <circle cx="430" cy="225" r="10" />
        </g>
        <g fill="#1f2937" opacity="0.9">
          <circle cx="120" cy="222" r="4" />
          <rect x="118" y="226" width="4" height="10" rx="2" />
          <circle cx="250" cy="222" r="4" />
          <rect x="248" y="226" width="4" height="10" rx="2" />
          <circle cx="395" cy="222" r="4" />
          <rect x="393" y="226" width="4" height="10" rx="2" />
        </g>
      </g>

      <g className="commute-billboard-distance" transform="translate(6 -16) scale(0.88)">
        <g className="commute-billboard">
          <rect x="90" y="18" width="340" height="78" rx="6" fill="#e2e8f0" stroke="#cbd5e1" />
          <rect x="98" y="24" width="324" height="66" rx="4" fill="#2f7f2a" stroke="#1f5a1b" />
          <rect x="90" y="90" width="340" height="6" rx="3" fill="#bfc8d6" />
          <rect x="255" y="96" width="10" height="150" rx="5" fill="#9aa5b1" />
          <rect x="230" y="242" width="60" height="10" rx="4" fill="#9aa5b1" />
          <circle cx="118" cy="22" r="3" fill="#b0b8c4" />
          <circle cx="170" cy="22" r="3" fill="#b0b8c4" />
          <circle cx="322" cy="22" r="3" fill="#b0b8c4" />
          <circle cx="402" cy="22" r="3" fill="#b0b8c4" />
          <foreignObject x="110" y="36" width="300" height="48">
            <div className="billboard-text" xmlns="http://www.w3.org/1999/xhtml">
              <div className="type-line type-line-1">WE NEED AN OIL PRICE ROLLBACK!</div>
              <div className="type-line type-line-2">THIS WAR MUST STOP NOW!</div>
            </div>
          </foreignObject>
        </g>
      </g>

      <g className="commute-bus">
        <g className="commute-bus-bob">
          <ellipse
            cx="235"
            cy="267"
            rx="150"
            ry="16"
            fill="#0b1220"
            opacity="0.22"
            filter={`url(#${ids.softShadow})`}
          />

          <g className="commute-bus-body">
            <rect x="110" y="160" width="250" height="78" rx="18" fill={`url(#${ids.busGrad})`} />
            <rect x="110" y="160" width="250" height="78" rx="18" fill="#ffffff" opacity="0.06" />
            <rect x="110" y="216" width="250" height="22" rx="12" fill="#111827" opacity="0.16" />

            <rect x="126" y="171" width="212" height="10" rx="5" fill="#ffffff" opacity="0.18" />

            <rect x="140" y="175" width="70" height="36" rx="8" fill={`url(#${ids.windowGrad})`} stroke="#93c5fd" strokeOpacity="0.45" />
            <rect x="220" y="175" width="70" height="36" rx="8" fill={`url(#${ids.windowGrad})`} stroke="#93c5fd" strokeOpacity="0.45" />
            <rect x="300" y="175" width="50" height="36" rx="8" fill={`url(#${ids.windowGrad})`} stroke="#93c5fd" strokeOpacity="0.45" />
            <path d="M148 182 L182 182" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
            <path d="M228 182 L262 182" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
            <path d="M308 182 L336 182" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />

            <rect x="330" y="192" width="20" height="34" rx="8" fill="#0b1220" opacity="0.92" />
            <rect x="334" y="198" width="12" height="18" rx="6" fill="#0ea5e9" opacity="0.18" />
            <circle cx="332" cy="210" r="2.2" fill="#e5e7eb" opacity="0.7" />

            <rect x="354" y="175" width="10" height="52" rx="6" fill="#111827" opacity="0.22" />
            <rect x="358" y="186" width="8" height="10" rx="3" fill="#e5e7eb" opacity="0.85" />
            <rect x="358" y="204" width="8" height="10" rx="3" fill="#fef08a" opacity="0.82" />

            <path d="M360 198 C372 198 372 206 360 206" stroke="#111827" strokeOpacity="0.35" strokeWidth="2" />
            <circle cx="160" cy="188" r="7" fill="#f97316" />
            <rect x="154" y="195" width="12" height="12" rx="4" fill="#111827" />
            <circle cx="186" cy="190" r="7" fill="#22c55e" />
            <rect x="180" y="197" width="12" height="12" rx="4" fill="#111827" />
            <circle cx="240" cy="188" r="7" fill="#60a5fa" />
            <rect x="234" y="195" width="12" height="12" rx="4" fill="#111827" />
            <circle cx="268" cy="190" r="7" fill="#f43f5e" />
            <rect x="262" y="197" width="12" height="12" rx="4" fill="#111827" />
            <circle cx="320" cy="188" r="7" fill="#fbbf24" />
            <rect x="314" y="195" width="12" height="12" rx="4" fill="#111827" />
          </g>

          <g className="commute-wheel" transform="translate(155 245)">
            <g className="commute-wheel-spin">
              <circle r="20" fill="#0b1220" />
              <circle r="14" fill="#111827" opacity="0.7" />
              <circle r="9" fill="#e5e7eb" />
              <circle r="3" fill="#94a3b8" />
              <path d="M0 -12 V12" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <path d="M-12 0 H12" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <path d="M-9 -9 L9 9" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
              <path d="M9 -9 L-9 9" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
            </g>
          </g>

          <g className="commute-wheel" transform="translate(310 245)">
            <g className="commute-wheel-spin">
              <circle r="20" fill="#0b1220" />
              <circle r="14" fill="#111827" opacity="0.7" />
              <circle r="9" fill="#e5e7eb" />
              <circle r="3" fill="#94a3b8" />
              <path d="M0 -12 V12" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <path d="M-12 0 H12" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <path d="M-9 -9 L9 9" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
              <path d="M9 -9 L-9 9" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
