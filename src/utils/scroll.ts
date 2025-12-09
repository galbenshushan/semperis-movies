/**
 * Scroll utility functions for detecting scroll position and throttling.
 */

/**
 * Check if the user has scrolled near the bottom of the page.
 * @param threshold - Distance from bottom in pixels (default 300px)
 * @returns true if within threshold of bottom, false otherwise
 */
export const isNearBottom = (threshold: number = 300): boolean => {
  const scrollPosition = window.innerHeight + window.scrollY;
  const thresholdHeight = document.documentElement.offsetHeight - threshold;
  return scrollPosition >= thresholdHeight;
};

/**
 * Throttle function to limit how often a callback is executed.
 * @param callback - Function to throttle
 * @param delayMs - Minimum time (in milliseconds) between executions (default 1000ms)
 * @returns Throttled function
 */
export const throttle = (callback: (...args: any[]) => void, delayMs = 1000) => {
  let lastCall = 0;

  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastCall >= delayMs) {
      lastCall = now;
      callback(...args);
    }
  };
};
