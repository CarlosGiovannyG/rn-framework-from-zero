import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
  removeValue: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      return { success: true };
    } catch (e) {
      return { success: false, error: e };
    }
  },
  getData: async (key: string): Promise<any> => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        return null;
      }
    } catch (e) {
      return { success: false, error: e };
      // error reading value
    }
  },
  storeData: async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log('storageDataSaved:', key, jsonValue);
      return { success: true };
    } catch (e) {
      // saving error
      return { success: false, error: e };
    }
  },
};

export default Storage;
