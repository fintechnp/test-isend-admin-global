import Api from "../services/api";

const auth = {
    signIn: async (credentials) => {
        const headers = {
            source: "web",
            "Access-Control-Allow-Origin": "*",
        };
        const api = new Api(false);
        return await api.post("account/login", credentials, headers);
    },
};

export default auth;
