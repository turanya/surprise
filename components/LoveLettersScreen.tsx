
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LoveLetter, LetterCategory, LoveLetterViewMode } from '../types';
import { LOVE_LETTERS_MESSAGES, LETTER_CATEGORIES, FINAL_LETTER_MESSAGE } from '../constants';
import GlowingButton from './GlowingButton';
import Envelope from './Envelope';
import LoveLetterCard from './LoveLetterCard';

interface CategoryCardProps {
  category: LetterCategory;
  onClick: () => void;
  lettersRead: number;
  isCompleted: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, lettersRead, isCompleted }) => {
  return (
    <button
      onClick={onClick}
      className={`relative bg-slate-800/60 backdrop-blur-md rounded-xl p-4 md:p-5 w-full text-center transition-all duration-300 group transform focus:scale-[1.02]
                  border-2 ${isCompleted ? 'border-purple-600/80 shadow-purple-600/40 hover:border-purple-500/90 hover:shadow-purple-500/50' 
                                       : 'border-indigo-500/60 hover:border-indigo-400/90 focus:border-indigo-400/90 shadow-indigo-500/30 hover:shadow-indigo-400/40'} 
                  shadow-lg hover:shadow-xl focus:shadow-xl group-hover:animate-category-card-hover`}
      aria-label={`Open category: ${category.name}`}
    >
      <div className={`absolute -top-2.5 -right-2.5 text-[10px] px-1.5 py-0.5 rounded-full font-semibold transition-all duration-300 shadow-sm ${isCompleted ? 'bg-purple-500 text-white' : 'bg-sky-500 text-white'}`}>
        {lettersRead}/{category.total}
      </div>
      <span className={`block text-4xl md:text-5xl mb-2 filter transition-all duration-300 ${isCompleted ? 'text-purple-300 group-hover:text-purple-200' : 'text-glow-cyan group-hover:text-sky-300'}`}>
        {category.symbol}
      </span>
      <h3 className={`text-xs md:text-sm font-semibold transition-colors duration-300 ${isCompleted ? 'text-purple-200 group-hover:text-purple-100' : 'text-indigo-200 group-hover:text-indigo-100'}`}>
        {category.name}
      </h3>
      {isCompleted && <p className="text-[10px] text-green-400/90 mt-0.5">Completed!</p>}
    </button>
  );
};


const LoveLettersScreen: React.FC<{ onShowCake: () => void }> = ({ onShowCake }) => {
  const [viewMode, setViewMode] = useState<LoveLetterViewMode>('categories');
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [currentLetter, setCurrentLetter] = useState<LoveLetter | null>(null);
  const [openedLetters, setOpenedLetters] = useState<Set<number>>(new Set());
  const [allCategoriesCompleted, setAllCategoriesCompleted] = useState<Set<string>>(new Set());
  
  const [animatedLetterIcons, setAnimatedLetterIcons] = useState<string[]>([]);
  const envelopeContainerRef = useRef<HTMLDivElement>(null);

  const lettersForSelectedCategory = selectedCategoryName
    ? LOVE_LETTERS_MESSAGES.filter(l => l.category === selectedCategoryName)
    : [];

  useEffect(() => {
    const container = envelopeContainerRef.current;
    if (viewMode === 'letters' && container) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        // Make sure currentTarget is an HTMLElement to access offsetWidth/Height
        const currentTargetEl = e.currentTarget as HTMLElement;
        if (!currentTargetEl) return;

        const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = currentTargetEl;
        
        const xRelativeToContainer = clientX - offsetLeft;
        const yRelativeToContainer = clientY - offsetTop;

        const xRotation = ((yRelativeToContainer - (offsetHeight / 2)) / offsetHeight) * -7; // Max 7deg rotation
        const yRotation = ((xRelativeToContainer - (offsetWidth / 2)) / offsetWidth) * 7;  // Max 7deg rotation
        container.style.transform = `perspective(1200px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.03)`;
      };
       const handleMouseLeave = () => {
        if (container) {
            container.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
        }
      };

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    } else if (container) {
      container.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  }, [viewMode]);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategoryName(categoryName);
    setViewMode('letters');
  };

  const handleOpenLetter = (letter: LoveLetter) => {
    setCurrentLetter(letter);
  };

  const handleCloseLetter = () => {
    if (currentLetter) {
      const newOpenedLetters = new Set(openedLetters).add(currentLetter.id);
      setOpenedLetters(newOpenedLetters);

      if (selectedCategoryName) {
        const category = LETTER_CATEGORIES.find(c => c.name === selectedCategoryName);
        if (category) {
          const lettersInCategory = LOVE_LETTERS_MESSAGES.filter(l => l.category === selectedCategoryName);
          const readInCategoryCount = lettersInCategory.filter(l => newOpenedLetters.has(l.id)).length;
          if (readInCategoryCount === category.total && !allCategoriesCompleted.has(selectedCategoryName)) {
            setAllCategoriesCompleted(prev => new Set(prev).add(selectedCategoryName));
          }
        }
      }
    }
    setCurrentLetter(null);
  };
  
  const checkAllMainLettersRead = useCallback(() => {
    return LOVE_LETTERS_MESSAGES.every(letter => openedLetters.has(letter.id));
  }, [openedLetters]);


  useEffect(() => {
    if (viewMode !== 'finalLetterPending' && viewMode !== 'finalLetterOpen' && viewMode !== 'allComplete' && checkAllMainLettersRead()) {
         if (allCategoriesCompleted.size === LETTER_CATEGORIES.length) { // Ensure all categories are marked complete too
            setViewMode('finalLetterPending');
         }
    }
  }, [openedLetters, allCategoriesCompleted, viewMode, checkAllMainLettersRead]);


  const handleOpenFinalLetter = () => {
    setCurrentLetter(FINAL_LETTER_MESSAGE);
    setViewMode('finalLetterOpen');
  };

  const handleCloseFinalLetter = () => {
    setOpenedLetters(prev => new Set(prev).add(FINAL_LETTER_MESSAGE.id));
    setCurrentLetter(null);
    setViewMode('allComplete');
    const symbols = [...LETTER_CATEGORIES.map(c => c.symbol), FINAL_LETTER_MESSAGE.categorySymbol];
    setAnimatedLetterIcons(symbols);
    setTimeout(() => setAnimatedLetterIcons([]), 4000);
  };

  const handleStartOver = () => {
    setOpenedLetters(new Set());
    setAllCategoriesCompleted(new Set());
    setSelectedCategoryName(null);
    setCurrentLetter(null);
    setViewMode('categories');
  };
  
  const lettersReadOverall = LOVE_LETTERS_MESSAGES.filter(l => openedLetters.has(l.id)).length;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full pt-10 md:pt-12 pb-8 px-2 md:px-4">
      {viewMode !== 'allComplete' && (
        <div className="mb-5 md:mb-6 text-center animate-appear-subtle" style={{animationDelay: '0.1s'}}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-glow-cyan mb-1.5 md:mb-2">
            {viewMode === 'categories' ? "Letters From My Heart to Yours" : 
             viewMode === 'letters' && selectedCategoryName ? selectedCategoryName : 
             viewMode === 'finalLetterPending' || viewMode === 'finalLetterOpen' ? "A Final Message" : "Our Cosmic Journal"} 💌
          </h2>
          <p className="text-xs md:text-sm text-purple-300/80 max-w-lg mx-auto">
            {viewMode === 'categories' ? "Discover memories and dreams, one star at a time, Rohaniya." : 
             viewMode === 'letters' ? `Exploring our journey under the theme of ${selectedCategoryName}.` : 
             viewMode === 'finalLetterPending' ? "The universe has aligned for this moment..." :
             viewMode === 'finalLetterOpen' ? "Words from the deepest part of my soul..." :
             "Every word is a piece of my soul, written for you."}
          </p>
        </div>
      )}

      {viewMode !== 'allComplete' && (
        <div className="flex space-x-1.5 md:space-x-2 my-3 md:my-5 items-center animate-appear-subtle" style={{animationDelay: '0.2s'}} aria-label="Progress of reading letter categories">
          <span className="text-xs text-pink-300/90 mr-1.5">Cosmic Hearts:</span>
          {LETTER_CATEGORIES.map(cat => (
            <span 
              key={cat.name} 
              className={`text-xl md:text-2xl transition-all duration-500 ${allCategoriesCompleted.has(cat.name) ? 'text-pink-400 filter drop-shadow-[0_0_6px_#f472b6] animate-progress-heart-fill' : 'text-slate-700'}`}
              title={`${cat.name} - ${allCategoriesCompleted.has(cat.name) ? 'Completed' : `${LOVE_LETTERS_MESSAGES.filter(l => l.category === cat.name && openedLetters.has(l.id)).length}/${cat.total} read`}`}
            >
              💖
            </span>
          ))}
        </div>
      )}


      {viewMode === 'categories' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 md:gap-4 w-full max-w-5xl mb-6">
          {LETTER_CATEGORIES.map((category, idx) => {
            const readInCategory = LOVE_LETTERS_MESSAGES.filter(l => l.category === category.name && openedLetters.has(l.id)).length;
            return (
              <div key={category.name} className="animate-appear-subtle" style={{animationDelay: `${0.3 + idx * 0.05}s`}}>
                <CategoryCard 
                  category={category} 
                  onClick={() => handleCategorySelect(category.name)}
                  lettersRead={readInCategory}
                  isCompleted={allCategoriesCompleted.has(category.name)}
                />
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'letters' && (
        <>
          <div className="animate-appear-subtle" style={{animationDelay: '0.1s'}}>
            <GlowingButton onClick={() => { setSelectedCategoryName(null); setViewMode('categories'); }} className="mb-6 text-sm py-2 px-4">
              &larr; Back to Categories
            </GlowingButton>
          </div>
          <div ref={envelopeContainerRef} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-8 justify-center px-1 transition-transform duration-200 ease-out" style={{ transformStyle: 'preserve-3d', transform: 'scale(1)' }}>
            {lettersForSelectedCategory.map((letter, index) => (
              <Envelope 
                key={letter.id} 
                letter={letter} 
                onClick={() => handleOpenLetter(letter)}
                delay={index * 80}
                isCompleted={openedLetters.has(letter.id)}
              />
            ))}
          </div>
            {lettersForSelectedCategory.every(l => openedLetters.has(l.id)) && selectedCategoryName && (
                <p className="text-green-400/90 text-sm mb-4 animate-appear-subtle">Category Complete! ✨ Select 'Back to Categories'.</p>
            )}
        </>
      )}
      
      {viewMode === 'finalLetterPending' && (
        <div className="flex flex-col items-center my-8 animate-appear-subtle" style={{animationDelay: '0.2s'}}>
            <p className="text-lg md:text-xl text-amber-300 mb-5 text-center text-glow-gold">All memories unveiled... one final star awaits.</p>
            <Envelope
                letter={FINAL_LETTER_MESSAGE}
                onClick={handleOpenFinalLetter}
                delay={0}
                isFinal={true}
            />
        </div>
      )}

      {currentLetter && (
        <LoveLetterCard 
          message={currentLetter.text} 
          title={currentLetter.id === FINAL_LETTER_MESSAGE.id ? FINAL_LETTER_MESSAGE.category : currentLetter.category}
          onClose={currentLetter.id === FINAL_LETTER_MESSAGE.id ? handleCloseFinalLetter : handleCloseLetter} 
        />
      )}

      {viewMode === 'allComplete' && (
        <div className="text-center my-8 space-y-5 flex flex-col items-center">
           {animatedLetterIcons.map((symbol, index) => (
            <span key={index} className="absolute text-3xl md:text-4xl opacity-0 animate-letter-icon-drift-up pointer-events-none" style={{ 
                left: `${10 + (index * (80 / animatedLetterIcons.length)) + (Math.random()*5-2.5)}%`, // Distribute horizontally
                bottom: `${Math.random()*20 + 40}%`, // Start from mid-lower part of screen
                animationDelay: `${index * 0.15}s`,
                color: ['#a5b4fc', '#f9a8d4', '#93c5fd', '#fde047', '#f87171'][index % 5] 
            }}>
                {symbol}
            </span>
          ))}
          <p className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-purple-400 to-pink-400 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] animate-hidden-message-fade-in">
            Our story continues under these stars... Happy Anniversary!
          </p>
          <GlowingButton onClick={onShowCake} className="text-lg md:text-xl animate-hidden-message-fade-in" style={{animationDelay: '0.6s'}}>
            Reveal a Sweet Surprise 🎂
          </GlowingButton>
        </div>
      )}
      
      {viewMode === 'categories' && (
        <div className="mt-auto mb-3 animate-appear-subtle" style={{animationDelay: `${0.4 + LETTER_CATEGORIES.length * 0.05}s`}}>
          { (!checkAllMainLettersRead() || openedLetters.size < LOVE_LETTERS_MESSAGES.length )&& (
             <GlowingButton onClick={onShowCake} className="text-md py-2.5 px-5">
              Skip to Sweet Surprise 🎂
            </GlowingButton>
          )}
          {(lettersReadOverall > 0 || allCategoriesCompleted.size > 0) && (
            <button 
              onClick={handleStartOver} 
              className="mt-4 block mx-auto text-xs text-purple-300/80 hover:text-purple-200/90 hover:underline transition-colors"
            >
              Read Again 💫 (Start Over)
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LoveLettersScreen;
