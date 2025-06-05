
import React, { useState, useEffect, useCallback, useRef } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import LoveLettersScreen from './components/LoveLettersScreen';
import CakeSurpriseScreen from './components/CakeSurpriseScreen';
import FinalScreen from './components/FinalScreen';
import StarryBackground from './components/StarryBackground';
import { ScreenView } from './types';
import { AUDIO_URL } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('welcome');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
   const [hasInteracted, setHasInteracted] = useState(false);


  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRef.current = new Audio(AUDIO_URL);
      audioRef.current.loop = true;
    }
    
    const handleInteraction = () => {
        setHasInteracted(true);
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('keydown', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const playAudio = useCallback(() => {
    if (audioRef.current && hasInteracted && !isAudioPlaying) {
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true);
      }).catch(error => console.error("Audio play failed:", error));
    }
  }, [hasInteracted, isAudioPlaying]);

  // Attempt to play audio once interaction is detected and component is ready
  useEffect(() => {
    if (hasInteracted && currentScreen !== 'welcome') { // Play when moving from welcome
        playAudio();
    }
  }, [hasInteracted, playAudio, currentScreen]);


  const handleEnterUniverse = () => {
    if(!hasInteracted) setHasInteracted(true); // Ensure interaction is registered
    playAudio(); // Attempt to play audio
    setCurrentScreen('letters');
  };

  const handleShowCake = () => {
    setCurrentScreen('cake');
  };

  const handleCakeComplete = () => {
    setCurrentScreen('final');
  };

  const handleReplay = () => {
    setCurrentScreen('welcome');
    // Reset any other necessary states for replay, e.g., letter selection, cake state
    if (audioRef.current && isAudioPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset audio
        setIsAudioPlaying(false); // Update playing state
    }
    // Set to re-evaluate playing audio on next interaction cycle
    // setHasInteracted(false); // This might be too aggressive, user may not want to click again for audio
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-900 text-slate-100 overflow-hidden">
      <StarryBackground />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-2 sm:p-4">
        {currentScreen === 'welcome' && <WelcomeScreen onEnter={handleEnterUniverse} />}
        {currentScreen === 'letters' && <LoveLettersScreen onShowCake={handleShowCake} />}
        {currentScreen === 'cake' && <CakeSurpriseScreen onComplete={handleCakeComplete} />}
        {currentScreen === 'final' && <FinalScreen onReplay={handleReplay} />}
      </main>
      {/* Optional: Mute button for audio
      {audioRef.current && hasInteracted && (
        <button 
          onClick={() => {
            if (isAudioPlaying) {
              audioRef.current?.pause();
              setIsAudioPlaying(false);
            } else {
              audioRef.current?.play().then(() => setIsAudioPlaying(true));
            }
          }}
          className="fixed bottom-4 right-4 z-50 p-3 bg-purple-600/70 text-white rounded-full shadow-lg hover:bg-purple-700/90 transition-colors"
        >
          {isAudioPlaying ? 'Mute 🔊' : 'Unmute 🔇'}
        </button>
      )}
      */}
    </div>
  );
};

export default App;
