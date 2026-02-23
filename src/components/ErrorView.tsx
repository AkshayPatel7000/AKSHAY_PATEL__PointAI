import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography, Shadow } from '../theme';

interface Props {
  message: string;
  onRetry?: () => void;
}

const ErrorView: React.FC<Props> = ({ message, onRetry }) => (
  <View style={styles.container}>
    <Text style={styles.emoji}>⚠️</Text>
    <Text style={styles.title}>Oops!</Text>
    <Text style={styles.message}>{message}</Text>
    {onRetry && (
      <TouchableOpacity
        style={styles.button}
        onPress={onRetry}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
  emoji: {
    fontSize: 48,
    marginBottom: Spacing.base,
  },
  title: {
    ...Typography.headingLarge,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  message: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.pill,
    ...Shadow.primary,
  },
  buttonText: {
    ...Typography.button,
    color: Colors.textOnPrimary,
  },
});

export default ErrorView;
