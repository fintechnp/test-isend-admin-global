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
        success: false,
        loading: false,
        error: null,
        response: [],
      };
    default:
      return state;
  }
};

const updateBannerInitialState = {
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
        success: false,
        loading: false,
        error: null,
        response: [],
      };
    default:
      return state;
  }
};

const updateBannerStatusInitialState = {
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
