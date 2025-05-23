import { useEffect, useState } from "react";

export function useScreenType() {
  const [breakpoints, setBreakpoints] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const checkBreakpoints = () => {
      const width = window.innerWidth;
      setBreakpoints({
        isMobile: width < 768, // Mobile: < 768px
        isTablet: width >= 768 && width < 1024, // Tablet: 768px - 1023px
        isDesktop: width >= 1024, // Desktop: >= 1024px
      });
    };
    checkBreakpoints();

    window.addEventListener("resize", checkBreakpoints);
    return () => window.removeEventListener("resize", checkBreakpoints);
  }, []);

  return [breakpoints.isDesktop, breakpoints.isTablet, breakpoints.isMobile];
}
