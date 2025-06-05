
import React, { useState, useEffect, useRef } from 'react';

const useTypewriter = (text: string, speed: number = 35) => { // Slightly faster typing
  const [displayText, setDisplayText] = useState('');
  const indexRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayText('');
    
    const type = () => {
      if (indexRef.current < text.length) {
        setDisplayText((prev) => prev + text.charAt(indexRef.current));
        indexRef.current++;
        timeoutRef.current = window.setTimeout(type, speed);
      }
    };
    
    // Delay initial start of typing slightly for card animation to settle
    timeoutRef.current = window.setTimeout(type, speed + 200); 

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed]);

  return displayText;
};

interface LoveLetterCardProps {
  message: string;
  title?: string;
  onClose: () => void;
}

const StardustParticle: React.FC<{ delay: string }> = ({ delay }) => (
  <div
    className="absolute w-1 h-1 bg-white/80 rounded-full animate-stardust-pulse"
    style={{
      top: `${Math.random() * 92 + 4}%`, // Spread within padding
      left: `${Math.random() * 92 + 4}%`,
      animationDelay: delay,
      animationDuration: `${Math.random() * 1 + 1.5}s` // Varied pulse duration
    }}
  />
);

const LoveLetterCard: React.FC<LoveLetterCardProps> = ({ message, title = "A Message For You...", onClose }) => {
  const typedMessage = useTypewriter(message);
  const [showVisualChime, setShowVisualChime] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowVisualChime(false), 900); // Duration of chime effect
    return () => clearTimeout(timer);
  }, []);

  const visualChimeSparkles = [ // More distinct positions for chime
    { top: '10%', left: '8%', delay: '0s' }, { top: '20%', left: '90%', delay: '0.05s' },
    { top: '75%', left: '15%', delay: '0.1s' }, { top: '85%', left: '80%', delay: '0.15s' },
    { top: '40%', left: '45%', delay: '0.08s' } // Central sparkle
  ];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-3 sm:p-4 animate-card-reveal">
      {showVisualChime && visualChimeSparkles.map((pos, idx) => (
        <span 
          key={`chime-${idx}`}
          className="absolute text-2xl sm:text-3xl text-yellow-300/90 animate-visual-sparkle-open pointer-events-none filter drop-shadow-[0_0_5px_#fde047]" // amber-300
          style={{ top: pos.top, left: pos.left, animationDelay: pos.delay }}
          aria-hidden="true"
        >
          ✨
        </span>
      ))}
      <div className="relative bg-slate-900/80 backdrop-blur-xl border border-purple-500/90 rounded-2xl shadow-2xl shadow-purple-600/70 p-5 sm:p-6 md:p-8 max-w-lg w-full m-2 text-center">
        {/* Stardust particles inside the card */}
        <div className="absolute inset-1.5 sm:inset-2 overflow-hidden pointer-events-none">
          {Array.from({ length: 7 }).map((_, i) => ( // Increased stardust
            <StardustParticle key={`stardust-${i}`} delay={`${i * 0.25}s`} />
          ))}
        </div>
        
        <h3 className="relative z-10 text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-purple-400 to-pink-400 mb-3 sm:mb-4 flex items-center justify-center">
          <span 
            className="mr-2 sm:mr-3 text-2xl sm:text-3xl text-pink-400 animate-pulse-heart filter drop-shadow-[0_0_4px_#f472b6]"
            aria-hidden="true"
          >💜</span>
          {title}
        </h3>
        <div className="relative z-10 text-md sm:text-lg text-slate-200 leading-relaxed mb-6 sm:mb-8 min-h-[180px] md:min-h-[220px] text-left whitespace-pre-wrap py-2 px-1 overflow-y-auto max-h-[55vh] sm:max-h-[60vh]">
          <p className="text-glow-white">{typedMessage}</p>
          {typedMessage.length === message.length ? '' : <span className="inline-block w-0.5 h-5 bg-purple-400 animate-typewriter-blink-caret ml-0.5" aria-hidden="true"></span>}
        </div>
        <button
          onClick={onClose}
          className="relative z-10 px-6 py-2.5 sm:px-7 sm:py-3 bg-gradient-to-r from-pink-500/90 via-purple-600/90 to-sky-500/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/60 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-60"
          aria-label="Close message with a kiss"
        >
          Close with a kiss 💋
        </button>
      </div>
    </div>
  );
};

export default LoveLetterCard;
