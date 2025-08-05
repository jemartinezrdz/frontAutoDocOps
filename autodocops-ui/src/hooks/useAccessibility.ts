import { useState, useEffect } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

interface AccessibilityState {
  isScreenReaderEnabled: boolean;
  isReduceMotionEnabled: boolean;
  isReduceTransparencyEnabled: boolean;
  isBoldTextEnabled: boolean;
  isGrayscaleEnabled: boolean;
  isInvertColorsEnabled: boolean;
}

export function useAccessibility(): AccessibilityState {
  const [accessibilityState, setAccessibilityState] = useState<AccessibilityState>({
    isScreenReaderEnabled: false,
    isReduceMotionEnabled: false,
    isReduceTransparencyEnabled: false,
    isBoldTextEnabled: false,
    isGrayscaleEnabled: false,
    isInvertColorsEnabled: false,
  });

  useEffect(() => {
    const checkAccessibilitySettings = async () => {
      try {
        const [
          screenReader,
          reduceMotion,
          reduceTransparency,
          boldText,
          grayscale,
          invertColors,
        ] = await Promise.all([
          AccessibilityInfo.isScreenReaderEnabled(),
          Platform.OS === 'ios' ? AccessibilityInfo.isReduceMotionEnabled() : Promise.resolve(false),
          Platform.OS === 'ios' ? AccessibilityInfo.isReduceTransparencyEnabled() : Promise.resolve(false),
          Platform.OS === 'ios' ? AccessibilityInfo.isBoldTextEnabled() : Promise.resolve(false),
          Platform.OS === 'ios' ? AccessibilityInfo.isGrayscaleEnabled() : Promise.resolve(false),
          Platform.OS === 'ios' ? AccessibilityInfo.isInvertColorsEnabled() : Promise.resolve(false),
        ]);

        setAccessibilityState({
          isScreenReaderEnabled: screenReader,
          isReduceMotionEnabled: reduceMotion,
          isReduceTransparencyEnabled: reduceTransparency,
          isBoldTextEnabled: boldText,
          isGrayscaleEnabled: grayscale,
          isInvertColorsEnabled: invertColors,
        });
      } catch (error) {
        console.warn('Error checking accessibility settings:', error);
      }
    };

    checkAccessibilitySettings();

    // Listen for changes
    const screenReaderListener = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      (isEnabled) => {
        setAccessibilityState(prev => ({
          ...prev,
          isScreenReaderEnabled: isEnabled,
        }));
      }
    );

    const reduceMotionListener = Platform.OS === 'ios' 
      ? AccessibilityInfo.addEventListener(
          'reduceMotionChanged',
          (isEnabled) => {
            setAccessibilityState(prev => ({
              ...prev,
              isReduceMotionEnabled: isEnabled,
            }));
          }
        )
      : null;

    const boldTextListener = Platform.OS === 'ios'
      ? AccessibilityInfo.addEventListener(
          'boldTextChanged',
          (isEnabled) => {
            setAccessibilityState(prev => ({
              ...prev,
              isBoldTextEnabled: isEnabled,
            }));
          }
        )
      : null;

    return () => {
      screenReaderListener?.remove();
      reduceMotionListener?.remove();
      boldTextListener?.remove();
    };
  }, []);

  return accessibilityState;
}

// Helper hook for announcing messages to screen readers
export function useScreenReaderAnnouncement() {
  const announce = (message: string) => {
    if (Platform.OS === 'ios') {
      AccessibilityInfo.announceForAccessibility(message);
    } else {
      // For Android, we can use setAccessibilityFocus or announceForAccessibility
      AccessibilityInfo.announceForAccessibility(message);
    }
  };

  return { announce };
}

// Helper function to generate accessibility props
export function getAccessibilityProps(
  label: string,
  hint?: string,
  role?: string,
  state?: { disabled?: boolean; selected?: boolean; checked?: boolean }
) {
  return {
    accessible: true,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityRole: role as any,
    accessibilityState: state,
  };
}

