import {
    ChangeThemeReducer,
    RefreshTokenSaga,
    RefreshTokenReducer,
    GetUserReducer,
    AllCountryReducer,
    ToastReducer,
    AllReferenceReducer,
    ResetPasswordReducer,
    LogOutReducer,
} from "./store";

export const commonReducer = {
    change_theme: ChangeThemeReducer,
    refresh_token: RefreshTokenReducer,
    get_user: GetUserReducer,
    all_country: AllCountryReducer,
    all_reference: AllReferenceReducer,
    toast: ToastReducer,
    reset_password: ResetPasswordReducer,
    logout: LogOutReducer,
};

export const commonSaga = [RefreshTokenSaga()];
