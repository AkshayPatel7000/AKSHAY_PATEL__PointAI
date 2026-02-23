import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SKUItem } from '../utils/types';
import { getImageUrl } from '../services/api';
import { Colors, Spacing, BorderRadius, Shadow, Typography } from '../theme';

interface SKUCardProps {
  item: SKUItem;
  onPress: (item: SKUItem) => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.base * 3) / 2;

const SKUCard: React.FC<SKUCardProps> = memo(({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.85}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: getImageUrl(item.SKUID) }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.Cat}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.skuId}>SKU #{item.SKUID}</Text>
        <Text style={styles.gender}>{item.Gender}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.base,
    ...Shadow.md,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: CARD_WIDTH * 1.3,
    backgroundColor: Colors.skeleton.base,
  },
  badge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.textOnPrimary,
    fontWeight: '700',
  },
  info: {
    padding: Spacing.sm,
  },
  skuId: {
    ...Typography.headingSmall,
    color: Colors.text,
  },
  gender: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});

export default SKUCard;
