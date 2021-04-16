/**
  Dark Mode service: restore current settings, toggle Dark Mode
  v1.2.0

  How to use:
  - Restore current settings

  ```
    ...
    ThemeService.restore();
  ```
  - Add toggle control in desired page
*/

import Storage from './localstorage.service';
import { isPlatform } from '@ionic/react';
import { Plugins, StatusBarStyle } from '@capacitor/core';

const { StatusBar } = Plugins;
const DARK_MODE_CLASS = 'dark-theme';

export default class ThemeService {
  static toggleDarkMode(isDark = true, needUpdate = true) {
    if (needUpdate) Storage.setItem(DARK_MODE_CLASS, isDark);
    document.body.classList.toggle(DARK_MODE_CLASS, isDark);

    if (isPlatform('capacitor')) {
      if (isDark) {
        // iOS only
        StatusBar.setStyle({
          style: StatusBarStyle.Dark
        });

        // Android only
        StatusBar.setBackgroundColor({
          color: '#000000'
        })
      } else {
        // iOS only
        StatusBar.setStyle({
          style: StatusBarStyle.Light
        });

        // Android only
        StatusBar.setBackgroundColor({
          color: '#ffffff'
        })
      }
    }
  }

  static getCurrentSetting() {
    return Storage.getItem(DARK_MODE_CLASS);
  }

  /**
   * Experimental - unfinished
   * */
  static useAutoDarkMode() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    this.toggleDarkMode(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((mediaQuery) => this.toggleDarkMode(mediaQuery.matches));
  }

  static restore() {
    this.toggleDarkMode(this.getCurrentSetting(), false);
  }
}
