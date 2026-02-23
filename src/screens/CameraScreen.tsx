import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>;

const { width } = Dimensions.get('window');

/**
 * CameraScreen — Liveliness check screen
 *
 * Design (screen 5 reference):
 *  - White background
 *  - "X" close button top-right
 *  - Large green-bordered checkmark circle in center
 *  - "Selfie captured perfectly! ..." text
 *  - Black progress bar animating below text
 *  - Auto-navigates to UploadProgress when animation completes
 */
const CameraScreen: React.FC<Props> = ({ navigation, route }) => {
  const { imageUri } = route.params;

  const progressAnim = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(0)).current;
  const [done, setDone] = useState(false);

  useEffect(() => {
    // 1) Pop-in the checkmark
    Animated.spring(checkScale, {
      toValue: 1,
      tension: 60,
      friction: 6,
      useNativeDriver: true,
    }).start(() => {
      // 2) Run progress bar
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2200,
        useNativeDriver: false,
      }).start(() => {
        setDone(true);
        setTimeout(() => {
          navigation.navigate('UploadProgress', { imageUri });
        }, 400);
      });
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

      {/* X close button */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.replace('SelfieSelection')}
        activeOpacity={0.7}
      >
        <Text style={styles.closeIcon}>✕</Text>
      </TouchableOpacity>

      {/* Green checkmark circle */}
      <Animated.View
        style={[styles.checkCircle, { transform: [{ scale: checkScale }] }]}
      >
        <Text style={styles.checkMark}>✓</Text>
      </Animated.View>

      {/* Caption text */}
      <Text style={styles.captionTitle}>Selfie captured perfectly!</Text>
      <Text style={styles.captionSub}>
        Let's build your own fashion avatar.
      </Text>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressBar, { width: barWidth }]} />
      </View>

      {done && <Text style={styles.doneText}>Processing…</Text>}
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
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 8,
  },
  closeIcon: {
    fontSize: 22,
    color: '#333333',
    fontWeight: '300',
  },
  checkCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  checkMark: {
    fontSize: 72,
    color: '#2E7D32',
    fontWeight: '200',
    lineHeight: 84,
  },
  captionTitle: {
    fontSize: 18,
    color: '#111111',
    fontWeight: '400',
    marginBottom: 4,
    textAlign: 'center',
  },
  captionSub: {
    fontSize: 18,
    color: '#111111',
    fontWeight: '400',
    marginBottom: 28,
    textAlign: 'center',
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
  doneText: {
    marginTop: 16,
    fontSize: 13,
    color: '#AAAAAA',
  },
});

export default CameraScreen;
