import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  // effect to detect click outside modal window
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      document.addEventListener('click', handleClick, listenCapturing);

      return () =>
        document.removeEventListener('click', handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
