/**
 * A utility for conditionally joining style objects for React Native
 * Similar to the 'cn' utility in the web version, but adapted for React Native StyleSheet
 */

export function cn(...styles: any[]): any {
  return styles.filter(Boolean).reduce((merged, style) => {
    if (typeof style === 'object' && style !== null) {
      return { ...merged, ...style };
    }
    return merged;
  }, {});
} 