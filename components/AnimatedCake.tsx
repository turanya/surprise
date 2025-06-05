import React from 'react';

interface AnimatedCakeProps {
  candlesBlown: boolean;
}

// Flower positions - manually placed for a natural look
const flowerPositions = {
  topTier: [
    { cx: "40", cy: "23", fill: "#fecdd3" }, { cx: "50", cy: "21", fill: "#e9d5ff" }, // light pink, light purple
    { cx: "60", cy: "23", fill: "#bfdbfe" }, { cx: "55", cy: "25", fill: "#fef08a" }  // light blue, light yellow
  ],
  middleTier: [
    { cx: "32", cy: "38", fill: "#e9d5ff" }, { cx: "43", cy: "36", fill: "#bfdbfe" },
    { cx: "57", cy: "36", fill: "#fef08a" }, { cx: "68", cy: "38", fill: "#fecdd3" },
    { cx: "50", cy: "40", fill: "#e9d5ff" }
  ],
  bottomTier: [
    { cx: "25", cy: "58", fill: "#bfdbfe" }, { cx: "38", cy: "56", fill: "#fef08a" },
    { cx: "50", cy: "55", fill: "#fecdd3" }, { cx: "62", cy: "56", fill: "#e9d5ff" },
    { cx: "75", cy: "58", fill: "#bfdbfe" }, { cx: "30", cy: "63", fill: "#fef08a" },
    { cx: "70", cy: "63", fill: "#fecdd3" }
  ]
};

const candlePositions = [
  { xBase: 36, xFlameCenter: 36.75 },
  { xBase: 42, xFlameCenter: 42.75 },
  { xBase: 48, xFlameCenter: 48.75 }, // Center
  { xBase: 54, xFlameCenter: 54.75 },
  { xBase: 60, xFlameCenter: 60.75 },
];

const Sparkle: React.FC<{ top: string; left: string; delay: string; char: string; size: string; color: string }> = ({ top, left, delay, char, size, color }) => (
  <span
    className={`absolute animate-pulse ${size} ${color}`}
    style={{ top, left, animationDelay: delay, filter: 'drop-shadow(0 0 2px currentColor)' }}
    aria-hidden="true"
  >
    {char}
  </span>
);

const AnimatedCake: React.FC<AnimatedCakeProps> = ({ candlesBlown }) => {
  const cakeBaseColor = "white";
  const candleBodyColor = "#FFF8DC"; // Cornsilk (off-white for candles)
  const flameColors = ["#FFB03A", "#FFD270", "#FF8C1A"]; // Shades of orange/yellow for flames

  return (
    <div className={`relative flex flex-col items-center my-8 transition-opacity duration-1000 ${candlesBlown ? 'opacity-60' : 'opacity-100'}`}>
      {/* Subtle ambient sparkles around the cake, visible when candles are lit */}
      {!candlesBlown && (
        <>
          <Sparkle top="5%" left="10%" delay="0s" char="✨" size="text-xs" color="text-purple-300" />
          <Sparkle top="15%" left="88%" delay="0.5s" char="✧" size="text-sm" color="text-sky-300" />
          <Sparkle top="65%" left="8%" delay="0.2s" char="·" size="text-md" color="text-pink-300" />
          <Sparkle top="80%" left="92%" delay="0.7s" char="⊹" size="text-xs" color="text-yellow-200" />
        </>
      )}
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
        <defs>
          <filter id="blueOutlineGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="rgba(96, 165, 250, 0.7)" /> {/* Tailwind's blue-400 like glow */}
          </filter>
          <filter id="flameGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="blurredFlame"/>
            <feFlood floodColor="rgba(251, 191, 36, 0.8)" result="flameGlowColor"/> {/* Tailwind's amber-400 like glow */}
            <feComposite in="flameGlowColor" in2="blurredFlame" operator="in" result="finalFlameGlow"/>
            <feMerge>
                <feMergeNode in="finalFlameGlow"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Plate */}
        <ellipse cx="50" cy="86" rx="46" ry="9" fill="#222938" className="opacity-80 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]" />

        {/* Cake Tiers - Applying glow via filter to the stroke */}
        {/* Bottom Tier */}
        <rect x="15" y="55" width="70" height="25" rx="5" fill={cakeBaseColor} stroke="rgb(147, 197, 253)" strokeWidth="0.4" style={{ filter: 'url(#blueOutlineGlow)' }} />
        {/* Middle Tier */}
        <rect x="22" y="35" width="56" height="20" rx="5" fill={cakeBaseColor} stroke="rgb(147, 197, 253)" strokeWidth="0.4" style={{ filter: 'url(#blueOutlineGlow)' }} />
        {/* Top Tier */}
        <rect x="30" y="20" width="40" height="15" rx="5" fill={cakeBaseColor} stroke="rgb(147, 197, 253)" strokeWidth="0.3" style={{ filter: 'url(#blueOutlineGlow)' }} />

        {/* Flowers - drawn on top, no additional glow to keep them delicate */}
        {flowerPositions.topTier.map((f, i) => <circle key={`tf-${i}`} cx={f.cx} cy={f.cy} r="0.7" fill={f.fill} />)}
        {flowerPositions.middleTier.map((f, i) => <circle key={`mf-${i}`} cx={f.cx} cy={f.cy} r="0.9" fill={f.fill} />)}
        {flowerPositions.bottomTier.map((f, i) => <circle key={`bf-${i}`} cx={f.cx} cy={f.cy} r="1.1" fill={f.fill} />)}
        
        {/* Candles */}
        {candlePositions.map((candle, index) => (
          <g key={`candle-group-${index}`} className={`${candlesBlown ? 'opacity-0 transition-opacity duration-300' : 'opacity-100'}`}>
            {/* Candle Body */}
            <rect x={candle.xBase} y="13" width="1.5" height="7" fill={candleBodyColor} rx="0.5" />
            {/* Candle Flame (simple triangle: base on y=13, tip at y=9, height 4) */}
            {!candlesBlown && (
              <path
                d={`M${candle.xFlameCenter - 0.75} 13 L${candle.xFlameCenter} 9 L${candle.xFlameCenter + 0.75} 13 Z`}
                fill={flameColors[index % flameColors.length]}
                className="animate-candle-flicker"
                style={{ animationDelay: `${index * 70}ms`, filter: 'url(#flameGlow)' }}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default AnimatedCake;
