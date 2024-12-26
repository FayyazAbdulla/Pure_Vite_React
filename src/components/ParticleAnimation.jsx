import React, { useEffect, useRef } from 'react';

const EnhancedParticleAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Utility functions
    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.baseSize = this.size;
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
        this.velocity = {
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 3
        };
        this.life = Math.random() * 0.5 + 0.5;
        this.maxLife = this.life;
      }

      update(mouse) {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Boundary check
        if (this.x < 0 || this.x > canvas.width) this.velocity.x *= -1;
        if (this.y < 0 || this.y > canvas.height) this.velocity.y *= -1;

        // Mouse interaction
        if (mouse.x && mouse.y) {
          const dist = distance(this.x, this.y, mouse.x, mouse.y);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(this.y - mouse.y, this.x - mouse.x);
            this.velocity.x += Math.cos(angle) * force * 0.2;
            this.velocity.y += Math.sin(angle) * force * 0.2;
            this.size = lerp(this.size, this.baseSize * 1.5, 0.1);
          } else {
            this.size = lerp(this.size, this.baseSize, 0.1);
          }
        }

        // Natural movement
        this.velocity.x += (Math.random() - 0.5) * 0.2;
        this.velocity.y += (Math.random() - 0.5) * 0.2;
        this.velocity.x = clamp(this.velocity.x, -3, 3);
        this.velocity.y = clamp(this.velocity.y, -3, 3);

        // Update life
        this.life -= 0.005;
        if (this.life <= 0) this.respawn();
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      respawn() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.life = this.maxLife;
        this.size = this.baseSize;
      }
    }

    // Create particles
    const particleCount = 150;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Mouse object
    const mouse = {
      x: null,
      y: null,
      radius: 150
    };

    // Event listeners
    canvas.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(mouse);
        particle.draw(ctx);
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', () => {});
      canvas.removeEventListener('mouseleave', () => {});
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-gray-900" />;
};

export default EnhancedParticleAnimation;

