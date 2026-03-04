import { useState } from 'react';
import { HoliCanvas } from './components/HoliCanvas';
import { AudioPlayer } from './components/AudioPlayer';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1a2e] to-[#16213e]" />
      
      {/* Particle Canvas */}
      <HoliCanvas />
      
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <div className="glass-card rounded-[30px] p-8 md:p-12 max-w-2xl w-full animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">
              Happy Holi
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light">
              Festival of Colors, Love & Joy
            </p>
          </div>
          
          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8" />
          
          {/* Content */}
          <div className="space-y-6 text-center">
            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              May your life be filled with vibrant colors of joy, happiness, and prosperity. 
              Let's celebrate the triumph of good over evil and welcome the spring of new beginnings.
            </p>
            
            {/* Color Dots */}
            <div className="flex justify-center gap-4 py-4">
              <div className="w-6 h-6 rounded-full bg-[#FF1493] shadow-lg shadow-pink-500/50 animate-pulse" style={{ animationDelay: '0s' }} />
              <div className="w-6 h-6 rounded-full bg-[#00FF7F] shadow-lg shadow-green-500/50 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-6 h-6 rounded-full bg-[#FFD700] shadow-lg shadow-yellow-500/50 animate-pulse" style={{ animationDelay: '0.4s' }} />
              <div className="w-6 h-6 rounded-full bg-[#1E90FF] shadow-lg shadow-blue-500/50 animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
            
            {/* Audio Player */}
            <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
            
            {/* Instructions */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-white/60 text-sm">
                ✨ Click anywhere to create a color splash! ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
