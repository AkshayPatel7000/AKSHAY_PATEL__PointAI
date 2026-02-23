import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const { width } = Dimensions.get('window');

const SPLASH_DURATION = 3000; // ms before navigating

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate progress bar from 0 → full width over SPLASH_DURATION
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: SPLASH_DURATION - 400,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Intro');
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const barWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 80],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Shopping girl illustration */}
      <View style={styles.illustrationWrapper}>
        <Image
          source={require('../assets/Assignmentone/splash 1.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Loading text */}
      <Text style={styles.loadingText}>Loading brands...</Text>

      {/* Progress bar track */}
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressBar, { width: barWidth }]} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  illustrationWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  illustration: {
    width: width * 0.78,
    height: width * 0.9,
  },
  loadingText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressTrack: {
    width: width - 80,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 60,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#111111',
    borderRadius: 3,
  },
});

export default SplashScreen;
