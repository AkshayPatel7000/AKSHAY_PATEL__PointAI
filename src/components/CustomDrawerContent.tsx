import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

const CATEGORIES = [
  { id: 'All', icon: '✨', label: 'All Items' },
  { id: 'Dresses', icon: '👗', label: 'Dresses' },
  { id: 'Tops', icon: '👚', label: 'Tops' },
  { id: 'Pants', icon: '👖', label: 'Pants' },
  { id: 'Jeans', icon: '🩳', label: 'Jeans' },
];

const NAV_LINKS = [
  { icon: '🏠', label: 'Home' },
  { icon: '❤️', label: 'Wishlist' },
  { icon: '📦', label: 'Orders' },
  { icon: '⚙️', label: 'Settings' },
];

interface Props extends DrawerContentComponentProps {
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
}

const CustomDrawerContent: React.FC<Props> = props => {
  const { selectedCategory = 'All', onSelectCategory } = props;

  return (
    <View style={styles.container}>
      {/* Drawer header */}
      <View style={styles.header}>
        <View style={styles.logoBox}>
          <Text style={styles.logoEmoji}>👗</Text>
        </View>
        <Text style={styles.appName}>TryndBuy</Text>
        <Text style={styles.tagline}>Your Fashion Companion</Text>
      </View>

      <DrawerContentScrollView
        {...props}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Category filter section */}
        <Text style={styles.sectionTitle}>CATEGORIES</Text>
        {CATEGORIES.map(cat => {
          const isActive = cat.id === selectedCategory;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.drawerItem, isActive && styles.drawerItemActive]}
              onPress={() => {
                onSelectCategory?.(cat.id);
                props.navigation.closeDrawer();
              }}
              activeOpacity={0.75}
            >
              <Text style={styles.drawerIcon}>{cat.icon}</Text>
              <Text
                style={[
                  styles.drawerLabel,
                  isActive && styles.drawerLabelActive,
                ]}
              >
                {cat.label}
              </Text>
              {isActive && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}

        <View style={styles.divider} />

        {/* Navigation links */}
        <Text style={styles.sectionTitle}>NAVIGATION</Text>
        {NAV_LINKS.map(link => (
          <TouchableOpacity
            key={link.label}
            style={styles.drawerItem}
            activeOpacity={0.75}
          >
            <Text style={styles.drawerIcon}>{link.icon}</Text>
            <Text style={styles.drawerLabel}>{link.label}</Text>
          </TouchableOpacity>
        ))}
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.drawer.background,
  },
  header: {
    backgroundColor: Colors.drawer.header,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    alignItems: 'flex-start',
  },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  logoEmoji: { fontSize: 28 },
  appName: {
    ...Typography.headingLarge,
    color: Colors.textOnPrimary,
  },
  tagline: {
    ...Typography.bodySmall,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  scrollContent: {
    paddingTop: Spacing.base,
    paddingBottom: Spacing.base,
  },
  sectionTitle: {
    ...Typography.label,
    color: Colors.textMuted,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.xs,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.md,
  },
  drawerItemActive: {
    backgroundColor: Colors.drawer.active,
  },
  drawerIcon: { fontSize: 20, width: 28 },
  drawerLabel: {
    flex: 1,
    ...Typography.bodyLarge,
    color: Colors.drawer.inactiveText,
    fontWeight: '500',
  },
  drawerLabelActive: {
    color: Colors.drawer.activeText,
    fontWeight: '700',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: Spacing.xl,
    marginVertical: Spacing.base,
  },
  footer: {
    padding: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  footerText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});

export default CustomDrawerContent;
