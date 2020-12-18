import {AppRegistry} from 'react-native';
import {database, synchronize} from './src/models';

import {createNavigation} from './src/components/helpers/Navigation';

const Navigation = createNavigation({database, synchronize});

AppRegistry.registerComponent('watermelonPOC', () => Navigation);
