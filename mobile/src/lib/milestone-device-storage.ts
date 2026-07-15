import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import {
  recordFirstSparringCompletion,
  type MilestoneStorage,
} from '@/lib/milestone-storage';

function webStorage(): Storage {
  if (typeof globalThis.localStorage === 'undefined') {
    throw new Error('Browser local storage is unavailable.');
  }
  return globalThis.localStorage;
}

export const milestoneDeviceStorage: MilestoneStorage = {
  async getItem(key) {
    if (Platform.OS === 'web') return webStorage().getItem(key);
    if (!(await SecureStore.isAvailableAsync())) return null;
    return SecureStore.getItemAsync(key);
  },
  async setItem(key, value) {
    if (Platform.OS === 'web') {
      webStorage().setItem(key, value);
      return;
    }
    if (!(await SecureStore.isAvailableAsync())) {
      throw new Error('Secure milestone storage is unavailable.');
    }
    await SecureStore.setItemAsync(key, value);
  },
};

export function markFirstSparringComplete(userId: string): Promise<void> {
  return recordFirstSparringCompletion(milestoneDeviceStorage, userId);
}
