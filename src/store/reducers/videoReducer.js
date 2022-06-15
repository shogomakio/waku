import * as actionTypes from "../actionTypes";

const initialState = {
  videos: [],
  videoCount: 0,
  video: {
    code: null,
    title: "",
    path: "",
    part: 1,
    viewCount: 0,
    favorite: false,
    year: null,
    categories: {},
  },
  showPlayer: false,
  canLoadVideos: true,
  categories: {},
};

const video = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_VIDEOS:
      return {
        ...state,
        videos: [...state.videos, ...action.videos],
      };
    case actionTypes.UPDATE_VIDEO:
      return {
        ...state,
        video: action.video,
      };
    case actionTypes.UPDATE_THUMBNAIL:
      return {
        ...state,
        video: {
          ...video,
          thumbnail: action.thumbnail,
        },
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        video: {
          ...video,
        },
        error: action.error,
      };
    case actionTypes.UPDATE_SHOW_PLAYER:
      return {
        ...state,
        showPlayer: action.showPlayer,
      };
    case actionTypes.SEARCH_VIDEO:
      return {
        ...state,
        canLoadVideos: false,
        videos: action.videos,
      };
    case actionTypes.GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case actionTypes.GET_VIDEO_CATEGORIES:
      return {
        ...state,
        video: {
          ...state.video,
          categories: action.categories,
        },
      };
    case actionTypes.CAN_LOAD_VIDEO:
      return {
        ...state,
        canLoadVideos: true,
      };
    case actionTypes.CLEAR_VIDEOS:
      return {
        ...state,
        videos: [],
      };
    default:
      return state;
  }
};

export default video;
