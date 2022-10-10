import Cookie from '@react-native-cookies/cookies';

const CookieManager = {
  getCookie: async (url: string): Promise<any> => {
    try {
      const cookie = await Cookie.get(url);
      return cookie;
    } catch (e) {
      return { success: false, error: e };
    }
  },
  setCookie: async (url: string, options: { name: string, value: string, path: string, version: string, expires: string, secure: boolean, httpOnly: boolean }): Promise<any> => {
    try {
      console.log("Set COokie", {
        url,
        options,
      })
      await Cookie.set(
        url,
        options,
        true
      );
      return { success: true };
    } catch (e) {
      // saving error
      return { success: false, error: e };
    }
  },
};

export default CookieManager;
