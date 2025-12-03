import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const THEMES = {
  light: 'mytheme',
  dark: 'mythemedark',
};

const ThemeContext = createContext({
  theme: THEMES.light,
  setTheme: () => {},
  toggleTheme: () => {},
});

const getPreferredTheme = () => {
  if (typeof window === 'undefined') {
    return THEMES.light;
  }
  const stored = window.localStorage.getItem('theme');
  if (stored && Object.values(THEMES).includes(stored)) {
    return stored;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? THEMES.dark : THEMES.light;
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === THEMES.light ? THEMES.dark : THEMES.light));
  };

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
