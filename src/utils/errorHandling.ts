/**
 * Error handling utilities
 */

/**
 * Normalizes an unknown error value into a user-facing message.
 * If the error is an Error instance with a non-empty message, returns that message.
 * Otherwise returns the fallback message.
 *
 * @param err - Unknown error value to normalize
 * @param fallback - Default message to return if error cannot be extracted
 * @returns User-facing error message
 */
export const toErrorMessage = (err: unknown, fallback: string): string => {
  if (err instanceof Error && err.message.trim()) {
    return err.message;
  }
  return fallback;
};
