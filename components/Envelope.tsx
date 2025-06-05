
import React from 'react';
import { LoveLetter } from '../types';

interface EnvelopeProps {
  letter: LoveLetter;
  onClick: () => void;
  delay: number;
  isFinal?: boolean; 
  isCompleted?: boolean;
}

const Envelope: React.FC<EnvelopeProps> = ({ letter, onClick, delay, isFinal = false, isCompleted = false }) => {
  const driftDuration = 7 + Math.random() * 5; // 7s to 12s for slower, more varied drift
  
  const baseClasses = `relative rounded-lg p-3 m-1.5 md:m-2 w-32 h-28 md:w-40 md:h-36 flex flex-col items-center justify-center text-center transition-all duration-300 ease-out transform focus:outline-none group animate-gentle-drift`;
  
  // Neon blue/silver glow for normal envelopes
  const normalStyle = `bg-slate-800/50 backdrop-blur-lg border-2 border-sky-400/80 shadow-xl shadow-sky-500/50 
                      group-hover:border-sky-300 group-hover:shadow-2xl group-hover:shadow-sky-300/60 
                      group-focus:border-sky-300 group-focus:shadow-2xl group-focus:shadow-sky-300/60
                      group-hover:animate-envelope-hover-pulse-effect`;
  
  // Golden glow for the final letter
  const finalStyle = `bg-slate-800/60 backdrop-blur-lg border-2 border-amber-400/90 shadow-2xl shadow-amber-500/60 
                     animate-final-envelope-glow 
                     group-hover:border-amber-300 group-hover:shadow-2xl group-hover:shadow-amber-300/70
                     group-focus:border-amber-300 group-focus:shadow-2xl group-focus:shadow-amber-300/70
                     group-hover:animate-envelope-hover-pulse-effect`;
  
  const completedStyle = `bg-slate-800/40 backdrop-blur-md border-2 border-purple-500/60 shadow-lg shadow-purple-600/30 opacity-75 
                         group-hover:opacity-100 group-hover:border-purple-400 group-hover:shadow-purple-500/40`;


  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isFinal ? finalStyle : (isCompleted ? completedStyle : normalStyle)} opacity-0 animate-appear-subtle`}
      style={{ 
        animationDelay: `${delay}ms, ${delay * 0.1 + 200}ms`, // delay for appear, then drift
        animationDuration: `0.6s, ${driftDuration}s`, // duration for appear, then drift
       } as React.CSSProperties}
      aria-label={`Open letter: ${isFinal ? "The Final Letter" : `${letter.categorySymbol} ${letter.category}`}`}
    >
      <span className={`text-4xl md:text-5xl mb-1 filter transition-all duration-300 
        ${isFinal ? 'text-glow-gold group-hover:text-amber-300' 
                  : isCompleted ? 'text-purple-300 group-hover:text-purple-200' 
                                : 'text-glow-cyan group-hover:text-sky-200'}`}
      >
        {letter.categorySymbol}
      </span>
      <span className={`text-[10px] md:text-xs font-medium transition-colors duration-300 px-1
        ${isFinal ? 'text-amber-200/90 group-hover:text-amber-100' 
                  : isCompleted ? 'text-purple-200/80 group-hover:text-purple-100' 
                                : 'text-sky-200/90 group-hover:text-sky-100'}`}
      >
        {isFinal ? "The Final Letter" : letter.category.split(" ").slice(0,3).join(" ")}
      </span>
    </button>
  );
};

export default Envelope;
