import Api from "../services/api";

const auth = {
    signIn: async (credentials) => {
        const headers = {
            source: "web",
        };
        const api = new Api(false);
        return await api.post("account/login", credentials, headers);
    },
};

export default auth;
