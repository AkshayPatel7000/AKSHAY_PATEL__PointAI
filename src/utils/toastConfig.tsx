import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';
import { Colors, Spacing, BorderRadius, Typography, Shadow } from '../theme';

export const toastConfig = {
  skuToast: ({ text1, text2 }: BaseToastProps) => (
    <View style={styles.toast}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>👗</Text>
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.title} numberOfLines={1}>
          {text1}
        </Text>
        {text2 ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {text2}
          </Text>
        ) : null}
      </View>
    </View>
  ),

  success: ({ text1, text2 }: BaseToastProps) => (
    <View style={[styles.toast, styles.toastSuccess]}>
      <Text style={styles.icon}>✅</Text>
      <View style={styles.textGroup}>
        <Text style={styles.title}>{text1}</Text>
        {text2 ? <Text style={styles.subtitle}>{text2}</Text> : null}
      </View>
    </View>
  ),

  error: ({ text1, text2 }: BaseToastProps) => (
    <View style={[styles.toast, styles.toastError]}>
      <Text style={styles.icon}>❌</Text>
      <View style={styles.textGroup}>
        <Text style={styles.title}>{text1}</Text>
        {text2 ? <Text style={styles.subtitle}>{text2}</Text> : null}
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.toast.bg,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.xl,
    gap: Spacing.sm,
    ...Shadow.lg,
  },
  toastSuccess: { backgroundColor: '#065F46' },
  toastError: { backgroundColor: '#7F1D1D' },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 20 },
  textGroup: { flex: 1 },
  title: {
    ...Typography.headingSmall,
    color: Colors.textOnPrimary,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
});
