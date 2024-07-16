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
    SendCountryReducer,
    GetUserMenusAndPermissionsReducer,
    GetCountryValidationRulesReducer,
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
    get_send_country: SendCountryReducer,
    get_user_menus_and_permissions: GetUserMenusAndPermissionsReducer,
    get_country_validation_rules: GetCountryValidationRulesReducer,
};

export const commonSaga = [RefreshTokenSaga()];
