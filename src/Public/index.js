import { ForgotPasswordReducer, ForgotPasswordSaga } from "./pages/ForgotPassword/store";

export const publicReducer = {
    forgot_password: ForgotPasswordReducer,
};

export const publicSaga = [ForgotPasswordSaga()];
