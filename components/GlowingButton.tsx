
import React from 'react';

interface GlowingButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties; // Added style prop
}

const GlowingButton: React.FC<GlowingButtonProps> = ({ onClick, children, className = '', style }) => {
  return (
    <button
      onClick={onClick}
      style={style} // Apply the style prop
      className={`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 ease-out border-2 border-cyan-500 rounded-lg shadow-md group hover:border-purple-500 ${className}`}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-transparent via-cyan-500/20 to-purple-500/20 group-hover:from-cyan-500/30 group-hover:via-purple-500/30 group-hover:to-transparent"></span>
      <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-cyan-500 rounded-full group-hover:w-56 group-hover:h-56 opacity-20 group-hover:opacity-30"></span>
      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-purple-500 rounded-full group-hover:w-72 group-hover:h-72 opacity-10 group-hover:opacity-20 delay-150"></span>
      <span className="relative filter group-hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)] transition-all duration-300">
        {children}
      </span>
    </button>
  );
};

export default GlowingButton;
