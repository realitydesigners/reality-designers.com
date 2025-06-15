"use client";
import { useState, useLayoutEffect, useCallback, useMemo } from 'react';

export const useSmartNavbar = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Detect theme based on current scroll position - runs once on load
  const detectInitialTheme = useCallback(() => {
    if (typeof window === 'undefined') return 'light';
    
    // Wait for navbar to be rendered, then detect which section it's over
    const navbar = document.getElementById('navbar');
    if (!navbar) return 'light';

    const navbarRect = navbar.getBoundingClientRect();
    const navbarCenter = navbarRect.top + navbarRect.height / 2;

    const sections = document.querySelectorAll('[data-theme]');
    
    // Check which section the navbar is currently positioned over
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= navbarCenter && rect.bottom >= navbarCenter) {
        const sectionTheme = section.getAttribute('data-theme');
        return sectionTheme === 'dark' ? 'dark' : 'light';
      }
    }
    
    // If no section found, default to light
    return 'light';
  }, []);

  // Memoized scroll handler to avoid recreating
  const updateTheme = useCallback(() => {
    const currentTheme = detectInitialTheme();
    setTheme(currentTheme);
  }, [detectInitialTheme]);

  // Optimized scroll handler with requestAnimationFrame throttling
  const handleScroll = useCallback(() => {
    requestAnimationFrame(updateTheme);
  }, [updateTheme]);

  // Initial theme detection - runs synchronously before paint
  useLayoutEffect(() => {
    const initialTheme = detectInitialTheme();
    setTheme(initialTheme);
    setIsReady(true);
  }, [detectInitialTheme]);

  // Scroll event listeners - separate effect for better performance
  useLayoutEffect(() => {
    if (!isReady) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateTheme, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateTheme);
    };
  }, [isReady, handleScroll, updateTheme]);

  return { theme, isReady };
}; 