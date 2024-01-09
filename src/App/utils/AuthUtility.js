import app from "App/config/app";
import Cookies from "js-cookie";

export default class AuthUtility {
    static #hash = "1a71f69d0e2b3653c13ea5bcbd489d58";

    static #accessTokenNameInWebStorage = encodeURIComponent(`${app.name}.${this.#hash}.AccessToken`);

    static #refreshTokenNameInWebStorage = encodeURIComponent(`${app.name}.${this.#hash}.RefreshToken`);

    static setAccessToken(value) {
        Cookies.set(this.#accessTokenNameInWebStorage, value);
    }

    static getAccessToken() {
        return Cookies.get(this.#accessTokenNameInWebStorage);
    }

    static setRefreshToken(value) {
        Cookies.set(this.#refreshTokenNameInWebStorage, value);
    }

    static getRefreshToken() {
        return Cookies.get(this.#refreshTokenNameInWebStorage);
    }

    static isLoggedIn() {
        return Cookies.get(this.#refreshTokenNameInWebStorage) && Cookies.get(this.#accessTokenNameInWebStorage);
    }

    static logOut() {
        Object.keys(Cookies.get()).forEach(function (cookie) {
            Cookies.remove(cookie);
        });
        localStorage.clear()
    }
}
