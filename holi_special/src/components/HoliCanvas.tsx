import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  offsetX: number;
  speed: number;
}

const COLORS = ['#FF1493', '#00FF7F', '#FFD700', '#1E90FF'];

export function HoliCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          false
        ));
      }
    };

    const createParticle = (x: number, y: number, isSplash: boolean): Particle => {
      const size = isSplash 
        ? Math.random() * 6 + 3
        : Math.random() * 6 + 2;
      
      return {
        x,
        y,
        vx: isSplash ? (Math.random() - 0.5) * 8 : 0,
        vy: isSplash ? (Math.random() - 0.5) * 8 : -0.5 - Math.random() * 1,
        size,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: isSplash ? 1 : 0.6 + Math.random() * 0.4,
        life: isSplash ? 60 : Infinity,
        maxLife: 60,
        offsetX: Math.random() * 100,
        speed: 0.02 + Math.random() * 0.03,
      };
    };

    // Handle click for color splash
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create burst of particles
      const burstCount = 25 + Math.floor(Math.random() * 10);
      for (let i = 0; i < burstCount; i++) {
        particlesRef.current.push(createParticle(x, y, true));
      }
    };

    canvas.addEventListener('click', handleClick);
    initParticles();

    // Animation loop
    const animate = () => {
      timeRef.current += 1;
      ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update position
        particle.y += particle.vy;
        particle.x += particle.vx;
        
        // Add sine wave movement for floating particles
        if (particle.life === Infinity) {
          particle.x += Math.sin(timeRef.current * particle.speed + particle.offsetX) * 0.5;
        } else {
          // Splash particles slow down
          particle.vx *= 0.98;
          particle.vy *= 0.98;
          particle.life--;
          particle.alpha = particle.life / particle.maxLife;
        }

        // Reset particle if it goes off screen (for floating particles)
        if (particle.life === Infinity) {
          if (particle.y < -10) {
            particle.y = canvas.height + 10;
            particle.x = Math.random() * canvas.width;
          }
          if (particle.x < -10) particle.x = canvas.width + 10;
          if (particle.x > canvas.width + 10) particle.x = -10;
        }

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Keep particle if it's still alive
        return particle.life > 0 || particle.life === Infinity;
      });

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ cursor: 'crosshair' }}
    />
  );
}
