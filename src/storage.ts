import AsyncStorage from '@react-native-async-storage/async-storage';
import type { TProps } from './types';

const setItem = (key: string, values: TProps[]) => {
  try {
    AsyncStorage.setItem(key, JSON.stringify(values));
  } catch (error) {
    throw error;
  }
};

const getItem = async (key: string) => {
  try {
    let results = await AsyncStorage.getItem(key);
    if (results) {
      return JSON.parse(results);
    }
    return [];
  } catch (error) {
    throw error;
  }
};

const removeItem = (key: string) => {
  try {
    return AsyncStorage.removeItem(key);
  } catch (error) {
    throw error;
  }
};

export { setItem, getItem, removeItem };
