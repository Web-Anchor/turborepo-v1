'use client';

import { useEffect, useState } from 'react';

type ScrollDirection = 'up' | 'down' | null;

interface UseVerticalScrollProps {
  onScrollUp?: (distance: number) => void;
  onScrollDown?: (distance: number) => void;
  onScrollEnd?: () => void;
  threshold?: number; // Optional threshold for triggering scroll events
}

export const useVerticalScroll = ({
  onScrollUp,
  onScrollDown,
  onScrollEnd,
  threshold = 0,
}: UseVerticalScrollProps) => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (Math.abs(currentScrollTop - lastScrollTop) <= threshold) {
        return;
      }

      const distance = Math.abs(currentScrollTop - lastScrollTop);
      setScrollDistance((prevDistance) => prevDistance + distance);

      if (currentScrollTop > lastScrollTop) {
        setScrollDirection('down');
        if (onScrollDown) onScrollDown(distance);
      } else {
        setScrollDirection('up');
        if (onScrollUp) onScrollUp(distance);
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); // For Mobile or negative scrolling

      if (
        window.innerHeight + currentScrollTop >=
        document.documentElement.scrollHeight
      ) {
        if (onScrollEnd) onScrollEnd();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop, onScrollDown, onScrollUp, onScrollEnd, threshold]);

  return { scrollDirection, scrollDistance };
};
