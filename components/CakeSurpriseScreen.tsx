
import React, { useState, useEffect } from 'react';
import GlowingButton from './GlowingButton';
import AnimatedCake from './AnimatedCake';

interface CakeSurpriseScreenProps {
  onComplete: () => void;
}

const ConfettiPiece: React.FC<{ delay: string, color: string, left: string, top: string, rotation: string }> = ({ delay, color, left, top, rotation }) => (
  <div 
    className={`absolute w-2 h-4 ${color} opacity-0 animate-[confetti-fall_2s_ease-out_forwards] ${rotation}`}
    style={{ animationDelay: delay, left: left, top: top }}
  ></div>
);


const CakeSurpriseScreen: React.FC<CakeSurpriseScreenProps> = ({ onComplete }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showAnniversaryMessage, setShowAnniversaryMessage] = useState(false);
  const [cakeFading, setCakeFading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowAnniversaryMessage(true);
    }, 1500); // Show message after confetti
    setTimeout(() => {
      setCakeFading(true);
    }, 3500); // Start fading cake after message is shown for a bit
    setTimeout(() => {
      onComplete();
    }, 5000); // Transition to final screen after cake fades
  };
  
  const confettiColors = ['bg-pink-500', 'bg-purple-500', 'bg-sky-400', 'bg-yellow-300'];
  const confettiPieces = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    delay: `${Math.random() * 1000}ms`,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * -50 - 50}%`, // Start above the screen
    rotation: `rotate-[${Math.random() * 360}deg]`
  }));


  return (
    <div className={`flex flex-col items-center justify-center text-center space-y-8 p-4 animate-[fadeIn_1s_ease-out]  ${cakeFading ? 'opacity-0 transition-opacity duration-1500' : 'opacity-100'}`}>
      {!showAnniversaryMessage && <AnimatedCake candlesBlown={candlesBlown} />}
      
      {showConfetti && !showAnniversaryMessage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
          {confettiPieces.map(p => (
            <ConfettiPiece key={p.id} delay={p.delay} color={p.color} left={p.left} top={p.top} rotation={p.rotation} />
          ))}
        </div>
      )}

      {!candlesBlown && (
        <GlowingButton onClick={handleBlowCandles} className="text-lg md:text-xl">
          Blow the candles 🕯️
        </GlowingButton>
      )}

      {showAnniversaryMessage && (
        <div className="animate-[fadeInScaleUp_1s_ease-out_forwards] mt-8">
          <h2 className="text-4xl md:text-6xl font-bold text-white filter drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
            HAPPY ANNIVERSARY, BABY 💙✨
          </h2>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScaleUp {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) translateX(0px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 720}deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CakeSurpriseScreen;
