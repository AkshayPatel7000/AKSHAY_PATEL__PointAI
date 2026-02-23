import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../theme';
import { CategoryType } from '../utils/types';

interface Props {
  selected: CategoryType;
  onSelect: (cat: CategoryType) => void;
}

const CATEGORIES: CategoryType[] = ['All', 'Dresses', 'Tops', 'Pants', 'Jeans'];

const CategoryChips: React.FC<Props> = ({ selected, onSelect }) => (
  <View style={styles.row}>
    {CATEGORIES.map(cat => {
      const isActive = cat === selected;
      return (
        <TouchableOpacity
          key={cat}
          style={[styles.chip, isActive && styles.chipActive]}
          onPress={() => onSelect(cat)}
          activeOpacity={0.75}
        >
          <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
            {cat}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.textOnPrimary,
  },
});

export default CategoryChips;
