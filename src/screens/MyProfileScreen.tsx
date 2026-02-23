import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../theme';

const STATS = [
  { label: 'Items', value: '42', icon: '👗' },
  { label: 'Saved', value: '12', icon: '❤️' },
  { label: 'Orders', value: '8', icon: '📦' },
];

const MyProfileScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile hero */}
      <View style={styles.hero}>
        <View style={styles.avatarRing}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
        </View>
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.email}>jane.doe@example.com</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {STATS.map(s => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statIcon}>{s.icon}</Text>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu items */}
      {[
        'Edit Profile',
        'My Orders',
        'Wishlist',
        'Notifications',
        'Settings',
        'Help & Support',
        'Logout',
      ].map(item => (
        <View key={item} style={styles.menuItem}>
          <Text style={styles.menuLabel}>{item}</Text>
          <Text style={styles.menuArrow}>›</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    alignItems: 'center',
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
    backgroundColor: Colors.primary,
  },
  avatarRing: {
    padding: 4,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
    marginBottom: Spacing.base,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 48 },
  name: {
    ...Typography.headingLarge,
    color: Colors.textOnPrimary,
  },
  email: {
    ...Typography.bodyMedium,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Spacing.xl,
    backgroundColor: Colors.surface,
    ...Shadow.sm,
    marginBottom: Spacing.base,
  },
  statCard: {
    alignItems: 'center',
    gap: 4,
  },
  statIcon: { fontSize: 24 },
  statValue: {
    ...Typography.headingLarge,
    color: Colors.text,
  },
  statLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.md,
    ...Shadow.sm,
  },
  menuLabel: {
    flex: 1,
    ...Typography.bodyLarge,
    color: Colors.text,
  },
  menuArrow: {
    fontSize: 22,
    color: Colors.textMuted,
  },
});

export default MyProfileScreen;
