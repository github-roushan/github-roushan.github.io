import React, { useEffect, useRef } from 'react';

/**
 * Fullscreen animated node-link graph background.
 * - Adapts density to viewport size and respects prefers-reduced-motion
 * - Reacts to mouse movement (attraction) and draws edges for nearby nodes
 * - Automatically adapts to light/dark theme by reading the root class
 */
const InteractiveGraph = () => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(0);
  const handleResizeRef = useRef(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let isRunning = true;
    let deviceScale = Math.min(window.devicePixelRatio || 1, 2);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Sizing helpers
    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      deviceScale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(innerWidth * deviceScale);
      canvas.height = Math.floor(innerHeight * deviceScale);
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
    };

    // Colors adapt to theme
    const isDark = () => document.documentElement.classList.contains('dark');
    const getColors = () => {
      if (isDark()) {
        return {
          nodeFill: 'rgba(86, 156, 214, 0.9)', // dark-primary
          line: 'rgba(212, 212, 212, 0.18)', // light gray lines
          backgroundGlow: 'rgba(78, 201, 176, 0.06)',
        };
      }
      return {
        nodeFill: 'rgba(59, 130, 246, 0.9)', // primary
        line: 'rgba(17, 24, 39, 0.14)', // slate-900 with alpha
        backgroundGlow: 'rgba(16, 185, 129, 0.05)',
      };
    };

    // Graph model
    /** @type {{x:number,y:number,vx:number,vy:number,r:number,twinkle:number}[]} */
    let nodes = [];
    const mouse = { x: 0, y: 0, active: false };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const seedNodes = () => {
      const { innerWidth, innerHeight } = window;
      // Density: ~1 node per 9500 px^2, capped for perf
      const area = innerWidth * innerHeight;
      const targetCount = prefersReducedMotion
        ? Math.max(25, Math.min(60, Math.floor(area / 18000)))
        : Math.max(40, Math.min(120, Math.floor(area / 9500)));

      nodes = Array.from({ length: targetCount }).map(() => ({
        x: randomInRange(0, innerWidth),
        y: randomInRange(0, innerHeight),
        vx: randomInRange(-0.6, 0.6),
        vy: randomInRange(-0.6, 0.6),
        r: randomInRange(1.4, 2.6),
        twinkle: randomInRange(0, Math.PI * 2),
      }));
    };

    // Interaction
    const onMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
    };

    // Animation
    let lastTimestamp = 0;
    const step = (timestamp) => {
      if (!isRunning) return;

      const dtMs = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      const delta = Math.min(dtMs, 32) / 16.6667; // normalize to ~60fps

      const { innerWidth, innerHeight } = window;
      const { nodeFill, line, backgroundGlow } = getColors();

      // Clear with slight translucency for motion trails
      context.clearRect(0, 0, innerWidth, innerHeight);

      // Optional subtle vignette/glow
      const gradient = context.createRadialGradient(
        innerWidth * 0.5,
        innerHeight * 0.5,
        Math.min(innerWidth, innerHeight) * 0.1,
        innerWidth * 0.5,
        innerHeight * 0.5,
        Math.max(innerWidth, innerHeight) * 0.8
      );
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, backgroundGlow);
      context.fillStyle = gradient;
      context.fillRect(0, 0, innerWidth, innerHeight);

      const connectionDistance = prefersReducedMotion ? 95 : 140;
      const mouseInfluenceRadius = prefersReducedMotion ? 110 : 170;

      // Integrate physics and draw nodes
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];

        // Attraction towards mouse
        if (mouse.active) {
          const dxToMouse = mouse.x - node.x;
          const dyToMouse = mouse.y - node.y;
          const distanceToMouse = Math.hypot(dxToMouse, dyToMouse);
          if (distanceToMouse < mouseInfluenceRadius) {
            const influence = (mouseInfluenceRadius - distanceToMouse) / mouseInfluenceRadius;
            node.vx += (dxToMouse / (distanceToMouse + 0.001)) * influence * 0.08 * delta;
            node.vy += (dyToMouse / (distanceToMouse + 0.001)) * influence * 0.08 * delta;
          }
        }

        // Integrate velocity, add gentle drift
        node.x += node.vx * delta;
        node.y += node.vy * delta;
        node.vx *= 0.995; // friction
        node.vy *= 0.995;
        node.vx += Math.sin(node.twinkle) * 0.0015 * delta;
        node.vy += Math.cos(node.twinkle) * 0.0015 * delta;
        node.twinkle += 0.015 * delta;

        // Screen bounds bounce
        if (node.x <= 0 || node.x >= innerWidth) node.vx *= -1;
        if (node.y <= 0 || node.y >= innerHeight) node.vy *= -1;
        node.x = Math.max(0, Math.min(innerWidth, node.x));
        node.y = Math.max(0, Math.min(innerHeight, node.y));

        // Draw node
        context.beginPath();
        const twinkleRadius = node.r + Math.sin(node.twinkle) * 0.25;
        context.arc(node.x, node.y, twinkleRadius, 0, Math.PI * 2);
        context.fillStyle = nodeFill;
        context.fill();
      }

      // Draw edges
      context.lineWidth = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            context.strokeStyle = line.replace(/\d?\.\d+\)/, `${opacity * 0.9})`);
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      animationIdRef.current = requestAnimationFrame(step);
    };

    // Initialize
    resizeCanvas();
    seedNodes();
    lastTimestamp = performance.now();
    animationIdRef.current = requestAnimationFrame(step);

    // Events
    const handleResize = () => {
      resizeCanvas();
      seedNodes();
    };
    handleResizeRef.current = handleResize;

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });

    // Re-render colors when theme toggles (MutationObserver on class="dark")
    const observer = new MutationObserver(() => {
      // Trigger a soft redraw by resetting last timestamp
      lastTimestamp = performance.now();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Cleanup
    return () => {
      isRunning = false;
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none select-none"
      aria-hidden="true"
    />
  );
};

export default InteractiveGraph;


