
import React from 'react';
import GlowingButton from './GlowingButton';


interface WelcomeScreenProps {
  onEnter: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 p-4 animate-[fadeIn_1s_ease-out]">
      <img 
        src="/Black selfie.jpg" 
        alt="Profile Picture" 
        className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-2 border-purple-500 transition-all duration-500"
      /> 
      <GlowingButton onClick={onEnter} className="text-lg md:text-xl">
        Enter Our Universe 💌
      </GlowingButton>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;
