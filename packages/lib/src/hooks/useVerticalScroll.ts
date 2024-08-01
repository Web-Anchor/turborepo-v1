'use client';

import { useEffect, useState } from 'react';

type UseVerticalScrollProps = {
  onScrollUp?: (props: ScrollTypes) => void;
  onScrollDown?: (props: ScrollTypes) => void;
  onScrollEnd?: () => void;
  threshold?: number; // Optional threshold for triggering scroll events
};

type ScrollTypes = {
  lastScrollTop: number;
  scrollDirection: string | null;
  scrollDistance: number;
  distanceFromTop: number;
  distanceFromBottom: number;
  windowHeight: number;
};

export const useVerticalScroll = ({
  onScrollUp,
  onScrollDown,
  onScrollEnd,
  threshold = 0,
}: UseVerticalScrollProps) => {
  const [scrollState, setScrollTypes] = useState<ScrollTypes>({
    lastScrollTop: 0,
    scrollDirection: null,
    scrollDistance: 0,
    distanceFromTop: 0,
    distanceFromBottom: 0,
    windowHeight: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (Math.abs(currentScrollTop - scrollState.lastScrollTop) <= threshold) {
        return;
      }

      const distance = Math.abs(currentScrollTop - scrollState.lastScrollTop);

      setScrollTypes((prevState) => {
        const newScrollDistance = prevState.scrollDistance + distance;
        const newDistanceFromTop = currentScrollTop;
        const newDistanceFromBottom =
          document.documentElement.scrollHeight -
          currentScrollTop -
          window.innerHeight;

        let stats: ScrollTypes = {
          lastScrollTop: currentScrollTop <= 0 ? 0 : currentScrollTop,
          scrollDirection: null,
          scrollDistance: newScrollDistance,
          distanceFromTop: newDistanceFromTop,
          distanceFromBottom: newDistanceFromBottom,
          windowHeight: window.innerHeight,
        };

        if (currentScrollTop > prevState.lastScrollTop) {
          stats.scrollDirection = 'down';
          onScrollDown?.(stats);

          return stats;
        } else {
          stats.scrollDirection = 'up';
          onScrollUp?.(stats);

          return stats;
        }
      });

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
  }, [
    scrollState.lastScrollTop,
    onScrollDown,
    onScrollUp,
    onScrollEnd,
    threshold,
  ]);

  return scrollState;
};
