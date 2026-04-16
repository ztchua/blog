import { useEffect, useRef } from 'react';

interface Blob {
  baseX: number;
  baseY: number;
  radius: number;
  color: [number, number, number];
  speedX: number;
  speedY: number;
  phase: number;
}

const BLOBS: Blob[] = [
  { baseX: 0.25, baseY: 0.25, radius: 0.55, color: [255, 0, 110], speedX: 0.00028, speedY: 0.00035, phase: 0 },
  { baseX: 0.75, baseY: 0.2, radius: 0.48, color: [0, 212, 255], speedX: 0.00035, speedY: 0.00028, phase: 1.2 },
  { baseX: 0.5, baseY: 0.65, radius: 0.52, color: [139, 92, 246], speedX: 0.0003, speedY: 0.00038, phase: 2.4 },
  { baseX: 0.15, baseY: 0.7, radius: 0.42, color: [0, 255, 136], speedX: 0.00038, speedY: 0.0003, phase: 3.6 },
  { baseX: 0.85, baseY: 0.5, radius: 0.45, color: [255, 190, 11], speedX: 0.00032, speedY: 0.00036, phase: 4.8 },
  { baseX: 0.4, baseY: 0.35, radius: 0.4, color: [58, 134, 255], speedX: 0.00036, speedY: 0.00032, phase: 6.0 },
  { baseX: 0.6, baseY: 0.85, radius: 0.38, color: [255, 77, 109], speedX: 0.00034, speedY: 0.00034, phase: 7.2 },
];

export function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const SCALE = 0.2; // render at 20% for natural softness + perf
    let w = 0, h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.ceil(w * SCALE);
      canvas.height = Math.ceil(h * SCALE);
    };
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    let animId: number;

    const draw = () => {
      frame++;
      const cw = canvas.width;
      const ch = canvas.height;

      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, cw, ch);

      ctx.globalCompositeOperation = 'screen';

      for (const blob of BLOBS) {
        const t = frame;
        const x = (blob.baseX + Math.sin(t * blob.speedX + blob.phase) * 0.22) * cw;
        const y = (blob.baseY + Math.cos(t * blob.speedY + blob.phase * 1.3) * 0.22) * ch;
        const r = blob.radius * Math.min(cw, ch) * (0.85 + 0.15 * Math.sin(t * 0.0008 + blob.phase));

        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        const [cr, cg, cb] = blob.color;
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},0.28)`);
        grad.addColorStop(0.35, `rgba(${cr},${cg},${cb},0.12)`);
        grad.addColorStop(0.7, `rgba(${cr},${cg},${cb},0.03)`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
