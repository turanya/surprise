import React, { useEffect, useRef } from 'react';
import GlowingButton from './GlowingButton';

interface WelcomeScreenProps {
  onEnter: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Define vibrant neon color palette in component scope
  const colors = [
    'rgba(0, 247, 255, 0.8)',   // Electric Cyan
    'rgba(255, 0, 231, 0.8)',   // Neon Pink
    'rgba(0, 255, 149, 0.8)',   // Electric Green
    'rgba(255, 234, 0, 0.8)',   // Bright Yellow
    'rgba(255, 111, 0, 0.8)'    // Vivid Orange
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle system
    const particles: {
      x: number; 
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      life: number;
    }[] = [];
    
    // Create initial particles
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        life: Math.random() * 100
      });
    }
    
    let animationFrameId: number;
    
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create new particles occasionally
      if (Math.random() < 0.5 && particles.length < 250) {
        particles.push({
          x: Math.random() < 0.5 ? 0 : canvas.width,
          y: Math.random() < 0.5 ? 0 : canvas.height,
          size: Math.random() * 6 + 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.8 + 0.2,
          life: Math.random() * 100
        });
      }
      
      particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Create glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life -= 0.5;
        particle.alpha = Math.max(0, particle.alpha - 0.003);
        
        // Fade in/out effect
        if (particle.life < 20) {
          particle.alpha = particle.life / 20;
        }
        
        // Remove dead particles
        if (particle.life <= 0 || 
            particle.x < -100 || particle.x > canvas.width + 100 || 
            particle.y < -100 || particle.y > canvas.height + 100) {
          particles.splice(index, 1);
        }
      });
      
      animationFrameId = requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center text-center p-4 min-h-screen overflow-hidden bg-gradient-to-br from-[#0a0a2a] via-[#1a1a4a] to-[#2a0a45]"
    >
      {/* Animated background particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
      />
      
      {/* Floating geometric shapes with vibrant colors */}
      {[...Array(12)].map((_, i) => (
        <div 
          key={i}
          className="absolute z-0"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float${i % 3 + 1} ${10 + Math.random() * 15}s infinite ease-in-out`,
            opacity: 0.3 + Math.random() * 0.3,
            filter: 'blur(2px)'
          }}
        >
          <svg 
            width={40 + Math.random() * 80} 
            height={40 + Math.random() * 80} 
            viewBox="0 0 100 100"
            className="opacity-70"
          >
            {i % 4 === 0 && <circle cx="50" cy="50" r="40" fill="url(#grad1)" />}
            {i % 4 === 1 && <polygon points="50,10 90,90 10,90" fill="url(#grad2)" />}
            {i % 4 === 2 && <rect x="10" y="10" width="80" height="80" fill="url(#grad3)" />}
            {i % 4 === 3 && (
              <path 
                d="M50,10 Q90,50 50,90 Q10,50 50,10 Z" 
                fill="url(#grad4)" 
              />
            )}
            
            {/* Define vibrant gradients */}
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff00e7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00f7ff" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ff95" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ff00e7" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6f00" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00ff95" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffea00" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ff6f00" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl backdrop-blur-sm bg-black/20 rounded-3xl p-12 border border-[#ff00e7]/30 shadow-[0_0_60px_#ff00e7/30]">
        {/* Animated profile container */}
        <div className="mb-12 relative">
          {/* Glowing ring */}
          <div className="absolute inset-0 rounded-full animate-[pulse-ring_3s_ease-in-out_infinite] border-4 border-[#00f7ff] opacity-70"></div>
          
          {/* Floating profile picture */}
          <div className="animate-[float-profile_6s_ease-in-out_infinite]">
            <img 
              src="/Black selfie.jpg" 
              alt="Profile Picture" 
              className="w-44 h-44 md:w-64 md:h-64 object-cover rounded-full border-4 border-white shadow-[0_0_50px_#00f7ff,0_0_100px_#ff00e7]"
            />
          </div>
          
          {/* Floating particles around profile */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-4 h-4 rounded-full animate-[orbit_8s_linear_infinite]"
              style={{
                top: '50%',
                left: '50%',
                animationDelay: `${-i * 0.8}s`,
                transform: `rotate(${i * 30}deg) translate(120px) rotate(-${i * 30}deg)`,
                background: `radial-gradient(circle, ${colors[i % colors.length]}, transparent)`,
                boxShadow: `0 0 15px ${colors[i % colors.length]}`
              }}
            ></div>
          ))}
        </div>
        
        {/* Animated title text with gradient */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white animate-[text-glow_2s_ease-in-out_infinite]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f7ff] to-[#ff00e7]">
            Welcome to Our Universe
          </span>
        </h1>
        
        {/* Animated subtitle */}
        <p className="text-xl md:text-2xl mb-10 text-[#ffea00] max-w-2xl animate-[fadeIn_2s_ease-out]">
          Where digital dreams become reality
        </p>
        
        {/* Floating button with neon glow */}
        <div className="mt-8 animate-[float-button_4s_ease-in-out_infinite]">
          <GlowingButton 
            onClick={onEnter} 
            className="text-xl md:text-2xl px-10 py-5 bg-gradient-to-r from-[#ff00e7] to-[#00f7ff] hover:from-[#ff00e7] hover:to-[#00ff95] transition-all duration-300 transform hover:scale-110 shadow-[0_0_30px_#ff00e7]"
          >
            <span className="relative flex items-center font-bold tracking-wider">
              Enter Our Universe 
              {/* Animated arrow icon */}
              <svg 
                className="ml-3 animate-[pulse-arrow_1.5s_ease-in-out_infinite]"
                width="28" 
                height="28" 
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12H19" strokeLinecap="round" />
                <path d="M12 5L19 12L12 19" strokeLinecap="round" />
              </svg>
            </span>
          </GlowingButton>
        </div>
      </div>

      {/* Background animated elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#ff00e7]/20 to-transparent z-5"></div>
      
      {/* Large floating geometric elements */}
      <div className="absolute top-1/4 right-10 w-36 h-36 rounded-full bg-[#00f7ff]/10 animate-[pulse-slow_8s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/3 left-10 w-24 h-24 rotate-45 bg-[#ff00e7]/10 animate-[pulse-slow_7s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-28 h-28 rounded-full bg-[#00ff95]/10 animate-[pulse-slow_9s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#ff6f00]/10 animate-[pulse-slow_10s_ease-in-out_infinite] rounded-[50%]"></div>

      {/* Combined animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float-button {
          0% { transform: translateY(0) rotate(-0.5deg); }
          50% { transform: translateY(-20px) rotate(0.5deg); box-shadow: 0 0 40px #ff00e7; }
          100% { transform: translateY(0) rotate(-0.5deg); }
        }
        
        @keyframes float-profile {
          0% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(2deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-12px) rotate(-2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes pulse-ring {
          0% { 
            transform: scale(1); 
            opacity: 0.7; 
            box-shadow: 0 0 0 0px rgba(0, 247, 255, 0.5),
                        0 0 0 0px rgba(255, 0, 231, 0.5); 
          }
          50% { 
            transform: scale(1.05); 
            opacity: 0.4; 
            box-shadow: 0 0 0 20px rgba(0, 247, 255, 0),
                        0 0 0 40px rgba(255, 0, 231, 0); 
          }
          100% { 
            transform: scale(1); 
            opacity: 0.7; 
            box-shadow: 0 0 0 0px rgba(0, 247, 255, 0),
                        0 0 0 0px rgba(255, 0, 231, 0); 
          }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        
        @keyframes pulse-arrow {
          0% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(10px); opacity: 0.7; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes text-glow {
          0% { 
            text-shadow: 0 0 5px rgba(0, 247, 255, 0.5),
                         0 0 10px rgba(255, 0, 231, 0.3); 
          }
          50% { 
            text-shadow: 0 0 20px rgba(0, 247, 255, 0.8),
                         0 0 40px rgba(255, 0, 231, 0.6); 
          }
          100% { 
            text-shadow: 0 0 5px rgba(0, 247, 255, 0.5),
                         0 0 10px rgba(255, 0, 231, 0.3); 
          }
        }
        
        @keyframes float1 {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-60px) translateX(30px) rotate(15deg); }
          100% { transform: translateY(0) translateX(0) rotate(0deg); }
        }
        
        @keyframes float2 {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-80px) translateX(-40px) rotate(-20deg); }
          100% { transform: translateY(0) translateX(0) rotate(0deg); }
        }
        
        @keyframes float3 {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-70px) translateX(50px) rotate(25deg); }
          100% { transform: translateY(0) translateX(0) rotate(0deg); }
        }
        
        @keyframes pulse-slow {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;