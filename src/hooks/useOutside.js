import React, { useEffect, useRef, useState } from 'react';

export const useOutside = (initialValue) => {
  const [isShow, setIsShow] = useState(initialValue);
  const ref = useRef(null);

  useEffect(() => {
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsShow(false);
      }
      return;
    };

    document.addEventListener('mousedown', listener, true);
    document.addEventListener('touchstart', listener, true);
    return () => {
      document.removeEventListener('mousedown', listener, true);
      document.removeEventListener('touchstart', listener, true);
    };
  }, []);

  return { ref, isShow, setIsShow };
};
