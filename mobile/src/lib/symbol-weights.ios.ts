import type { SymbolViewProps } from 'expo-symbols';

type PlatformSymbolWeight = Extract<
  NonNullable<SymbolViewProps['weight']>,
  { android: unknown }
>['android'];

// SymbolView ignores the Android half of a platform weight on iOS. Keeping the iOS resolver free of
// androidWeights imports prevents Metro from packaging Material Symbols fonts into the iOS bundle.
const unusedAndroidWeight = { name: '', font: 0 } satisfies PlatformSymbolWeight;

export const boldSymbolWeight = unusedAndroidWeight;
export const regularSymbolWeight = unusedAndroidWeight;
export const semiBoldSymbolWeight = unusedAndroidWeight;
