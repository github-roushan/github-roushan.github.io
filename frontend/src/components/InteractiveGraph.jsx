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
          highlightNode: 'rgba(78, 201, 176, 0.95)',
          neighborNode: 'rgba(206, 145, 120, 0.9)',
          strongEdge: 'rgba(86, 156, 214, 0.65)',
          mediumEdge: 'rgba(86, 156, 214, 0.35)'
        };
      }
      return {
        nodeFill: 'rgba(59, 130, 246, 0.9)', // primary
        line: 'rgba(17, 24, 39, 0.14)', // slate-900 with alpha
        backgroundGlow: 'rgba(16, 185, 129, 0.05)',
        highlightNode: 'rgba(16, 185, 129, 0.95)',
        neighborNode: 'rgba(168, 85, 247, 0.9)',
        strongEdge: 'rgba(59, 130, 246, 0.65)',
        mediumEdge: 'rgba(59, 130, 246, 0.35)'
      };
    };

    // Graph model
    /** @type {{x:number,y:number,vx:number,vy:number,r:number,twinkle:number}[]} */
    let nodes = [];
    const mouse = { x: 0, y: 0, active: false };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const seedNodes = () => {
      const { innerWidth, innerHeight } = window;
      // Increased density: ~1 node per 7000 px^2 (with caps)
      const area = innerWidth * innerHeight;
      const targetCount = prefersReducedMotion
        ? Math.max(35, Math.min(80, Math.floor(area / 14000)))
        : Math.max(60, Math.min(160, Math.floor(area / 7000)));

      nodes = Array.from({ length: targetCount }).map(() => ({
        x: randomInRange(0, innerWidth),
        y: randomInRange(0, innerHeight),
        vx: randomInRange(-0.6, 0.6),
        vy: randomInRange(-0.6, 0.6),
        r: randomInRange(2.0, 3.4),
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

    // Geometry helpers
    const distancePointToSegment = (px, py, x1, y1, x2, y2) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      if (dx === 0 && dy === 0) return Math.hypot(px - x1, py - y1);
      const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)));
      const projX = x1 + t * dx;
      const projY = y1 + t * dy;
      return Math.hypot(px - projX, py - projY);
    };

    // Animation
    let lastTimestamp = 0;
    const step = (timestamp) => {
      if (!isRunning) return;

      const dtMs = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      const delta = Math.min(dtMs, 32) / 16.6667; // normalize to ~60fps

      const { innerWidth, innerHeight } = window;
      const { nodeFill, line, backgroundGlow, highlightNode, neighborNode, strongEdge, mediumEdge } = getColors();

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

      const connectionDistance = prefersReducedMotion ? 110 : 160;
      const mouseInfluenceRadius = prefersReducedMotion ? 120 : 190;

      // 1) Integrate physics (no draw)
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
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

        node.x += node.vx * delta;
        node.y += node.vy * delta;
        node.vx *= 0.995;
        node.vy *= 0.995;
        node.vx += Math.sin(node.twinkle) * 0.0015 * delta;
        node.vy += Math.cos(node.twinkle) * 0.0015 * delta;
        node.twinkle += 0.015 * delta;

        if (node.x <= 0 || node.x >= innerWidth) node.vx *= -1;
        if (node.y <= 0 || node.y >= innerHeight) node.vy *= -1;
        node.x = Math.max(0, Math.min(innerWidth, node.x));
        node.y = Math.max(0, Math.min(innerHeight, node.y));
      }

      // 2) Hover detection & neighborhood building
      let hoveredNodeIndex = -1;
      let hoveredEdgeI = -1;
      let hoveredEdgeJ = -1;
      const neighborIndices = new Set();
      const strongEdgeSet = new Set();
      const mediumEdgeSet = new Set();
      const edgeKey = (i, j) => (i < j ? `${i}-${j}` : `${j}-${i}`);

      if (mouse.active) {
        // Node hover (priority)
        let minNodeDist = Infinity;
        for (let i = 0; i < nodes.length; i += 1) {
          const n = nodes[i];
          const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
          const threshold = Math.max(16, n.r * 3);
          if (d < threshold && d < minNodeDist) {
            hoveredNodeIndex = i;
            minNodeDist = d;
          }
        }

        // Edge hover if no node is hovered
        if (hoveredNodeIndex === -1) {
          const edgeThreshold = 8;
          let minEdgeDist = Infinity;
          for (let i = 0; i < nodes.length; i += 1) {
            for (let j = i + 1; j < nodes.length; j += 1) {
              const a = nodes[i];
              const b = nodes[j];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const distance = Math.hypot(dx, dy);
              if (distance < connectionDistance) {
                const d = distancePointToSegment(mouse.x, mouse.y, a.x, a.y, b.x, b.y);
                if (d < edgeThreshold && d < minEdgeDist) {
                  minEdgeDist = d;
                  hoveredEdgeI = i;
                  hoveredEdgeJ = j;
                }
              }
            }
          }
        }
      }

      // Build neighbor sets and edge highlight sets
      if (hoveredNodeIndex !== -1) {
        for (let j = 0; j < nodes.length; j += 1) {
          if (j === hoveredNodeIndex) continue;
          const a = nodes[hoveredNodeIndex];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < connectionDistance) {
            neighborIndices.add(j);
            strongEdgeSet.add(edgeKey(hoveredNodeIndex, j));
          }
        }
      } else if (hoveredEdgeI !== -1) {
        strongEdgeSet.add(edgeKey(hoveredEdgeI, hoveredEdgeJ));
        neighborIndices.add(hoveredEdgeI);
        neighborIndices.add(hoveredEdgeJ);
        const endpoints = [hoveredEdgeI, hoveredEdgeJ];
        for (const e of endpoints) {
          for (let k = 0; k < nodes.length; k += 1) {
            if (k === e) continue;
            const a = nodes[e];
            const b = nodes[k];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < connectionDistance) {
              neighborIndices.add(k);
              mediumEdgeSet.add(edgeKey(e, k));
            }
          }
        }
      }

      // 3) Draw edges (base then highlights via style)
      context.lineWidth = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < connectionDistance) {
            const opacity = 1 - dist / connectionDistance;
            const key = edgeKey(i, j);
            if (strongEdgeSet.has(key)) {
              context.strokeStyle = strongEdge;
              context.lineWidth = 1.6;
            } else if (mediumEdgeSet.has(key)) {
              context.strokeStyle = mediumEdge;
              context.lineWidth = 1.2;
            } else {
              context.strokeStyle = line.replace(/\d?\.\d+\)/, `${Math.max(0.1, opacity * 0.9)})`);
              context.lineWidth = 1;
            }
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      // 4) Draw nodes (with highlights and rings)
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        const baseRadius = node.r + Math.sin(node.twinkle) * 0.25;
        let radius = baseRadius;
        let fill = nodeFill;
        const isEndpoint = i === hoveredEdgeI || i === hoveredEdgeJ;

        if (i === hoveredNodeIndex) {
          radius *= 1.8;
          fill = highlightNode;
        } else if (isEndpoint) {
          radius *= 1.5;
          fill = highlightNode;
        }

        context.beginPath();
        context.arc(node.x, node.y, radius, 0, Math.PI * 2);
        context.fillStyle = fill;
        context.fill();

        // Neighbor ring
        if (neighborIndices.has(i) && i !== hoveredNodeIndex && !isEndpoint) {
          context.beginPath();
          context.arc(node.x, node.y, radius + 2, 0, Math.PI * 2);
          context.strokeStyle = neighborNode;
          context.lineWidth = 1.5;
          context.stroke();
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


