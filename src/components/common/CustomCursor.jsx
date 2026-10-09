import React, { useEffect, useState, useRef } from "react";

const STATE_CONFIG = {
  default: {
    size: 10,
    borderWidth: 1.5,
    glow: "0 0 6px rgba(255, 224, 130, 0.45)",
    bg: "transparent",
    dotSize: 3,
  },
  text: {
    size: 14,
    borderWidth: 1.5,
    glow: "0 0 8px rgba(255, 224, 130, 0.4)",
    bg: "transparent",
    dotSize: 3,
  },
  link: {
    size: 20,
    borderWidth: 1.5,
    glow: "0 0 10px rgba(255, 224, 130, 0.5)",
    bg: "rgba(255, 224, 130, 0.04)",
    dotSize: 4,
  },
  button: {
    size: 26,
    borderWidth: 1.5,
    glow: "0 0 12px rgba(255, 224, 130, 0.55), 0 0 4px rgba(255, 224, 130, 0.35)",
    bg: "rgba(255, 224, 130, 0.05)",
    dotSize: 5,
  },
  project: {
    size: 26,
    borderWidth: 1.5,
    glow: "0 0 12px rgba(255, 224, 130, 0.55), 0 0 4px rgba(255, 224, 130, 0.35)",
    bg: "rgba(255, 224, 130, 0.05)",
    dotSize: 5,
  },
  image: {
    size: 26,
    borderWidth: 1.5,
    glow: "0 0 12px rgba(255, 224, 130, 0.55), 0 0 4px rgba(255, 224, 130, 0.35)",
    bg: "rgba(255, 224, 130, 0.05)",
    dotSize: 5,
  },
};

export default function CustomCursor() {
  const [isSupported, setIsSupported] = useState(false);
  const [cursorState, setCursorState] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mousePos = useRef({ x: -200, y: -200, targetX: -200, targetY: -200 });
  const renderPos = useRef({ x: -200, y: -200 });
  const cursorRef = useRef(null);
  const rafId = useRef(null);

  // Check hover & fine pointer support + reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const checkSupport = () => {
      const supported = hoverQuery.matches;
      setIsSupported(supported);
      if (supported) {
        document.body.classList.add("has-custom-cursor");
      } else {
        document.body.classList.remove("has-custom-cursor");
      }
    };

    checkSupport();
    hoverQuery.addEventListener("change", checkSupport);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      hoverQuery.removeEventListener("change", checkSupport);
    };
  }, []);

  // Mouse tracking and RAF interpolation loop
  useEffect(() => {
    if (!isSupported) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = reducedMotionQuery.matches;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mousePos.current.x = clientX;
      mousePos.current.y = clientY;

      if (!isVisible) {
        renderPos.current.x = clientX;
        renderPos.current.y = clientY;
        setIsVisible(true);
      }

      // Check for subtle magnetic pull on buttons / interactive controls
      const magneticTarget = e.target.closest(
        'button, [data-cursor="button"], nav a, a.inline-flex, .btn, [role="button"]'
      );

      if (magneticTarget && !prefersReducedMotion) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const maxPull = 5;
        const pullX = Math.max(-maxPull, Math.min(maxPull, (deltaX / (rect.width / 2)) * maxPull));
        const pullY = Math.max(-maxPull, Math.min(maxPull, (deltaY / (rect.height / 2)) * maxPull));
        mousePos.current.targetX = clientX - pullX * 0.4;
        mousePos.current.targetY = clientY - pullY * 0.4;
      } else {
        mousePos.current.targetX = clientX;
        mousePos.current.targetY = clientY;
      }

      // State detection hierarchy
      const explicitCursor = e.target.closest("[data-cursor]");
      if (explicitCursor) {
        const stateType = explicitCursor.getAttribute("data-cursor");
        setCursorState(stateType || "default");
        return;
      }

      // Project Cards & Detail view links
      if (
        e.target.closest(
          '[data-project-card], .project-card, a[href^="/projects/"], a[href^="/experience/"], a[href^="/achievements/"]'
        )
      ) {
        setCursorState("project");
        return;
      }

      // Interactive images inside links or cards
      if (e.target.closest("img, [data-interactive-image]")) {
        const inInteractive = e.target.closest('a, button, [role="button"], .group');
        if (inInteractive) {
          setCursorState("image");
          return;
        }
      }

      // Buttons
      if (
        e.target.closest(
          'button, [role="button"], input[type="button"], input[type="submit"], .btn'
        )
      ) {
        setCursorState("button");
        return;
      }

      // Links & Navigation
      if (e.target.closest("a, nav a, header a, [role=\"link\"]")) {
        setCursorState("link");
        return;
      }

      // Text emphasis / Headings
      if (e.target.closest("h1, h2, h3, h4, h5, h6")) {
        setCursorState("text");
        return;
      }

      // Default
      setCursorState("default");
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth RAF loop
    const lerpSpeed = prefersReducedMotion ? 1 : 0.22;
    const animate = () => {
      const { targetX, targetY } = mousePos.current;
      renderPos.current.x += (targetX - renderPos.current.x) * lerpSpeed;
      renderPos.current.y += (targetY - renderPos.current.y) * lerpSpeed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${renderPos.current.x}px, ${renderPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isSupported, isVisible]);

  if (!isSupported) return null;

  const config = STATE_CONFIG[cursorState] || STATE_CONFIG.default;
  const currentSize = config.size;
  const scale = isClicking ? 0.88 : 1;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
      style={{
        transform: `translate3d(${renderPos.current.x}px, ${renderPos.current.y}px, 0) translate(-50%, -50%)`,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease-out",
      }}
    >
      <div
        className="relative rounded-full flex items-center justify-center transition-all duration-200 ease-out"
        style={{
          width: `${currentSize}px`,
          height: `${currentSize}px`,
          border: `${config.borderWidth}px solid #FFE082`,
          backgroundColor: config.bg,
          boxShadow: config.glow,
          transform: `scale(${scale})`,
          mixBlendMode: "difference",
        }}
      >
        {/* Concentric center dot matching reference photo */}
        <div
          className="rounded-full bg-[#FFE082] pointer-events-none transition-all duration-200"
          style={{
            width: `${config.dotSize}px`,
            height: `${config.dotSize}px`,
          }}
        />
      </div>
    </div>
  );
}
