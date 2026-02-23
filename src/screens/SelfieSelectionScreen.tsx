import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';

type Props = NativeStackScreenProps<RootStackParamList, 'SelfieSelection'>;

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.62;

const SelfieSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [pickedUri, setPickedUri] = useState<string | null>(null);

  const handleGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    const uri = result.assets?.[0]?.uri;
    if (uri) {
      setPickedUri(uri);
    }
  };

  const handleCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'front',
      quality: 1,
      saveToPhotos: Platform.OS === 'android',
    });
    console.log('🚀 ~ handleCamera ~ result:', result);
    const uri = result.assets?.[0]?.uri;
    if (uri) {
      setPickedUri(uri);
    }
  };

  const handleUpload = () => {
    if (pickedUri) {
      navigation.navigate('Camera', { imageUri: pickedUri });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>FACIAL ATTRIBUTES</Text>
        <Text style={styles.headerTitle}>Let's add a Photo</Text>
        <View style={styles.divider} />
      </View>

      {/* Central image area */}
      <View style={styles.imageArea}>
        {pickedUri ? (
          /* ── State: photo picked ─ show green-bordered circle ── */
          <View style={styles.pickedCircle}>
            <Image
              source={{ uri: pickedUri }}
              style={styles.pickedImage}
              resizeMode="cover"
            />
          </View>
        ) : (
          /* ── State: empty ─ show dashed oval placeholder ── */
          <TouchableOpacity
            style={styles.placeholderOval}
            onPress={handleGallery}
            activeOpacity={0.7}
          >
            <Text style={styles.plusIcon}>+</Text>
            <Text style={styles.addImageText}>Add an image</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Bottom section */}
      {pickedUri ? (
        /* ── Upload button when photo is picked ── */
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={handleUpload}
          activeOpacity={0.85}
        >
          <Text style={styles.uploadBtnText}>UPLOAD</Text>
        </TouchableOpacity>
      ) : (
        /* ── Gallery / Camera buttons when empty ── */
        <View style={styles.pickRow}>
          <TouchableOpacity
            style={styles.pickBtn}
            onPress={handleGallery}
            activeOpacity={0.7}
          >
            {/* Gallery icon */}
            <View style={styles.iconBox}>
              <Image
                source={require('../assets/Assignmentone/photo.png')}
                style={styles.iconEmoji}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.pickLabel}>From Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pickBtn}
            onPress={handleCamera}
            activeOpacity={0.7}
          >
            {/* Camera icon */}
            <View style={styles.iconBox}>
              <Image
                source={require('../assets/Assignmentone/Camera.png')}
                style={styles.iconEmoji}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.pickLabel}>Take a selfie</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* ── Header ── */
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 0,
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#AAAAAA',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#666666',
    marginBottom: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DDDDDD',
  },

  /* ── Image area ── */
  imageArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Empty state — dashed oval
  placeholderOval: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE * 1.1,
    borderRadius: CIRCLE_SIZE * 0.55,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    fontSize: 32,
    color: '#CCCCCC',
    marginBottom: 6,
    fontWeight: '300',
  },
  addImageText: {
    fontSize: 14,
    color: '#BBBBBB',
  },

  // Picked state — green circle
  pickedCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 3,
    borderColor: '#2E7D32',
    overflow: 'hidden',
  },
  pickedImage: {
    width: '100%',
    height: '100%',
  },

  /* ── Bottom gallery/camera buttons ── */
  pickRow: {
    flexDirection: 'row',
    paddingBottom: 52,
    paddingHorizontal: 32,
    justifyContent: 'space-around',
  },
  pickBtn: {
    alignItems: 'center',
    gap: 10,
  },
  iconBox: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    width: '100%',
    height: '100%',
  },
  pickLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
  },

  /* ── Upload button ── */
  uploadBtn: {
    backgroundColor: '#111111',
    marginHorizontal: 0,
    paddingVertical: 20,
    alignItems: 'center',
  },
  uploadBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
});

export default SelfieSelectionScreen;
