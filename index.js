import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

// Run the app for web
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'), // Attach to an HTML element
});
