import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.flowbel.app',
  appName: 'Flowbel',
  webDir: 'dist',
  backgroundColor: '#F8F5EE',
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#8C431D'
    }
  }
};

export default config;
