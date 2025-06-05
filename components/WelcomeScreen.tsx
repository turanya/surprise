import React, { useEffect, useRef } from 'react';
import GlowingButton from './GlowingButton';

interface WelcomeScreenProps {
  onEnter: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    
    const colors = [
      'rgba(139, 92, 246, 0.8)', // Deep purple
      'rgba(192, 132, 252, 0.8)', // Light purple
      'rgba(249, 168, 212, 0.8)', // Pink
      'rgba(255, 255, 255, 0.8)', // White
      'rgba(236, 72, 153, 0.8)'   // Hot pink
    ];
    
    // Create initial particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 1.2,
        speedY: (Math.random() - 0.5) * 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.5,
        life: Math.random() * 100
      });
    }
    
    let animationFrameId: number;
    
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create new particles occasionally
      if (Math.random() < 0.4 && particles.length < 200) {
        particles.push({
          x: Math.random() < 0.5 ? 
              (Math.random() < 0.5 ? 0 : canvas.width) : 
              Math.random() * canvas.width,
          y: Math.random() < 0.5 ? 
              (Math.random() < 0.5 ? 0 : canvas.height) : 
              Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.7 + 0.3,
          life: Math.random() * 100
        });
      }
      
      particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace('0.8', particle.alpha.toString());
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
            particle.x < -50 || particle.x > canvas.width + 50 || 
            particle.y < -50 || particle.y > canvas.height + 50) {
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
      className="relative flex flex-col items-center justify-center text-center p-4 min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900"
    >
      {/* Animated background particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
      />
      
      {/* Floating decorative shapes */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={i}
          className="absolute z-0"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float${i % 3 + 1} ${15 + Math.random() * 15}s infinite ease-in-out`,
            opacity: 0.1 + Math.random() * 0.2
          }}
        >
          <svg width={40 + Math.random() * 60} height={40 + Math.random() * 60} viewBox="0 0 100 100">
            {i % 3 === 0 && <circle cx="50" cy="50" r="40" fill="rgba(192, 132, 252, 0.15)" />}
            {i % 3 === 1 && <polygon points="50,10 90,90 10,90" fill="rgba(249, 168, 212, 0.15)" />}
            {i % 3 === 2 && <rect x="10" y="10" width="80" height="80" fill="rgba(139, 92, 246, 0.15)" />}
          </svg>
        </div>
      ))}
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl">
        {/* Animated profile container */}
        <div className="mb-12 relative">
          {/* Floating profile picture with glow */}
          <div className="animate-[float-profile_8s_ease-in-out_infinite]">
            <div className="relative">
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-full animate-[pulse-ring_4s_ease-in-out_infinite] border-4 border-purple-400 opacity-70"></div>
              
              {/* Profile image */}
              <img 
                src="/Black selfie.jpg" 
                alt="Profile Picture" 
                className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-full border-4 border-white shadow-[0_0_40px_#c084fc,0_0_80px_#f9a8d4]"
              />
              
              {/* Floating particles around profile */}
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-purple-400 animate-[orbit_8s_linear_infinite]"
                  style={{
                    top: '50%',
                    left: '50%',
                    animationDelay: `${-i * 1.2}s`,
                    transform: `rotate(${i * 45}deg) translate(100px) rotate(-${i * 45}deg)`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Animated title text */}
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white animate-[text-glow_3s_ease-in-out_infinite]">
          Welcome to Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">Universe</span>
        </h1>
        
        {/* Animated subtitle */}
        <p className="text-xl md:text-2xl mb-10 text-purple-200 max-w-2xl animate-[fadeIn_2s_ease-out]">
          Where every moment is a beautiful journey through the stars
        </p>
        
        {/* Floating button */}
        <div className="mt-8 animate-[float-button_5s_ease-in-out_infinite]">
          <GlowingButton 
            onClick={onEnter} 
            className="text-xl md:text-2xl px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span className="relative flex items-center">
              Enter Our Universe 
              {/* Animated arrow icon */}
              <svg 
                className="ml-3 animate-[pulse-arrow_1.5s_ease-in-out_infinite]"
                width="24" 
                height="24" 
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
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-purple-900/70 to-transparent z-5"></div>
      
      {/* Floating geometric elements */}
      <div className="absolute top-1/4 right-10 w-24 h-24 rounded-full bg-pink-500/10 animate-[pulse-slow_8s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/3 left-10 w-16 h-16 rotate-45 bg-purple-500/10 animate-[pulse-slow_7s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full bg-indigo-500/10 animate-[pulse-slow_9s_ease-in-out_infinite]"></div>

      {/* Combined animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float-button {
          0% { transform: translateY(0) rotate(-0.5deg); }
          50% { transform: translateY(-15px) rotate(0.5deg); }
          100% { transform: translateY(0) rotate(-0.5deg); }
        }
        
        @keyframes float-profile {
          0% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-8px) rotate(-1deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.7; box-shadow: 0 0 0 0px rgba(192, 132, 252, 0.5); }
          50% { transform: scale(1.05); opacity: 0.4; box-shadow: 0 0 0 15px rgba(192, 132, 252, 0); }
          100% { transform: scale(1); opacity: 0.7; box-shadow: 0 0 0 0px rgba(192, 132, 252, 0); }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        
        @keyframes pulse-arrow {
          0% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(8px); opacity: 0.7; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes text-glow {
          0% { text-shadow: 0 0 5px rgba(255,255,255,0.2); }
          50% { text-shadow: 0 0 20px rgba(255,255,255,0.6); }
          100% { text-shadow: 0 0 5px rgba(255,255,255,0.2); }
        }
        
        @keyframes float1 {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-40px) translateX(20px) rotate(10deg); }
          100% { transform: translateY(0) translateX(0) rotate(0deg); }
        }
        
        @keyframes float2 {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-60px) translateX(-30px) rotate(-15deg); }
          100% { transform: translateY(0) translateX(0) rotate(0deg); }
        }
        
        @keyframes float3 {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-50px) translateX(40px) rotate(20deg); }
          100% { transform: translateY(0) translateX(0) rotate(0deg); }
        }
        
        @keyframes pulse-slow {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;