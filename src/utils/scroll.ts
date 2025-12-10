/**
 * Scroll utility functions for detecting scroll position and throttling.
 */

/**
 * Check if the user has scrolled near the bottom of the page.
 * Uses document.documentElement.scrollHeight for more reliable calculations.
 * @param threshold - Distance from bottom in pixels (default 300px)
 * @returns true if within threshold of bottom, false otherwise
 */
export const isNearBottom = (threshold: number = 300): boolean => {
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;
  const distanceFromBottom = pageHeight - scrollPosition;
  return distanceFromBottom <= threshold;
};

/**
 * Throttle function to limit how often a callback is executed.
 * @param callback - Function to throttle
 * @param delayMs - Minimum time (in milliseconds) between executions (default 1000ms)
 * @returns Throttled function
 */
export const throttle = <T extends unknown[]>(callback: (...args: T) => void, delayMs = 1000) => {
  let lastCall = 0;

  return (...args: T) => {
    const now = Date.now();
    if (now - lastCall >= delayMs) {
      lastCall = now;
      callback(...args);
    }
  };
};
