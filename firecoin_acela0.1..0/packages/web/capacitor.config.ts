import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.firecoin.app',
  appName: 'FireCoin',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    iosScheme: 'capacitor'
  }
};

export default config;
