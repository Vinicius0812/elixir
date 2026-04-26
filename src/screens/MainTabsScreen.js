import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import FavoritesScreen from './FavoritesScreen';
import ExploreScreen from './ExploreScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import { colors } from '../theme/colors';

const TABS = [
  { key: 'home', label: 'Home', icon: 'wine-outline' },
  { key: 'favorites', label: 'Favoritos', icon: 'star-outline' },
  { key: 'explore', label: 'Explorar', icon: 'search-outline' },
  { key: 'profile', label: 'Perfil', icon: 'person-outline' },
];

export default function MainTabsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('home');
  const insets = useSafeAreaInsets();

  const activeScreen = useMemo(() => {
    switch (activeTab) {
      case 'favorites':
        return <FavoritesScreen navigation={navigation} />;
      case 'explore':
        return <ExploreScreen navigation={navigation} />;
      case 'profile':
        return <ProfileScreen navigation={navigation} />;
      case 'home':
      default:
        return <HomeScreen navigation={navigation} />;
    }
  }, [activeTab, navigation]);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.content}>{activeScreen}</View>

      <View style={[styles.tabBar, { paddingBottom: 18 + insets.bottom }]}>
        {TABS.map((tab) => {
          const active = tab.key === activeTab;

          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={styles.tabButton}
            >
              <View style={[styles.iconWrap, active && styles.iconWrapActive]}>
                <Ionicons
                  name={tab.icon}
                  size={20}
                  color={active ? colors.white : colors.textMuted}
                />
              </View>
              <Text style={[styles.label, active && styles.labelActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 18,
    backgroundColor: colors.backgroundElevated,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    minWidth: 72,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconWrapActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  icon: {
    color: colors.textMuted,
  },
  label: {
    color: colors.textFaint,
    fontSize: 12,
    fontWeight: '600',
  },
  labelActive: {
    color: colors.text,
  },
});
