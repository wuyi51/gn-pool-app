import 'es6-symbol/implement';
import { AppRegistry } from 'react-native';
import './shim.js';
import crypto from 'crypto';
import App from './js/App';

AppRegistry.registerComponent('GnPool', () => App);