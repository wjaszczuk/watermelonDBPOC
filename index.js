import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {App} from './src/components/App';

AppRegistry.registerComponent(appName, () => App);
