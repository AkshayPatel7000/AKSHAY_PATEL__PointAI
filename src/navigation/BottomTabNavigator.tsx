import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import MyWardrobeScreen from '../screens/MyWardrobeScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import FriendsScreen from '../screens/FriendsScreen';
import { Colors, Typography } from '../theme';

const Tab = createBottomTabNavigator();

// ── Asset-based tab icons from design ──────────────────────────────────────
const ICONS = {
  wardrobe: require('../assets/Assignmenttwo/clothes-hanger 1.png'),
  profile: require('../assets/Assignmenttwo/user 1.png'),
  friends: require('../assets/Assignmenttwo/user-friendly 1.png'),
};

// Styles declared before makeTabIcon so there's no TDZ error
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
    height: 64,
    paddingBottom: 8,
    paddingTop: 6,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  tabLabel: {
    ...Typography.caption,
    fontWeight: '500',
    marginTop: 2,
    fontSize: 11,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
});

// ── Icon factories outside the navigator ───────────────────────────────────
type IconProps = { focused: boolean; color: string; size: number };

const makeAssetIcon =
  (src: number) =>
  ({ focused }: IconProps) =>
    (
      <Image
        source={src}
        style={[
          styles.tabIcon,
          {
            tintColor: focused ? Colors.tabBar.active : Colors.tabBar.inactive,
          },
        ]}
        resizeMode="contain"
      />
    );

const wardrobeIcon = makeAssetIcon(ICONS.wardrobe);
const profileIcon = makeAssetIcon(ICONS.profile);
const friendsIcon = makeAssetIcon(ICONS.friends);

// ── Shared screen options ──────────────────────────────────────────────────
const sharedScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: Colors.tabBar.active,
  tabBarInactiveTintColor: Colors.tabBar.inactive,
  tabBarStyle: styles.tabBar,
  tabBarLabelStyle: styles.tabLabel,
};

const BottomTabNavigator: React.FC = () => (
  <Tab.Navigator screenOptions={sharedScreenOptions}>
    <Tab.Screen
      name="MyWardrobe"
      component={MyWardrobeScreen}
      options={{ title: 'My Wardrobe', tabBarIcon: wardrobeIcon }}
    />
    <Tab.Screen
      name="MyProfile"
      component={MyProfileScreen}
      options={{ title: 'My Profile', tabBarIcon: profileIcon }}
    />
    <Tab.Screen
      name="Friends"
      component={FriendsScreen}
      options={{ title: 'Friends', tabBarIcon: friendsIcon }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
