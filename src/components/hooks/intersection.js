import { useEffect, useRef, useState } from "react";
export default function useSectionIntersection() {
  const [showSection, setShowSection] = useState(false);
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSection(true);
          observer.unobserve(current);
        } else {
          setShowSection(false);
        }
      },
      {
        threshold: 0.1,
      },
    );
    const current = sectionRef.current;
    if (current) {
      observer.observe(current);
    }
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);
  return { sectionRef, showSection };
}
