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
        isMobile: width < 640,
        isTablet: width >= 640 && width <= 768,
        isDesktop: width > 768,
      });
    };
    checkBreakpoints();

    window.addEventListener("resize", checkBreakpoints);
    return () => window.removeEventListener("resize", checkBreakpoints);
  }, []);

  return [breakpoints.isMobile, breakpoints.isTablet, breakpoints.isDesktop];
}
