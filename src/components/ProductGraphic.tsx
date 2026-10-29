import React from 'react';

interface ProductGraphicProps {
  type: 'speaker' | 'earbuds' | 'gadget' | 'cable-charger' | 'cctv' | 'keyboard' | 'mouse' | 'soundbar' | 'headphones';
  className?: string;
  badge?: string;
  angle?: 'hero' | 'side' | 'folded' | 'cushion';
  imageUrl?: string;
  alt?: string;
}

export const ProductGraphic: React.FC<ProductGraphicProps> = ({ 
  type, 
  className = "h-48 w-full", 
  badge,
  angle = 'hero',
  imageUrl,
  alt = 'Product visual'
}) => {
  const [imageFailed, setImageFailed] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  React.useEffect(() => {
    setImageFailed(false);
    setImageLoaded(false);
  }, [imageUrl]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100/60 to-slate-200/50 p-6 select-none ${className}`}>
      {/* Background ambient soft radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent opacity-70 pointer-events-none" />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)', backgroundSize: '16px 16px' }}
      />

      {badge && (
        <span className="absolute top-3 left-3 text-[10px] uppercase font-mono tracking-wider font-bold px-2 py-0.5 rounded bg-white text-emerald-800 shadow-xs border border-emerald-200 z-10">
          {badge}
        </span>
      )}

      {/* If real image URL is provided and not failed, display real high-res photograph */}
      {imageUrl && !imageFailed ? (
        <div className="relative w-full h-full flex items-center justify-center p-2 z-1">
          <img
            src={imageUrl}
            alt={alt}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
            loading="lazy"
            className={`w-full h-full max-h-56 object-contain drop-shadow-md transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-90'
            }`}
          />
        </div>
      ) : (
        <>
      {/* JLab JBuds Lux ANC Over-Ear Headphones (Sage Colorway) */}
      {type === 'headphones' && (
        <svg viewBox="0 0 220 220" className="w-full h-full max-h-48 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="sageHeadband" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6b8678" />
              <stop offset="50%" stopColor="#829e90" />
              <stop offset="100%" stopColor="#6b8678" />
            </linearGradient>
            <linearGradient id="sageCup" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8faaa0" />
              <stop offset="50%" stopColor="#7a9689" />
              <stop offset="100%" stopColor="#5f7b6e" />
            </linearGradient>
            <linearGradient id="cloudFoam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d4f46" />
              <stop offset="100%" stopColor="#28342e" />
            </linearGradient>
            <linearGradient id="brushedAluminum" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>

          {/* VIEW ANGLE 1: HERO (Front 3/4 Studio View) */}
          {angle === 'hero' && (
            <g>
              {/* Outer Headband Arch */}
              <path 
                d="M48 115 C48 45, 172 45, 172 115" 
                stroke="url(#sageHeadband)" 
                strokeWidth="14" 
                strokeLinecap="round" 
              />
              {/* Inner Cloud Foam Headband Cushion */}
              <path 
                d="M62 108 C62 55, 158 55, 158 108" 
                stroke="url(#cloudFoam)" 
                strokeWidth="6" 
                strokeLinecap="round" 
              />
              {/* Left Brushed Aluminum Extender Slider */}
              <rect x="42" y="105" width="8" height="24" rx="2" fill="url(#brushedAluminum)" stroke="#64748b" strokeWidth="0.5" />
              {/* Right Brushed Aluminum Extender Slider */}
              <rect x="170" y="105" width="8" height="24" rx="2" fill="url(#brushedAluminum)" stroke="#64748b" strokeWidth="0.5" />

              {/* Left Swivel Pivot Yoke */}
              <path d="M38 122 C38 135, 54 135, 54 122" stroke="#5f7b6e" strokeWidth="4" fill="none" />
              {/* Right Swivel Pivot Yoke */}
              <path d="M166 122 C166 135, 182 135, 182 122" stroke="#5f7b6e" strokeWidth="4" fill="none" />

              {/* Left Earcup Cushion (Thick Plush Cloud Foam) */}
              <ellipse cx="44" cy="148" rx="18" ry="32" fill="url(#cloudFoam)" stroke="#222e28" strokeWidth="2" />
              {/* Left Earcup Outer Shell (Sage Green) */}
              <ellipse cx="50" cy="148" rx="15" ry="28" fill="url(#sageCup)" stroke="#4a6358" strokeWidth="1.5" />
              {/* JLab subtle logo badge */}
              <circle cx="50" cy="148" r="5" fill="#5f7b6e" stroke="#8faaa0" strokeWidth="0.8" />

              {/* Right Earcup Cushion (Thick Plush Cloud Foam) */}
              <ellipse cx="176" cy="148" rx="18" ry="32" fill="url(#cloudFoam)" stroke="#222e28" strokeWidth="2" />
              {/* Right Earcup Outer Shell (Sage Green) */}
              <ellipse cx="170" cy="148" rx="15" ry="28" fill="url(#sageCup)" stroke="#4a6358" strokeWidth="1.5" />
              {/* JLab subtle logo badge */}
              <circle cx="170" cy="148" r="5" fill="#5f7b6e" stroke="#8faaa0" strokeWidth="0.8" />

              {/* ANC Mic Port & Controls */}
              <circle cx="52" cy="166" r="1.5" fill="#1e293b" />
              <circle cx="168" cy="166" r="1.5" fill="#1e293b" />
              {/* Status LED */}
              <circle cx="166" cy="172" r="1.2" fill="#10b981" />

              {/* Color label watermark */}
              <text x="110" y="195" textAnchor="middle" fill="#6b8678" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">
                JLab JBuds Lux ANC · SAGE
              </text>
            </g>
          )}

          {/* VIEW ANGLE 2: SIDE (Profile View showing Earcup & Cloud Foam™) */}
          {angle === 'side' && (
            <g>
              {/* Vertical Headband Arm descending */}
              <rect x="103" y="25" width="14" height="65" rx="4" fill="url(#sageHeadband)" stroke="#4a6358" strokeWidth="1" />
              <rect x="106" y="65" width="8" height="22" rx="2" fill="url(#brushedAluminum)" />
              {/* Pivot joint */}
              <circle cx="110" cy="94" r="9" fill="#5f7b6e" stroke="#3d4f46" strokeWidth="1.5" />

              {/* Side View: Full Ergonomic Oval Earcup */}
              {/* Outer Shell */}
              <ellipse cx="110" cy="142" rx="55" ry="46" fill="url(#sageCup)" stroke="#4a6358" strokeWidth="2" />
              {/* Accent Ring */}
              <ellipse cx="110" cy="142" rx="46" ry="38" fill="none" stroke="#9bb6ac" strokeWidth="1.5" opacity="0.8" />
              {/* JLab signature concave disc */}
              <circle cx="110" cy="142" r="22" fill="#6d897c" stroke="#546e62" strokeWidth="1.5" />
              {/* JLab Embossed Monogram */}
              <path d="M104 135 L104 148 C104 152, 107 154, 112 154 C117 154, 119 151, 119 146 L119 135" stroke="#f1f5f9" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              
              {/* Physical Controls on Rim (ANC button, Volume, USB-C) */}
              <rect x="62" y="150" width="7" height="14" rx="2" fill="#3d4f46" />
              <rect x="151" y="145" width="7" height="12" rx="2" fill="#3d4f46" />
              <rect x="151" y="160" width="7" height="8" rx="2" fill="#1e293b" />
              {/* ENC Microphone Hole */}
              <circle cx="95" cy="182" r="2" fill="#1e293b" />
              <circle cx="125" cy="182" r="2" fill="#1e293b" />
              
              <text x="110" y="206" textAnchor="middle" fill="#6b8678" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">
                Side Profile · Cloud Foam™
              </text>
            </g>
          )}

          {/* VIEW ANGLE 3: FOLDED (Compact Travel Folding Mechanism) */}
          {angle === 'folded' && (
            <g>
              {/* Curved collapsed headband */}
              <path d="M50 80 C50 35, 170 35, 170 80" stroke="url(#sageHeadband)" strokeWidth="12" strokeLinecap="round" fill="none" />
              {/* Hinges rotated inward */}
              <circle cx="62" cy="88" r="8" fill="url(#brushedAluminum)" stroke="#64748b" strokeWidth="1" />
              <circle cx="158" cy="88" r="8" fill="url(#brushedAluminum)" stroke="#64748b" strokeWidth="1" />

              {/* Left Earcup rotated horizontal inside */}
              <ellipse cx="88" cy="130" rx="36" ry="24" fill="url(#sageCup)" stroke="#4a6358" strokeWidth="2" transform="rotate(-15 88 130)" />
              <ellipse cx="86" cy="122" rx="34" ry="20" fill="url(#cloudFoam)" stroke="#222e28" strokeWidth="1" transform="rotate(-15 86 122)" opacity="0.9" />

              {/* Right Earcup layered adjacent */}
              <ellipse cx="138" cy="138" rx="36" ry="24" fill="url(#sageCup)" stroke="#4a6358" strokeWidth="2" transform="rotate(18 138 138)" />
              <ellipse cx="140" cy="130" rx="34" ry="20" fill="url(#cloudFoam)" stroke="#222e28" strokeWidth="1" transform="rotate(18 140 130)" opacity="0.9" />

              <text x="110" y="195" textAnchor="middle" fill="#6b8678" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">
                Foldable Travel Architecture
              </text>
            </g>
          )}

          {/* VIEW ANGLE 4: CUSHION (Macro Ergonomic Ear Cushion View) */}
          {angle === 'cushion' && (
            <g>
              {/* Outer Sage Green Chamfer */}
              <ellipse cx="110" cy="110" rx="68" ry="78" fill="url(#sageCup)" stroke="#4a6358" strokeWidth="3" />
              {/* Plush Cloud Foam Ring Cushion */}
              <ellipse cx="110" cy="110" rx="60" ry="70" fill="url(#cloudFoam)" stroke="#1a251f" strokeWidth="4" />
              {/* Inner Acoustic Driver Recess */}
              <ellipse cx="110" cy="110" rx="36" ry="46" fill="#1c2621" stroke="#36493e" strokeWidth="2" />
              {/* 40mm Dynamic Driver Grill Pattern */}
              <g opacity="0.4" stroke="#8faaa0" strokeWidth="1">
                <circle cx="110" cy="110" r="26" strokeDasharray="3 3" />
                <circle cx="110" cy="110" r="16" strokeDasharray="3 3" />
                <line x1="88" y1="110" x2="132" y2="110" />
                <line x1="110" y1="88" x2="110" y2="132" />
              </g>
              {/* Large Acoustic Silk Screen 'L' for Left */}
              <text x="110" y="117" textAnchor="middle" fill="#9bb6ac" fontSize="22" fontWeight="800" fontFamily="Plus Jakarta Sans">
                L
              </text>
              <text x="110" y="206" textAnchor="middle" fill="#6b8678" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">
                40mm Neodymium Driver · Cloud Foam™
              </text>
            </g>
          )}
        </svg>
      )}

      {/* Graphic representation per product category */}
      {type === 'speaker' && (
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-44 text-slate-700 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="speakerGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="copperRimLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          {/* Speaker Body Cylinder */}
          <rect x="55" y="30" width="90" height="140" rx="45" fill="url(#speakerGradLight)" stroke="#475569" strokeWidth="2" />
          {/* Copper top ring */}
          <circle cx="100" cy="50" r="32" stroke="url(#copperRimLight)" strokeWidth="3" fill="#1e293b" />
          <circle cx="100" cy="50" r="14" fill="#0f172a" stroke="#475569" />
          {/* Acoustic Mesh Pattern */}
          <g opacity="0.4" stroke="#cbd5e1" strokeWidth="1">
            <line x1="68" y1="90" x2="132" y2="90" strokeDasharray="3 3" />
            <line x1="65" y1="102" x2="135" y2="102" strokeDasharray="3 3" />
            <line x1="64" y1="114" x2="136" y2="114" strokeDasharray="3 3" />
            <line x1="65" y1="126" x2="135" y2="126" strokeDasharray="3 3" />
            <line x1="68" y1="138" x2="132" y2="138" strokeDasharray="3 3" />
            <line x1="74" y1="150" x2="126" y2="150" strokeDasharray="3 3" />
          </g>
          {/* Subwoofer Bass Woofer Lower */}
          <circle cx="100" cy="120" r="24" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
          <circle cx="100" cy="120" r="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
          {/* Base Stand with subtle glow */}
          <path d="M75 168 L125 168" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        </svg>
      )}

      {type === 'soundbar' && (
        <svg viewBox="0 0 240 160" className="w-full h-full max-h-40 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="soundbarGradLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          {/* Long soundbar chassis */}
          <rect x="15" y="65" width="210" height="36" rx="10" fill="url(#soundbarGradLight)" stroke="#64748b" strokeWidth="1.5" />
          {/* Front acoustic grille */}
          <rect x="25" y="73" width="190" height="20" rx="4" fill="#0f172a" stroke="#475569" />
          {/* Drivers */}
          <circle cx="48" cy="83" r="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
          <circle cx="82" cy="83" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="158" cy="83" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="192" cy="83" r="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
          {/* Center OLED status pill */}
          <rect x="110" y="79" width="20" height="8" rx="2" fill="#000" />
          <circle cx="120" cy="83" r="2" fill="#38bdf8" />
          {/* Wireless Subwoofer alongside */}
          <rect x="160" y="25" width="38" height="38" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <circle cx="179" cy="44" r="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
        </svg>
      )}

      {type === 'earbuds' && (
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-44 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="caseGradLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          {/* White Glossy Charging Case Body */}
          <rect x="52" y="75" width="96" height="72" rx="28" fill="url(#caseGradLight)" stroke="#cbd5e1" strokeWidth="2" />
          {/* Charging Case Lid (open slant) */}
          <path d="M52 86 C52 50, 148 50, 148 86" stroke="#94a3b8" strokeWidth="2" fill="#f8fafc" />
          {/* LED Indicator dot */}
          <circle cx="100" cy="116" r="2.5" fill="#10b981" />
          {/* Left Earbud */}
          <g transform="translate(64, 40)">
            <ellipse cx="14" cy="16" rx="10" ry="12" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" />
            <path d="M14 26 L14 48" stroke="#cbd5e1" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="14" cy="46" r="1.5" fill="#3b82f6" />
          </g>
          {/* Right Earbud */}
          <g transform="translate(108, 40)">
            <ellipse cx="14" cy="16" rx="10" ry="12" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" />
            <path d="M14 26 L14 48" stroke="#cbd5e1" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="14" cy="46" r="1.5" fill="#3b82f6" />
          </g>
        </svg>
      )}

      {type === 'gadget' && (
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-44 drop-shadow-md" fill="none">
          {/* Smartwatch / Gadget */}
          {/* Straps */}
          <rect x="78" y="20" width="44" height="40" rx="6" fill="#334155" stroke="#475569" strokeWidth="1.5" />
          <rect x="78" y="140" width="44" height="40" rx="6" fill="#334155" stroke="#475569" strokeWidth="1.5" />
          {/* Watch Case */}
          <rect x="62" y="52" width="76" height="96" rx="22" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
          {/* Bezel */}
          <rect x="68" y="58" width="64" height="84" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          {/* Digital Dial Face */}
          <circle cx="100" cy="100" r="28" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="140 30" fill="none" />
          <circle cx="100" cy="100" r="21" stroke="#f59e0b" strokeWidth="2" strokeDasharray="80 50" fill="none" />
          <text x="100" y="104" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono">
            08:45
          </text>
          <text x="100" y="117" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="600" fontFamily="JetBrains Mono">
            7,420 BPM
          </text>
          {/* Crown dial */}
          <rect x="138" y="76" width="5" height="16" rx="2" fill="#3b82f6" />
        </svg>
      )}

      {type === 'cctv' && (
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-44 drop-shadow-md" fill="none">
          {/* Wall Mount Base */}
          <rect x="30" y="70" width="18" height="60" rx="4" fill="#64748b" stroke="#475569" strokeWidth="1.5" />
          {/* Articulated Arm */}
          <path d="M48 95 L85 95" stroke="#94a3b8" strokeWidth="10" strokeLinecap="round" />
          {/* Camera Cylinder Body (Crisp White & Grey) */}
          <rect x="85" y="70" width="75" height="50" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          {/* Sunhood Visor */}
          <path d="M80 68 L170 68 L160 80 L80 80 Z" fill="#e2e8f0" />
          {/* Front Camera Lens Ring */}
          <circle cx="160" cy="95" r="19" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="160" cy="95" r="11" fill="#000000" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="160" cy="95" r="4" fill="#38bdf8" />
          {/* IR Night Vision LEDs */}
          <circle cx="148" cy="85" r="2" fill="#ef4444" />
          <circle cx="172" cy="85" r="2" fill="#ef4444" />
          <circle cx="148" cy="105" r="2" fill="#ef4444" />
          <circle cx="172" cy="105" r="2" fill="#ef4444" />
          {/* Antenna */}
          <path d="M96 70 L90 40" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          <circle cx="90" cy="38" r="3" fill="#3b82f6" />
          {/* Wi-Fi Wave */}
          <path d="M84 28 C90 24, 98 24, 104 28" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}

      {type === 'cable-charger' && (
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-44 drop-shadow-md" fill="none">
          {/* GaN Charger Brick */}
          <rect x="40" y="55" width="70" height="90" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <text x="75" y="82" textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="800" fontFamily="JetBrains Mono">
            65W GaN
          </text>
          {/* USB Ports on Charger */}
          <rect x="62" y="94" width="26" height="8" rx="2" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
          <rect x="62" y="108" width="26" height="8" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          <rect x="60" y="122" width="30" height="10" rx="2" fill="#0f172a" stroke="#94a3b8" strokeWidth="1" />
          {/* Fast Braided Cable coil */}
          <path d="M125 70 C160 70, 160 130, 125 130 C100 130, 100 160, 145 160" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" strokeDasharray="3 2" fill="none" />
          {/* Metal Tip */}
          <rect x="145" y="156" width="20" height="8" rx="2" fill="#cbd5e1" stroke="#94a3b8" />
          <rect x="165" y="157" width="8" height="6" rx="1" fill="#2563eb" />
        </svg>
      )}

      {type === 'keyboard' && (
        <svg viewBox="0 0 220 160" className="w-full h-full max-h-40 drop-shadow-md" fill="none">
          {/* Keyboard Chassis */}
          <rect x="15" y="45" width="190" height="80" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          {/* Aluminum Plate */}
          <rect x="22" y="52" width="176" height="66" rx="4" fill="#e2e8f0" stroke="#94a3b8" />
          {/* Row of keys */}
          <g fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8">
            {/* Row 1 */}
            <rect x="28" y="58" width="12" height="10" rx="2" fill="#3b82f6" />
            <rect x="44" y="58" width="12" height="10" rx="2" />
            <rect x="60" y="58" width="12" height="10" rx="2" />
            <rect x="76" y="58" width="12" height="10" rx="2" />
            <rect x="92" y="58" width="12" height="10" rx="2" />
            <rect x="108" y="58" width="12" height="10" rx="2" />
            <rect x="124" y="58" width="12" height="10" rx="2" />
            <rect x="140" y="58" width="12" height="10" rx="2" />
            <rect x="156" y="58" width="12" height="10" rx="2" />
            <rect x="172" y="58" width="20" height="10" rx="2" fill="#e2e8f0" />

            {/* Row 2 */}
            <rect x="28" y="72" width="16" height="10" rx="2" />
            <rect x="48" y="72" width="12" height="10" rx="2" />
            <rect x="64" y="72" width="12" height="10" rx="2" />
            <rect x="80" y="72" width="12" height="10" rx="2" />
            <rect x="96" y="72" width="12" height="10" rx="2" />
            <rect x="112" y="72" width="12" height="10" rx="2" />
            <rect x="128" y="72" width="12" height="10" rx="2" />
            <rect x="144" y="72" width="12" height="10" rx="2" />
            <rect x="160" y="72" width="12" height="10" rx="2" />
            <rect x="176" y="72" width="16" height="10" rx="2" />

            {/* Row 3 Spacebar */}
            <rect x="28" y="86" width="20" height="10" rx="2" />
            <rect x="52" y="86" width="14" height="10" rx="2" />
            <rect x="70" y="86" width="60" height="10" rx="2" fill="#2563eb" stroke="#1d4ed8" />
            <rect x="134" y="86" width="14" height="10" rx="2" />
            <rect x="152" y="86" width="16" height="10" rx="2" />
            <rect x="172" y="86" width="20" height="10" rx="2" />
          </g>
          {/* Ambient bottom line */}
          <path d="M25 125 L195 125" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
        </svg>
      )}

      {type === 'mouse' && (
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-44 drop-shadow-md" fill="none">
          {/* Ergonomic mouse contour */}
          <path 
            d="M75 50 C65 80, 60 130, 80 160 C100 175, 120 170, 130 150 C145 120, 140 70, 125 50 C115 35, 85 35, 75 50 Z" 
            fill="#ffffff" 
            stroke="#cbd5e1" 
            strokeWidth="2" 
          />
          {/* Center Split Button Line */}
          <path d="M100 42 L100 85" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Precision Metal Scroll Wheel */}
          <rect x="96" y="55" width="8" height="18" rx="3" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" />
          {/* Thumb rest ergonomic flare */}
          <path d="M66 100 C58 115, 62 135, 72 142" stroke="#3b82f6" strokeWidth="2" fill="none" />
          {/* DPI Switch button */}
          <rect x="97" y="80" width="6" height="6" rx="1" fill="#94a3b8" />
          {/* Muted Logo Accent */}
          <circle cx="102" cy="125" r="5" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />
        </svg>
      )}
        </>
      )}
    </div>
  );
};
