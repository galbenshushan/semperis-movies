import { useCallback, useEffect, useRef, useState } from 'react';

interface UseSearchQueryReturn {
  localValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: (inputRef: React.RefObject<HTMLInputElement | null>) => void;
}

/**
 * useSearchQuery: Custom hook for managing search input with debounce.
 * Handles local state, debouncing, and clearing logic.
 */
export const useSearchQuery = (
  value: string,
  onChange: (value: string) => void,
  onClear: () => void,
): UseSearchQueryReturn => {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce the onChange call
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [localValue, onChange]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  }, []);

  const handleClear = useCallback(
    (inputRef: React.RefObject<HTMLInputElement | null>) => {
      setLocalValue('');
      onChange('');
      onClear();
      // Focus the input after clearing
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [onChange, onClear],
  );

  return {
    localValue,
    handleChange,
    handleClear,
  };
};
