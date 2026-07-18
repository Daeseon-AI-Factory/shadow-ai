import { forwardRef, type ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type TextStyle,
} from 'react-native';

import { createPressableRipple, usePressableFeedback } from '@/components/pressable-feedback';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export type SemanticButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  children?: ReactNode;
  label?: string;
  leading?: ReactNode;
  style?: PressableProps['style'];
  textStyle?: StyleProp<TextStyle>;
};

export type PrimaryButtonProps = SemanticButtonProps;
export type TalkButtonProps = SemanticButtonProps;

type SemanticButtonInternalProps = SemanticButtonProps & {
  tone: 'primary' | 'live';
};

const SemanticButton = forwardRef<View, SemanticButtonInternalProps>(function SemanticButton(
  {
    tone,
    children,
    label,
    leading,
    style,
    textStyle,
    onFocus,
    onBlur,
    android_ripple,
    accessibilityLabel,
    accessibilityRole,
    accessibilityState,
    disabled = false,
    focusable,
    ...rest
  },
  ref,
) {
  const theme = useTheme();
  const isDisabled = disabled === true;
  const colors =
    tone === 'live'
      ? { background: theme.live, content: theme.onLive }
      : { background: theme.primary, content: theme.onPrimary };
  const feedback = usePressableFeedback({
    disabled: isDisabled,
    focusRingColor: theme.primary,
    onFocus,
    onBlur,
    style: (state) => [
      styles.button,
      { backgroundColor: colors.background },
      typeof style === 'function' ? style(state) : style,
    ],
  });
  const content = label ?? children;
  const inferredLabel =
    accessibilityLabel ??
    (label ?? (typeof children === 'string' || typeof children === 'number' ? String(children) : undefined));

  return (
    <Pressable
      {...rest}
      accessibilityLabel={inferredLabel}
      accessibilityRole={accessibilityRole ?? 'button'}
      accessibilityState={{ ...accessibilityState, disabled: isDisabled }}
      android_ripple={android_ripple ?? createPressableRipple(theme.pressed)}
      disabled={isDisabled}
      focusable={isDisabled ? false : focusable}
      onBlur={feedback.onBlur}
      onFocus={feedback.onFocus}
      ref={ref}
      style={feedback.style}
    >
      <View style={styles.content}>
        {leading}
        {typeof content === 'string' || typeof content === 'number' ? (
          <ThemedText type="body" style={[styles.text, { color: colors.content }, textStyle]}>
            {content}
          </ThemedText>
        ) : (
          content
        )}
      </View>
    </Pressable>
  );
});

export const PrimaryButton = forwardRef<View, PrimaryButtonProps>(function PrimaryButton(
  props,
  ref,
) {
  return <SemanticButton {...props} ref={ref} tone="primary" />;
});

export const TalkButton = forwardRef<View, TalkButtonProps>(function TalkButton(props, ref) {
  return <SemanticButton {...props} ref={ref} tone="live" />;
});

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 16,
    justifyContent: 'center',
    minHeight: 52,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  text: {
    fontWeight: 800,
    textAlign: 'center',
  },
});
