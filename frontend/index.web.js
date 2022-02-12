import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
if (module.hot) {
  module.hot.accept();
}
AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
import {
  en,
  registerTranslation,
} from 'react-native-paper-dates'
registerTranslation('en', en)