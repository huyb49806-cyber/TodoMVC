import React, { createContext, useState } from 'react';

// 1. Tạo Context
export const ThemeContext = createContext();

// 2. Tạo Provider (component bao bọc)
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // State mặc định là 'light'

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Cung cấp 'theme' và 'toggleTheme' cho các component con
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};