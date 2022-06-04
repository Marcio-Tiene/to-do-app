/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/prefer-default-export
class Cookies {
  static getAll() {
    const cookiesRaw = document.cookie;
    const splitedCookies = cookiesRaw?.split('; ');
    const cookies = splitedCookies?.reduce((object, rawCookie) => {
      const [name, value] = rawCookie.split('=');

      object[name.trim()] = decodeURIComponent(value).trim();
      return object;
    }, {} as Record<string, string>);

    return cookies;
  }

  static get(name: string): string {
    return this.getAll()[name.trim()];
  }
}

export default Cookies;
