
import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import * as THREE from 'three';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

const AnimatedBackground = ({ children }: AnimatedBackgroundProps) => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Dynamic import to avoid SSR issues and to only load when needed
    const loadVanta = async () => {
      if (!vantaEffect && vantaRef.current) {
        try {
          // Dynamically import the vanta waves effect
          const WAVES = (await import('vanta/dist/vanta.waves.min')).default;
          
          setVantaEffect(
            WAVES({
              el: vantaRef.current,
              THREE: THREE,
              mouseControls: false,
              touchControls: false,
              gyroControls: false,
              minHeight: 200,
              minWidth: 200,
              scale: isMobile ? 1.0 : 1.5,
              scaleMobile: 1.0,
              color: 0x9b87f5, // Agent purple color
              shininess: 35,
              waveHeight: 15,
              waveSpeed: 0.75,
              zoom: 0.9
            })
          );
        } catch (error) {
          console.error("Failed to load Vanta effect:", error);
          // Fall back to static background if Vanta fails to load
          setPrefersReducedMotion(true);
        }
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, isMobile]);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  if (prefersReducedMotion) {
    // Provide a static gradient background for users who prefer reduced motion
    return (
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-agent-light-purple/30 to-white" aria-hidden="true" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div 
        ref={vantaRef}
        className="absolute inset-0" 
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;
