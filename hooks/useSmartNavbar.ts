"use client";
import { useState, useEffect } from 'react';

export const useSmartNavbar = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateTheme = () => {
      // Get navbar position
      const navbar = document.getElementById('navbar');
      if (!navbar) return;

      const navbarRect = navbar.getBoundingClientRect();
      const navbarCenter = navbarRect.top + navbarRect.height / 2;

      // Find which section is at the navbar position
      const sections = document.querySelectorAll('[data-theme]');
      let currentTheme: 'light' | 'dark' = 'light';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navbarCenter && rect.bottom >= navbarCenter) {
          const sectionTheme = section.getAttribute('data-theme');
          currentTheme = sectionTheme === 'dark' ? 'dark' : 'light';
      
        }
      });

      setTheme(currentTheme);
    };

    // Update on scroll
    const handleScroll = () => {
      requestAnimationFrame(updateTheme);
    };

    // Initial update
    updateTheme();

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateTheme);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateTheme);
    };
  }, []);

  return theme;
}; 