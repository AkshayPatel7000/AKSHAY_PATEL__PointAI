import React from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../theme';

interface Friend {
  id: string;
  name: string;
  items: number;
  emoji: string;
}

const FRIENDS: Friend[] = [
  { id: '1', name: 'Alex Chen', items: 28, emoji: '🧑' },
  { id: '2', name: 'Priya Sharma', items: 54, emoji: '👩' },
  { id: '3', name: 'Sam Rivers', items: 13, emoji: '🧔' },
  { id: '4', name: 'Mia Lopez', items: 37, emoji: '👩‍🦱' },
  { id: '5', name: 'Kai Thomas', items: 19, emoji: '🧑‍🦲' },
];

// ── Sub-components defined OUTSIDE the screen ──────────────────────────────

const SearchBox: React.FC = () => (
  <View style={styles.searchBox}>
    <Text style={styles.searchIcon}>🔍</Text>
    <Text style={styles.searchPlaceholder}>Search friends…</Text>
  </View>
);

const FriendCard: React.FC<{ item: Friend }> = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.friendAvatar}>
      <Text style={styles.friendEmoji}>{item.emoji}</Text>
    </View>
    <View style={styles.friendInfo}>
      <Text style={styles.friendName}>{item.name}</Text>
      <Text style={styles.friendStats}>{item.items} items in wardrobe</Text>
    </View>
    <View style={styles.followBtn}>
      <Text style={styles.followBtnText}>Follow</Text>
    </View>
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────

const renderFriend: ListRenderItem<Friend> = ({ item }) => (
  <FriendCard item={item} />
);
const keyExtractor = (item: Friend) => item.id;

const FriendsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Friends</Text>
        <Text style={styles.headerSubtitle}>
          See what your friends are wearing
        </Text>
      </View>

      <FlatList
        data={FRIENDS}
        keyExtractor={keyExtractor}
        renderItem={renderFriend}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<SearchBox />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
  },
  headerTitle: {
    ...Typography.displayMedium,
    color: Colors.textOnPrimary,
  },
  headerSubtitle: {
    ...Typography.bodyMedium,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    marginHorizontal: Spacing.base,
    marginTop: Spacing.base,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  searchIcon: { fontSize: 16 },
  searchPlaceholder: {
    ...Typography.bodyMedium,
    color: Colors.textMuted,
  },
  list: {
    paddingBottom: Spacing.xl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.base,
    marginVertical: Spacing.xs,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    gap: Spacing.base,
    ...Shadow.sm,
  },
  friendAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendEmoji: { fontSize: 28 },
  friendInfo: { flex: 1 },
  friendName: {
    ...Typography.headingSmall,
    color: Colors.text,
  },
  friendStats: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  followBtn: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
  },
  followBtnText: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.primary,
  },
});

export default FriendsScreen;
