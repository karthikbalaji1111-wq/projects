import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  token: string;
  hue: number;
}

const tokens = ["#", "```", "AI", "MD", "npm", "TS", "</>", "README", "MIT"];

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    const particles: Particle[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles.length = 0;

      const count = Math.max(34, Math.floor(width / 26));
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.26,
          vy: (Math.random() - 0.5) * 0.24,
          size: 10 + Math.random() * 16,
          token: tokens[index % tokens.length],
          hue: [186, 152, 42, 212][index % 4],
        });
      }
    };

    const render = () => {
      context.clearRect(0, 0, width, height);

      const gradient = context.createRadialGradient(
        width * 0.5,
        height * 0.3,
        20,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8,
      );
      gradient.addColorStop(0, "rgba(34, 211, 238, 0.16)");
      gradient.addColorStop(0.42, "rgba(20, 184, 166, 0.08)");
      gradient.addColorStop(0.72, "rgba(250, 204, 21, 0.035)");
      gradient.addColorStop(1, "rgba(3, 6, 12, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -40) particle.x = width + 40;
        if (particle.x > width + 40) particle.x = -40;
        if (particle.y < -40) particle.y = height + 40;
        if (particle.y > height + 40) particle.y = -40;

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next];
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (distance < 145) {
            context.strokeStyle = `rgba(148, 163, 184, ${0.13 - distance / 1300})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }

        context.font = `600 ${particle.size}px Inter, ui-sans-serif`;
        context.fillStyle = `hsla(${particle.hue}, 90%, 70%, 0.22)`;
        context.fillText(particle.token, particle.x, particle.y);
      });

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
