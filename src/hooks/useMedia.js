import { useMediaQuery } from "@mui/material";
import { useMemo } from "react";

export const useMedia = () => {
  const isMobile = useMediaQuery("(max-width: 374.98px)");
  const isMobileAdaptive = useMediaQuery("(min-width: 375px )");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1440px)");
  const viewChanging = useMemo(
    () => ({
      isMobile,
      isMobileAdaptive,
      isTablet,
      isDesktop,
    }),
    [isMobile, isMobileAdaptive, isTablet, isDesktop]
  );
  return viewChanging;
};
