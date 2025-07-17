import { useState } from 'react';
import { setFetchMethod, enable, disable as disableDarkMode } from 'darkreader';
import localStorageConstants from 'constants/localStorage';

const { APP_THEME } = localStorageConstants;

export const COLOR_SCHEME = {
  DARK: 'dark',
  LIGHT: 'light',
};

const enableDarkMode = () => {
  const settings = {
    brightness: 100,
    contrast: 90,
    sepia: 10,
  };

  const fixes = {
    invert: [],
    ignoreInlineStyle: [],
    ignoreImageAnalysis: [],
    // Custom css using in dark mode
    css: ` 
			.ant-input::placeholder {
				color: #686868 !important;
			}	
			.ant-menu-submenu-arrow::before, .ant-menu-submenu-arrow::after {
				background-color: white !important; 
			}
		`,
  };

  enable(settings, fixes);
};

const updateColorScheme = () => {
  if (localStorage.getItem(APP_THEME) === COLOR_SCHEME.DARK) {
    enableDarkMode();
  }
};

// Fix CORS not allowed
setFetchMethod(window.fetch);

// Add an observer to re-generate color scheme whenever a css file has loaded.
export const subcribeCssLoading = () => {
  const observer = new MutationObserver(mutations => {
    mutations.some(({ addedNodes }) => {
      for (let i = 0; i < addedNodes.length; ++i) {
        const node = addedNodes[i];
        if (node && node['type' as keyof Node] === 'text/css') {
          node.addEventListener('load', updateColorScheme);
          return true;
        }
      }
      return false;
    });
  });

  const config = { attributes: false, childList: true, subtree: false };

  observer.observe(document.head, config);
};

updateColorScheme();
subcribeCssLoading();

export const useThemeSwitch = () => {
  const [currentColorScheme, setCurrentColorScheme] = useState(
    () => localStorage.getItem(APP_THEME) || COLOR_SCHEME.LIGHT
  );

  const isDarkMode = currentColorScheme === COLOR_SCHEME.DARK;

  const toggleDarkMode = () => {
    const nextColorScheme = isDarkMode ? COLOR_SCHEME.LIGHT : COLOR_SCHEME.DARK;

    if (nextColorScheme === COLOR_SCHEME.DARK) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }

    setCurrentColorScheme(nextColorScheme);

    localStorage.setItem(APP_THEME, nextColorScheme);
  };

  return {
    isDarkMode,
    toggleDarkMode,
  };
};
