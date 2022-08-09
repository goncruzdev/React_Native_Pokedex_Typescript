import React from 'react';
// import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
// import Navigator from './src/navigation/StackNavigation';
import {Tabs} from './src/navigation/Tabs';

const App = () => {
  return (
    <NavigationContainer>
      {/* <Navigator /> */}
      <Tabs />
    </NavigationContainer>
  );
};

export default App;
