import { useEffect } from "react";
export function useOnClickOutsideSingel(ref1, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref1.current || ref1.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref1, handler]);
}
