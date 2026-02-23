import React, { useState, useCallback } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { CategoryType } from '../utils/types';

const Drawer = createDrawerNavigator();

/**
 * DrawerNavigator wraps the BottomTabNavigator and provides the
 * category filter drawer. The selected category is lifted here so
 * the drawer can control the wardrobe filter.
 *
 * The drawerContent render prop is defined as a stable callback to
 * avoid creating a new component type on every render.
 */
const DrawerNavigator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');

  const handleSelectCategory = useCallback((cat: string) => {
    setSelectedCategory(cat as CategoryType);
  }, []);

  const renderDrawerContent = useCallback(
    (props: DrawerContentComponentProps) => (
      <CustomDrawerContent
        {...props}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
    ),
    [selectedCategory, handleSelectCategory],
  );

  return (
    <Drawer.Navigator
      drawerContent={renderDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 280 },
        swipeEdgeWidth: 60,
      }}
    >
      <Drawer.Screen name="HomeTabs" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
