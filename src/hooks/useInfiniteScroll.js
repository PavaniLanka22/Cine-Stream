import { useEffect, useRef } from "react";

function useInfiniteScroll(callback) {
  const observerRef = useRef();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        threshold: 1,
      }
    );

    return () => observerRef.current.disconnect();
  }, [callback]);

  const lastElementRef = (node) => {
    if (node) observerRef.current.observe(node);
  };

  return lastElementRef;
}

export default useInfiniteScroll;