import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    console.log('useEffect', isDarkMode);
    setTheme(() => {
      console.log('initiateTheme OK', isDarkMode);
    });
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    localStorage.setItem('darkMode', !isDarkMode ? 'true' : 'false');
    setIsDarkMode(!isDarkMode);
    // setTheme(() => {
    //   console.log('toggleDarkMode OK', isDarkMode);
    // });
  };

  const setTheme = (scriptLoaded: any) => {
    const styleLoaded = async () => {
    };

    const rootCSS = `https://cdn.jsdelivr.net/npm/water.css@2/out/`; // PULGX from local assets
    const targetCSS = !isDarkMode ? 'light.css' : 'dark.css';
    const themeCSS = document.createElement('link');
    themeCSS.id = 'js-stylesheet';
    themeCSS.rel = 'stylesheet';
    themeCSS.onload = styleLoaded;
    themeCSS.href = rootCSS + targetCSS;
    document.head.appendChild(themeCSS);
    console.log('initiateTheme 1', { isDarkMode, targetCSS });
    scriptLoaded(true);
    return () => {
      document.body.removeChild(themeCSS);
    };
  };

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;