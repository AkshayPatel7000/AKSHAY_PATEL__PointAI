import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Intro'>;

const { width, height } = Dimensions.get('window');

const IntroScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Full-width model photo — top 72% of screen */}
      <Image
        source={require('../assets/Assignmentone/ChatGPT Image Apr 3, 2025, 02_53_17 PM 1.png')}
        style={styles.modelImage}
        resizeMode="cover"
      />

      {/* Bottom white card */}
      <View style={styles.card}>
        <Text style={styles.cardText}>
          {
            'Hi, I am your fashion advisor. Let\u2019s\nget you started with creating your\nmix & match fashion avatar.'
          }
        </Text>

        {/* Arrow button — bottom right */}
        <TouchableOpacity
          style={styles.arrowBtn}
          onPress={() => navigation.navigate('SelfieSelection')}
          activeOpacity={0.8}
        >
          <Image
            source={require('../assets/Assignmentone/Arrow right-circle.png')}
            // style={styles.arrowIcon}
            resizeMode="cover"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modelImage: {
    width: width,
    height: height * 0.72,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 22,
    lineHeight: 34,
    color: '#111111',
    fontWeight: '400',
  },
  arrowBtn: {
    alignSelf: 'flex-end',
    width: 50,
    height: 50,

    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: '100%',
    height: '100%',
  },
});

export default IntroScreen;
