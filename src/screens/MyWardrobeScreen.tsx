import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import useSKUs from '../hooks/useSKUs';
import { getImageUrl } from '../services/api';
import { SKUItem } from '../utils/types';

const { width } = Dimensions.get('window');
const MODEL_COL = width * 0.74;
const SKU_PANEL_WIDTH = width - width * 0.52; // panel width when in SKU view

// ── View mode ──────────────────────────────────────────────────────────────
type ViewMode = 'icons' | 'skus';

// ── Icon rail items ────────────────────────────────────────────────────────
const ICON_ITEMS = [
  { label: 'Dresses', icon: require('../assets/Assignmenttwo/dress 1.png') },
  { label: 'Makeup', icon: require('../assets/Assignmenttwo/brush 1.png') },
  { label: 'Goggles', icon: require('../assets/Assignmenttwo/glasses 1.png') },
  { label: 'Shoes', icon: require('../assets/Assignmenttwo/sneakers 1.png') },
  {
    label: 'Location',
    icon: require('../assets/Assignmenttwo/pictures 1.png'),
  },
];

// ── Model image ────────────────────────────────────────────────────────────
const MODEL_IMAGE = require('../assets/Assignmenttwo/Model 1.png');

// ── SKU mini-card width in the narrow right panel ─────────────────────────
// Panel is ~48% wide; 2-column grid with 4px gap each side
const CARD_W = (SKU_PANEL_WIDTH - 24) / 2;

// ─────────────────────────────────────────────────────────────────────────────

const MyWardrobeScreen: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('icons');
  const [activeLabel, setActiveLabel] = useState('');
  const { data, isLoading } = useSKUs();

  // ── Handlers
  const handleIconPress = useCallback((label: string) => {
    setActiveLabel(label);
    setViewMode('skus');
    Toast.show({
      type: 'skuToast',
      text1: label,
      text2: `Browsing ${label}`,
      position: 'bottom',
      visibilityTime: 1500,
    });
  }, []);

  const handleSKUPress = useCallback((item: SKUItem) => {
    Toast.show({
      type: 'skuToast',
      text1: item.SKUID,
      text2: `Gender: ${Number(item?.Gender) === 0 ? 'Male' : 'Female'}`,
      position: 'bottom',
      visibilityTime: 1800,
    });
  }, []);

  // ── Render SKU mini-card
  const renderSKU = useCallback(
    ({ item }: { item: SKUItem }) => (
      <TouchableOpacity
        style={styles.skuCard}
        onPress={() => handleSKUPress(item)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: getImageUrl(item.SKUID) }}
          style={styles.skuImg}
          resizeMode="cover"
        />
        <View style={styles.skuInfo}>
          <Text style={styles.skuId} numberOfLines={1}>
            {item.SKUID}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [handleSKUPress],
  );

  const keyExtractor = useCallback((item: SKUItem) => item.SKUID, []);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      {/* ── Top bar — only in SKU list mode ── */}
      {viewMode === 'skus' && (
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setViewMode('icons')}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <View style={styles.statPill}>
            <Text style={styles.statText}>💵 5,000</Text>
            <View style={styles.statDivider} />
            <Text style={styles.statText}>🃏 225/100</Text>
            <View style={styles.statDivider} />
            <Text style={styles.statText}>💎 1,200</Text>
          </View>

          <View style={styles.avatarCircle}>
            <Image
              source={require('../assets/Assignmenttwo/user 1.png')}
              style={styles.avatarImg}
            />
          </View>

          <TouchableOpacity style={styles.helpBtn} activeOpacity={0.7}>
            <Text style={styles.helpIcon}>?</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── Main split layout ── */}
      <View style={styles.splitRow}>
        {/* ── LEFT: Model over room background ── */}
        <ImageBackground
          source={require('../assets/Assignmenttwo/Rectangle Copy.png')}
          style={[
            styles.modelCol,
            viewMode === 'skus' && styles.modelColNarrow,
          ]}
          resizeMode="cover"
        >
          <Image
            source={MODEL_IMAGE}
            style={styles.modelImg}
            resizeMode="contain"
          />
        </ImageBackground>

        {/* ── RIGHT PANEL ── */}
        {viewMode === 'icons' ? (
          /* Landing 1: vertical icon rail */
          <View style={styles.iconRail}>
            {ICON_ITEMS.map(item => (
              <TouchableOpacity
                key={item.label}
                style={styles.iconItem}
                onPress={() => handleIconPress(item.label)}
                activeOpacity={0.75}
              >
                <View style={styles.iconCircle}>
                  <Image
                    source={item.icon}
                    style={styles.iconImg}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.iconLabelBox}>
                  <Text style={styles.iconLabel}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          /* Landing 2: full SKU grid */
          <View style={styles.skuPanel}>
            {/* Header row */}
            <View style={styles.skuPanelHeader}>
              <Text style={styles.skuHeading}>{activeLabel}</Text>
              <Text style={styles.skuCount}>{data.length}</Text>
            </View>

            {isLoading ? (
              <ActivityIndicator
                style={styles.loader}
                color="#111"
                size="small"
              />
            ) : (
              <FlatList
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderSKU}
                numColumns={2}
                columnWrapperStyle={styles.skuRow}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.skuList}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const CIRCLE_SIZE = 52;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  /* ── Top bar ── */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
    gap: 8,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: '#222',
    fontWeight: '300',
    lineHeight: 32,
  },
  statPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 6,
  },
  statText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#111',
  },
  statDivider: {
    width: 1,
    height: 13,
    backgroundColor: '#CCC',
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#C2185B',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: {
    width: 18,
    height: 18,
    tintColor: '#FFFFFF',
  },
  helpBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#AAA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpIcon: {
    fontSize: 13,
    color: '#555',
    fontWeight: '700',
  },

  /* ── Split row ── */
  splitRow: {
    flex: 1,
    flexDirection: 'row',
  },

  /* ── Model column ── */
  modelCol: {
    width: MODEL_COL,
    overflow: 'hidden',
  },
  modelColNarrow: {
    width: width * 0.52,
  },
  modelImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  /* ── Icon rail (Landing 1) ── */
  iconRail: {
    flex: 1,
    backgroundColor: 'rgba(200,200,200,0.45)',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  iconItem: {
    alignItems: 'center',
    gap: 5,
  },
  iconCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  iconImg: {
    width: 26,
    height: 26,
  },
  iconLabelBox: {
    backgroundColor: 'rgba(130,130,130,0.65)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  iconLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  /* ── SKU grid panel (Landing 2) ── */
  skuPanel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  skuPanelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EEEEEE',
  },
  skuHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
  skuCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  loader: {
    marginTop: 40,
  },
  skuList: {
    padding: 6,
    paddingBottom: 20,
  },
  skuRow: {
    gap: 6,
    marginBottom: 6,
  },
  skuCard: {
    width: CARD_W,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E0E0E0',
  },
  skuImg: {
    width: '100%',
    height: CARD_W * 1.2,
    backgroundColor: '#ECECEC',
  },
  skuInfo: {
    paddingHorizontal: 5,
    paddingVertical: 4,
  },
  skuId: {
    fontSize: 9,
    fontWeight: '600',
    color: '#333',
  },
});

export default MyWardrobeScreen;
