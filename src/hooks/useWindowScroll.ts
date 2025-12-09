import { useEffect } from 'react';

/**
 * Generic hook for attaching/detaching scroll event listeners.
 * @param handler - Callback function to execute on scroll events
 */
export const useWindowScroll = (handler: () => void): void => {
  useEffect(() => {
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [handler]);
};
