"use client";

import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [isClient, setIsClient] = useState(false);

  // This is a side effect that runs after the first render and sets the isClient state to true
  useEffect(() => {
    setIsClient(true);
  }, []);

  // This is a conditional rendering that returns null if the component is not client
  if (!isClient) {
    return null;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
