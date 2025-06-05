
import React, { useState, useEffect, CSSProperties } from 'react';

interface Star {
  id: number;
  size: string;
  position: string;
  color: string;
  animationDelay: string;
  opacity: string;
}

const starsData: Star[] = Array.from({ length: 30 }).map((_, i) => ({ // Increased star count slightly
  id: i,
  size: `w-[${Math.random() * 1.2 + 0.3}px] h-[${Math.random() * 1.2 + 0.3}px]`, // Slightly smaller base
  position: `top-[${Math.random() * 100}%] left-[${Math.random() * 100}%]`,
  color: ['bg-sky-300/80', 'bg-purple-300/70', 'bg-pink-300/70', 'bg-slate-400/90'][Math.floor(Math.random() * 4)], // Added opacity
  animationDelay: `${Math.floor(Math.random() * 20) * 100}ms`, // Wider delay range
  opacity: `opacity-${[60, 70, 80, 90][Math.floor(Math.random() * 4)]}`
}));

interface EffectStyle extends CSSProperties {
  '--star-start-x'?: string;
  '--star-start-y'?: string;
  '--star-end-x'?: string;
  '--star-end-y'?: string;
  '--heart-start-x'?: string;
  '--heart-start-y'?: string;
  '--heart-end-x'?: string;
  '--heart-end-y'?: string;
  animationName?: string;
  animationDuration?: string;
  animationDelay?: string;
}

const ShootingStar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState<EffectStyle>({});

  useEffect(() => {
    const show = () => {
      setVisible(true);
      const fromTop = Math.random() > 0.5;
      const fromLeft = Math.random() > 0.5;

      const startY = fromTop ? `${Math.random() * -20 - 5}%` : `${Math.random() * 20 + 105}%`; // Start off-screen top/bottom
      const startX = fromLeft ? `${Math.random() * -20 - 5}%` : `${Math.random() * 20 + 105}%`; // Start off-screen left/right

      const endY = `${Math.random() * 100}%`; // End somewhere on screen
      const endX = `${Math.random() * 100}%`;

      const duration = `${Math.random() * 1.5 + 2.5}s`; // 2.5s to 4s
      const delay = `${Math.random() * 2}s`; // Appear with slight delay
      
      const newStyle: EffectStyle = {
        '--star-start-x': startX,
        '--star-start-y': startY,
        '--star-end-x': endX,
        '--star-end-y': endY,
        animationName: 'shooting-star-anim',
        animationDuration: duration,
        animationDelay: delay,
      };
      setStyle(newStyle);
      setTimeout(() => setVisible(false), parseFloat(duration.replace('s','')) * 1000 + parseFloat(delay.replace('s',''))*1000 + 200);
    };

    const interval = setInterval(show, Math.random() * 10000 + 12000); // Every 12-22 seconds
    show(); // Initial call
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div 
      className="absolute w-16 h-0.5 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0"
      style={style}
    />
  );
};

const SparklyHeartStreak: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState<EffectStyle>({});

  useEffect(() => {
    const show = () => {
      setVisible(true);
      const fromRight = Math.random() > 0.5;
      
      const startY = `${Math.random() * 50 + 25}%`; // Start Y more centered
      const startX = fromRight ? `${Math.random() * -10 - 5}%` : `${Math.random() * 10 + 105}%`;

      const endX = fromRight ? `${Math.random()*30 + 80}%` : `${Math.random()*30 -10}%`;
      const endY = `${parseFloat(startY.replace('%','')) + (Math.random()*40-20)}%`;


      const duration = `${Math.random() * 2 + 3}s`; // 3s to 5s
      const delay = `${Math.random() * 2.5}s`;
      
      const newStyle: EffectStyle = {
        '--heart-start-x': startX,
        '--heart-start-y': startY,
        '--heart-end-x': endX,
        '--heart-end-y': endY,
        animationName: 'sparkly-heart-streak-anim',
        animationDuration: duration,
        animationDelay: delay,
      };
      setStyle(newStyle);
      setTimeout(() => setVisible(false), parseFloat(duration.replace('s','')) * 1000 + parseFloat(delay.replace('s','')) * 1000 + 200);
    };
    const interval = setInterval(show, Math.random() * 15000 + 13000); // Every 13-28 seconds
    show(); // Initial call
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <span className="absolute text-lg text-pink-400 filter drop-shadow-[0_0_4px_#ec4899] opacity-0" style={style}>💖</span>
  );
};


const StarryBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Nebula/Space Dust Layer 1 */}
      <div className="absolute inset-[-80%] md:inset-[-50%] animate-nebula-drift-1">
        <div className="absolute w-[180vmin] h-[180vmin] md:w-[150vmin] md:h-[150vmin] rounded-full bg-gradient-radial from-blue-900/40 via-purple-800/20 to-transparent blur-3xl"></div>
      </div>
      {/* Nebula/Space Dust Layer 2 */}
      <div className="absolute inset-[-80%] md:inset-[-50%] animate-nebula-drift-2">
        <div className="absolute w-[200vmin] h-[200vmin] md:w-[180vmin] md:h-[180vmin] left-[5%] top-[10%] md:left-[10%] md:top-[5%] rounded-full bg-gradient-radial from-sky-800/30 via-indigo-900/25 to-transparent blur-3xl"></div>
      </div>

      {/* Static Stars */}
      {starsData.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full animate-pulse ${star.size} ${star.position} ${star.color} ${star.opacity}`}
          style={{ animationDuration: `${Math.random() * 1 + 2}s`, animationDelay: star.animationDelay }} // Varied pulse duration
        />
      ))}
      {/* Animated Effects */}
      <ShootingStar />
      <SparklyHeartStreak />
    </div>
  );
};

export default StarryBackground;
