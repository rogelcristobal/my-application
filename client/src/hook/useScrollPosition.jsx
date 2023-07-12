import { useEffect, useState } from 'react';

export function useScrollPosition(ref) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const element = ref.current;
    const currentPosition = element.scrollTop;
    setScrollPosition(currentPosition);
  };

  useEffect(() => {
    const element = ref.current;
    element.addEventListener('scroll', handleScroll);
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return scrollPosition;
}
