import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.semasol.geotest',
  appName: 'geo-test',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
