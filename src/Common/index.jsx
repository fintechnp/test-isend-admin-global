import {
    ChangeThemeReducer,
    RefreshTokenSaga,
    RefreshTokenReducer,
    GetUserReducer,
    AllCountryReducer,
    ToastReducer,
    AllReferenceReducer,
    LogOutReducer,
} from "./store";

export const commonReducer = {
    change_theme: ChangeThemeReducer,
    refresh_token: RefreshTokenReducer,
    get_user: GetUserReducer,
    all_country: AllCountryReducer,
    all_reference: AllReferenceReducer,
    toast: ToastReducer,
    logout: LogOutReducer,
};

export const commonSaga = [RefreshTokenSaga()];
