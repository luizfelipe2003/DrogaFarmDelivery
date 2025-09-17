import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageService = {
  async saveUser(userData) {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      return false;
    }
  },

  async getUser() {
    try {
      const userData = await AsyncStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return null;
    }
  },

  async getRememberMe() {
    try {
      const remember = await AsyncStorage.getItem('rememberMe');
      return remember === 'true';
    } catch (error) {
      return false;
    }
  },

  async setRememberMe(remember) {
    try {
      await AsyncStorage.setItem('rememberMe', remember.toString());
    } catch (error) {
      console.error('Erro ao salvar preferência:', error);
    }
  },

  async clearUserData() {
    try {
      await AsyncStorage.multiRemove(['user', 'rememberMe']);
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
    }
  }
};