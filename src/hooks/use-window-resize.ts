import { useState, useEffect } from "react";

const useWindowResize = () => {
  const [width, setWidth] = useState<number|null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return width
}

export default useWindowResize;