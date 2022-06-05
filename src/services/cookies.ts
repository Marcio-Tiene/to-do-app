/* eslint-disable no-param-reassign */
import jwtDecode from 'jwt-decode';

const { VITE_COOKIE_DOMAIN } = import.meta.env;
interface IDecodedToken {
  name: string, iat: number, id: string, exp: number
}
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

  static setCookie(key: string, value: string, expires: Date) {
    const exp = expires.toUTCString();
    document.cookie = `${key}=${encodeURIComponent(value)};domain=${VITE_COOKIE_DOMAIN};expires=${exp};path=/;SameSite=None;Secure`;
  }

  static removeCookie(key: string) {
    this.setCookie(key, '', new Date(0));
  }

  static setAuth(token: string) {
    const decodedTOken = jwtDecode(token);

    const { exp, name } = decodedTOken as IDecodedToken;
    const expires = new Date(exp * 1000);

    this.setCookie('token', token, expires);
    this.setCookie('username', name, expires);
  }

  static removeAuth() {
    this.removeCookie('token');
    this.removeCookie('username');
  }
}

export default Cookies;
