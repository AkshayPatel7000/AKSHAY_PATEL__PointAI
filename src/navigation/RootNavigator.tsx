import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';
import SelfieSelectionScreen from '../screens/SelfieSelectionScreen';
import CameraScreen from '../screens/CameraScreen';
import UploadProgressScreen from '../screens/UploadProgressScreen';
import DrawerNavigator from './DrawerNavigator';
import { RootStackParamList } from '../utils/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false, animation: 'fade' }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen
        name="Intro"
        component={IntroScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="SelfieSelection"
        component={SelfieSelectionScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="UploadProgress"
        component={UploadProgressScreen}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen
        name="MainApp"
        component={DrawerNavigator}
        options={{ animation: 'fade' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
