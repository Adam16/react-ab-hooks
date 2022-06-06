import { useRef, useCallback } from "react";

interface UseObserver {
  (
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
    externalState?: React.ComponentState[]
  ): (node: Element | null) => void;
}

const useObserver: UseObserver = (
  callback,
  { root, rootMargin, threshold } = {},
  externalState = []
) => {
  const target = useRef<Element | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const setTarget = useCallback(
    (node: Element | null) => {
      if (target.current && observer.current) {
        observer.current.unobserve(target.current);
        observer.current.disconnect();
        observer.current = null;
      }

      if (node) {
        observer.current = new IntersectionObserver(callback, {
          root,
          rootMargin,
          threshold,
        });
        observer.current.observe(node);
        target.current = node;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [target, root, rootMargin, threshold, ...externalState]
  );

  return setTarget;
};

export default useObserver;
