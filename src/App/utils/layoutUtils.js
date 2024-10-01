import app from "App/config/app";
import BaseUrlConfiguration from "App/lib/BaseUrlConfiguration";

class layoutUtils {
    /**
     * get copyright text
     *
     * @returns {string}
     */
    getCopyrightText() {
        const country = BaseUrlConfiguration.getDefaultSendingCountryIso3();
        return (app.copyrightText?.[country] ?? "").replace("{{year}}", new Date().getFullYear());
    }
}

export default new layoutUtils();
