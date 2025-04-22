import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";

export function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  // Ensure hydration completes before showing to avoid flashing
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}

// Add prop types validation
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Re-export the hook from next-themes
export const useTheme = useNextTheme;
