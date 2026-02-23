import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { Colors, BorderRadius, Spacing } from '../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.base * 3) / 2;

const SkeletonCard: React.FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <Animated.View style={[styles.card, { opacity }]}>
      <View style={styles.image} />
      <View style={styles.info}>
        <View style={styles.line1} />
        <View style={styles.line2} />
      </View>
    </Animated.View>
  );
};

export const SkeletonGrid: React.FC = () => (
  <View style={styles.grid}>
    {Array.from({ length: 6 }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.base,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: CARD_WIDTH * 1.3,
    backgroundColor: Colors.skeleton.base,
  },
  info: {
    padding: Spacing.sm,
    gap: 6,
  },
  line1: {
    height: 14,
    backgroundColor: Colors.skeleton.base,
    borderRadius: BorderRadius.xs,
    width: '70%',
  },
  line2: {
    height: 10,
    backgroundColor: Colors.skeleton.base,
    borderRadius: BorderRadius.xs,
    width: '40%',
  },
});

export default SkeletonCard;
