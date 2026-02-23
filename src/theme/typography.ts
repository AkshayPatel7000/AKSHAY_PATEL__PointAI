import { TextStyle } from 'react-native';

const FontFamily = {
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
};

const FontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 36,
};

const Typography: Record<string, TextStyle> = {
  displayLarge: {
    fontSize: FontSize.xxxl,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 44,
  },
  displayMedium: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 36,
  },
  headingLarge: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    lineHeight: 30,
  },
  headingMedium: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    lineHeight: 26,
  },
  headingSmall: {
    fontSize: FontSize.md,
    fontWeight: '600',
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: FontSize.md,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: FontSize.base,
    fontWeight: '400',
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: FontSize.sm,
    fontWeight: '400',
    lineHeight: 18,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: FontSize.xs,
    fontWeight: '400',
    lineHeight: 14,
  },
  button: {
    fontSize: FontSize.md,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
};

export { FontFamily, FontSize, Typography };
