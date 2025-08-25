import React, { useEffect, useRef } from 'react';
import './Stars.css';

const Stars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star class
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.color = this.getRandomStarColor();
      }

      getRandomStarColor() {
        const colors = [
          '#ffffff',     // White
          '#b366ff',     // Light purple (matching your theme)
          '#ffd700',     // Gold
          '#87ceeb',     // Sky blue
          '#f0f8ff'      // Alice blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Static stars - no animation needed
        // Keep opacity static for performance
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        // Create star shape
        const size = this.size;
        
        // Draw main star body
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = size * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Create star system
    const stars = [];
    const starCount = 300; // Much richer starfield

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    // Static rendering - no animation loop needed
    const renderStars = () => {
      // Clear canvas once
      ctx.fillStyle = 'rgba(26, 26, 26, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw all stars once
      stars.forEach(star => {
        star.draw();
      });
    };

    // Render stars once
    renderStars();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1, // Above background but below content
        pointerEvents: 'none'
      }}
    />
  );
};

export default Stars;
