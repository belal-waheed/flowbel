import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App } from '@capacitor/app';

export async function initNativeServices(onBackButton?: () => boolean): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  try {
    // Configure status bar with warm cream background and dark icons
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: '#F8F5EE' });
    await StatusBar.setOverlaysWebView({ overlay: false });
  } catch (err) {
    console.warn('Could not initialize status bar styling:', err);
  }

  try {
    // Listen to Android hardware back button
    await App.addListener('backButton', ({ canGoBack }) => {
      // If a custom back handler consumed the event (e.g. closing a modal)
      if (onBackButton && onBackButton()) {
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
