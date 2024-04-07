"use client"

import ThemeContext from "@/context/ThemeContext";
import { useEffect, useState } from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const ThemeFromStorage =
    typeof localStorage != "undefined" && localStorage.getItem("darkTheme")
      ? JSON.parse(localStorage.getItem("darkTheme")!)
      : false;

  const [darkMode, setDarkMode] = useState<boolean>(ThemeFromStorage);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={`${darkMode ? "dark" : ""}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
