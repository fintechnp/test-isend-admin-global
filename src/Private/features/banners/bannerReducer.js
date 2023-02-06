import bannerActions from "./bannerActions";

const getBannersState = {
  success: false,
  loading: false,
  error: null,
  response: undefined,
};

const getBannersReducer = (state = getBannersState, action) => {
  switch (action.type) {
    case bannerActions.GET_BANNERS:
      return {
        ...state,
        loading: true,
      };
    case bannerActions.GET_BANNERS_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        response: action.response,
      };
    case bannerActions.GET_BANNERS_FAILED:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const getBannerInitialState = {
  success: false,
  loading: false,
  error: null,
  response: undefined,
};

const getBannerReducer = (state = getBannerInitialState, action) => {
  switch (action.type) {
    case bannerActions.GET_BANNER:
      return {
        ...state,
        loading: true,
      };
    case bannerActions.GET_BANNER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        response: action.response,
      };
    case bannerActions.GET_BANNER_FAILED:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const addBannerInitialState = {
  is_modal_open: false,
  success: false,
  loading: false,
  error: null,
  response: undefined,
};

const addBannerReducer = (state = addBannerInitialState, action) => {
  switch (action.type) {
    case bannerActions.ADD_BANNER:
      return {
        ...state,
        loading: true,
      };
    case bannerActions.ADD_BANNER_SUCCESS:
      return {
        ...state,
        is_modal_open: false,
        success: true,
        loading: false,
        response: action.response,
      };
    case bannerActions.ADD_BANNER_FAILED:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.error,
      };
    case bannerActions.ADD_BANNER_RESET:
      return {
        is_modal_open: false,
        success: false,
        loading: false,
        error: null,
        response: undefined,
      };
    case bannerActions.OPEN_ADD_BANNER_MODAL:
      return {
        is_modal_open: true,
        success: false,
        loading: false,
        error: null,
        response: undefined,
      };
    case bannerActions.CLOSE_ADD_BANNER_MODAL:
      return {
        is_modal_open: false,
        success: false,
        loading: false,
        error: null,
        response: undefined,
      };
    default:
      return state;
  }
};

const updateBannerInitialState = {
  is_modal_open: false,
  initial_form_state: undefined,
  success: false,
  loading: false,
  error: null,
  response: undefined,
};

const updateBannerReducer = (state = updateBannerInitialState, action) => {
  switch (action.type) {
    case bannerActions.UPDATE_BANNER:
      return {
        ...state,
        loading: true,
      };
    case bannerActions.UPDATE_BANNER_SUCCESS:
      return {
        ...state,
        is_modal_open: false,
        initial_form_state: undefined,
        success: true,
        loading: false,
        response: action.response,
      };
    case bannerActions.UPDATE_BANNER_FAILED:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.error,
      };
    case bannerActions.UPDATE_BANNER_RESET:
      return {
        is_modal_open: false,
        initial_form_state: undefined,
        success: false,
        loading: false,
        error: null,
        response: [],
      };
    case bannerActions.OPEN_UPDATE_BANNER_MODAL:
      console.log(action);
      return {
        is_modal_open: true,
        initial_form_state: action.payload,
        success: false,
        loading: false,
        error: null,
        response: undefined,
      };
    case bannerActions.CLOSE_UPDATE_BANNER_MODAL:
      return {
        is_modal_open: false,
        initial_form_state: undefined,
        success: false,
        loading: false,
        error: null,
        response: undefined,
      };
    default:
      return state;
  }
};

const WW = {
  success: false,
  loading: false,
  error: null,
  response: undefined,
};

const updateBannerStatusReducer = (
  state = updateBannerStatusInitialState,
  action
) => {
  switch (action.type) {
    case bannerActions.UPDATE_BANNER_STATUS:
      return {
        ...state,
        loading: true,
      };
    case bannerActions.UPDATE_BANNER_STATUS_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        response: action.response,
      };
    case bannerActions.UPDATE_BANNER_STATUS_FAILED:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.error,
      };
    case bannerActions.UPDATE_BANNER_STATUS_RESET:
      return {
        success: false,
        loading: false,
        error: null,
        response: [],
      };
    default:
      return state;
  }
};

const deleteBannerInitialState = {
  success: false,
  loading: false,
  error: null,
  response: undefined,
};

const deleteBannerReducer = (state = deleteBannerInitialState, action) => {
  switch (action.type) {
    case bannerActions.DELETE_BANNER:
      return {
        ...state,
        loading: true,
      };
    case bannerActions.DELETE_BANNER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        response: action.response,
      };
    case bannerActions.DELETE_BANNER_FAILED:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.error,
      };
    case bannerActions.DELETE_BANNER_RESET:
      return {
        success: false,
        loading: false,
        error: null,
        response: [],
      };
    default:
      return state;
  }
};

export {
  getBannerReducer,
  addBannerReducer,
  getBannersReducer,
  updateBannerReducer,
  deleteBannerReducer,
  updateBannerStatusReducer,
};
