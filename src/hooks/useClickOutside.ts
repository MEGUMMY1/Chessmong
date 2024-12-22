import { useEffect, useRef, useCallback } from "react";

export default function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);

  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        memoizedCallback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [memoizedCallback]);

  return ref;
}
