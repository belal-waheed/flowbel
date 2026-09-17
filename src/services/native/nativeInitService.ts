import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App } from '@capacitor/app';

let isInitialized = false;
let activeBackButtonHandler: (() => boolean) | null = null;

/**
 * Registers or updates the active hardware back button handler.
 * Handler should return true if it consumed the back event (e.g. dismissed a modal),
 * or false if default system back navigation / minimization should occur.
 */
export function setNativeBackButtonHandler(handler: (() => boolean) | null): void {
  activeBackButtonHandler = handler;
}

export async function initNativeServices(): Promise<void> {
  if (!Capacitor.isNativePlatform() || isInitialized) {
    return;
  }
  isInitialized = true;

  try {
    // Configure status bar with warm cream background and dark icons
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: '#F8F5EE' });
    await StatusBar.setOverlaysWebView({ overlay: false });
  } catch (err) {
    console.warn('Could not initialize status bar styling:', err);
  }

  try {
    // Listen to Android hardware back button (single global listener)
    await App.addListener('backButton', ({ canGoBack }) => {
      if (activeBackButtonHandler && activeBackButtonHandler()) {
        return;
      }
      if (canGoBack) {
        window.history.back();
      } else {
        App.minimizeApp();
      }
    });
  } catch (err) {
    console.warn('Could not attach native back button listener:', err);
  }
}
