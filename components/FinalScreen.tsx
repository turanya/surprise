
import React, { useState, useEffect } from 'react';
import GlowingButton from './GlowingButton';


interface FinalScreenProps {
  onReplay: () => void;
}

const particleChars = ['💖', '✨', '💜', '🌟', '💕'];
const particleColors = ['text-pink-400', 'text-yellow-300', 'text-purple-400', 'text-sky-300', 'text-pink-500'];

const FinalScreen: React.FC<FinalScreenProps> = ({ onReplay }) => {
  const [isHuggingActive, setIsHuggingActive] = useState(false);
  const [hugAnimationStep, setHugAnimationStep] = useState(0); // 0: idle, 1: dimming, 2: kitty enters, 3: hug & particles, 4: message, 5: fading out
  const [hugCount, setHugCount] = useState(0);
  const [showHugElements, setShowHugElements] = useState(false);

  useEffect(() => {
    let timer: number | undefined; 
    if (isHuggingActive) {
      if (hugAnimationStep === 1) { 
        setShowHugElements(true);
        timer = window.setTimeout(() => setHugAnimationStep(2), 500); 
      } else if (hugAnimationStep === 2) { 
        timer = window.setTimeout(() => setHugAnimationStep(3), 1500); 
      } else if (hugAnimationStep === 3) { 
        timer = window.setTimeout(() => setHugAnimationStep(4), 1200); 
      } else if (hugAnimationStep === 4) { 
        timer = window.setTimeout(() => setHugAnimationStep(5), 3000); 
      } else if (hugAnimationStep === 5) { 
         setShowHugElements(false); 
        timer = window.setTimeout(() => {
          setIsHuggingActive(false);
          setHugAnimationStep(0);
        }, 1000); 
      }
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isHuggingActive, hugAnimationStep]);

  const handleCosmicHug = () => {
    if (isHuggingActive) return;
    setIsHuggingActive(true);
    setHugAnimationStep(1); 
    setHugCount(prev => prev + 1);
  };

  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    char: particleChars[i % particleChars.length],
    color: particleColors[i % particleColors.length],
    style: {
      left: `${Math.random() * 80 + 10}%`, 
      top: `${Math.random() * 60 + 20}%`, 
      animationDelay: `${Math.random() * 0.5}s`,
      fontSize: `${Math.random() * 1 + 0.75}rem`, 
    }
  }));

  return (
    <div className="relative flex flex-col items-center justify-center text-center space-y-12 p-4 w-full h-full">
      {showHugElements && (
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-500 z-20 ${hugAnimationStep >= 1 && hugAnimationStep < 5 ? 'opacity-70' : 'opacity-0'}`}
          aria-hidden="true"
        />
      )}

      <div className={`relative z-10 flex flex-col items-center justify-center space-y-8 transition-opacity duration-500 ${isHuggingActive ? 'opacity-0' : 'opacity-100'}`}>
        <img 
          src="/Black selfie.jpg" 
          alt="Profile Picture" 
          className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-2 border-purple-500 transition-all duration-500"
        />
        <h2 className="text-2xl md:text-3xl font-semibold text-sky-300 filter drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]">
          Here's to many more years in our universe.
        </h2>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <GlowingButton onClick={onReplay} className="text-lg">
            Replay This Night 🌌
          </GlowingButton>
          <GlowingButton 
            onClick={handleCosmicHug} 
            className={`text-lg ${!isHuggingActive ? 'animate-pulsate-glow' : ''}`}
            aria-label={hugCount > 0 ? "Replay the Cosmic Hug" : "Send a Cosmic Hug"}
            aria-live="polite"
          >
            {hugCount > 0 ? "Replay the Hug 💫" : "Send a Cosmic Hug 🤗"}
          </GlowingButton>
        </div>
      </div>
      
      {showHugElements && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none" aria-hidden={!showHugElements}>
          {hugAnimationStep >= 2 && hugAnimationStep < 5 && (
            <div className={`${hugAnimationStep === 2 ? 'animate-kitty-float-in' : ''} ${hugAnimationStep >=2 && hugAnimationStep < 5 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
              <div className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40">
                {/* Blurry Sparkles Background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="absolute text-5xl opacity-30 filter blur-md animate-ping" style={{ animationDelay: '0s' }}>✨</span>
                  <span className="absolute text-4xl opacity-20 filter blur-sm animate-ping" style={{ animationDelay: '0.2s', transform: 'rotate(30deg) translateX(20px) translateY(-10px)' }}>✨</span>
                  <span className="absolute text-6xl opacity-40 filter blur-lg animate-ping" style={{ animationDelay: '0.4s', transform: 'rotate(-20deg) translateX(-15px) translateY(10px)' }}>✨</span>
                  <span className="absolute text-5xl opacity-30 filter blur-md animate-ping" style={{ animationDelay: '0.6s', transform: 'rotate(10deg) translateX(10px) translateY(20px)' }}>✨</span>
                </div>
                {/* Hug Emoji */}
                <span className="text-7xl md:text-8xl z-10">🫂</span>
              </div>
            </div>
          )}

          {hugAnimationStep === 3 && (
            <>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {particles.map(p => (
                  <span
                    key={p.id}
                    className={`absolute animate-particle-burst ${p.color}`}
                    style={p.style}
                    aria-hidden="true"
                  >
                    {p.char}
                  </span>
                ))}
              </div>
              <div className="absolute w-32 h-32 bg-gradient-to-radial from-purple-500/50 via-sky-400/30 to-transparent rounded-full animate-glow-wave pointer-events-none" aria-hidden="true" />
            </>
          )}

          {hugAnimationStep === 4 && (
            <p role="alert" className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-sky-300 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-[fadeInScaleUp_1.5s_ease-out_forwards]">
             ❤️ Ummah my Rohaniya ❤️
            </p>
          )}
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn { 
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-\\[fadeIn_1s_ease-out\\] { 
          animation: fadeIn 1s ease-out;
        }
        @keyframes fadeInScaleUp { 
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes kitty-float-in {
          from { transform: translateY(50px) scale(0.8); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes particle-burst {
          0% { transform: scale(0.5) translateY(0px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(1.2) translateY(-20px) translateX(${Math.random() * 40 - 20}px) rotate(${Math.random() * 90 - 45}deg); opacity: 0; }
        }
        @keyframes glow-wave {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.5); opacity: 0.7; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes pulsate-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(168, 85, 247, 0.4), 0 0 20px rgba(168, 85, 247, 0.3); }
          50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.7), 0 0 30px rgba(168, 85, 247, 0.5); }
        }
        .animate-pulsate-glow {
          animation: pulsate-glow 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default FinalScreen;
