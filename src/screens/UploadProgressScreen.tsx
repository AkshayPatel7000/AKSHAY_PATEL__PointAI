import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';

type Props = NativeStackScreenProps<RootStackParamList, 'UploadProgress'>;

const { width } = Dimensions.get('window');

/**
 * UploadProgressScreen
 *
 * Simulates the upload/processing step after the face is captured.
 * Shows animated progress bar + status labels, then navigates to MainApp.
 */
const UploadProgressScreen: React.FC<Props> = ({ navigation }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const percent = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    Animated.timing(percent, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        navigation.replace('MainApp');
      }, 500);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const barWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 80],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Spinner / steps */}
      <Text style={styles.title}>Uploading your photo…</Text>
      <Text style={styles.sub}>Building your fashion avatar</Text>

      {/* Percentage */}
      <AnimatedPercent value={percent} />

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressBar, { width: barWidth }]} />
      </View>
    </SafeAreaView>
  );
};

/** Reads the animated percent value and displays it as an integer string */
const AnimatedPercent: React.FC<{ value: Animated.Value }> = ({ value }) => {
  const [display, setDisplay] = React.useState('0');

  React.useEffect(() => {
    const id = value.addListener(({ value: v }) => {
      setDisplay(Math.round(v).toString());
    });
    return () => value.removeListener(id);
  }, [value]);

  return <Text style={styles.percent}>{display}%</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
    textAlign: 'center',
  },
  sub: {
    fontSize: 15,
    color: '#888888',
    marginBottom: 32,
    textAlign: 'center',
  },
  percent: {
    fontSize: 48,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 24,
  },
  progressTrack: {
    width: width - 80,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#111111',
    borderRadius: 3,
  },
});

export default UploadProgressScreen;
