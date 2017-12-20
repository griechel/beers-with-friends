import { AppRegistry } from 'react-native';
import App from './app/index';
import Amplify from 'aws-amplify-react-native';
import aws_exports from './src/aws-exports';

AppRegistry.registerComponent('template', () => App);
Amplify.configure(aws_exports);
