import axios from "axios";
import { batch } from "react-redux";
import * as actionTypes from "./actionTypes";

export const addVideo = (video) => {
  return {
    type: actionTypes.ADD_VIDEO,
    payload: video,
  };
};

export const updateVideo = (item) => {
  return {
    type: actionTypes.UPDATE_VIDEO,
    item,
  };
};

export const deleteVideo = (item) => {
  return {
    type: actionTypes.DELETE_VIDEO,
    item,
  };
};

export const loadVideo = (videos) => {
  return {
    type: actionTypes.LOAD_VIDEOS,
    payload: videos,
  };
};

export const setError = (error) => {
  return {
    type: actionTypes.SET_ERROR,
    payload: error,
  };
};

export const updateShowPlayer = (showPlayer) => {
  return {
    type: actionTypes.UPDATE_SHOW_PLAYER,
    showPlayer,
  };
};

export const clearVideos = () => {
  return {
    type: actionTypes.CLEAR_VIDEOS,
  };
};

// axios
export const getVideosApi = (limit = 50, page = 1) => {
  return async (dispatch, getState) => {
    try {
      const params = `?limit=${limit}&page=${page}`;
      const url = `http://localhost:3000/video/get/all${params}`;
      const res = await axios.get(url);
      const videoList = res.data;
      // console.log("state", state);
      // dispatch({
      //   type: actionTypes.LOAD_VIDEOS,
      //   videos: videoList,
      // });
      batch(() => {
        dispatch({
          type: actionTypes.LOAD_VIDEOS,
          videos: videoList,
        });
        dispatch({
          type: actionTypes.CAN_LOAD_VIDEO,
        });
      });
      return videoList;
    } catch (err) {
      alert(err);
    }
  };
};

export const updateVideoViewCount = (id) => {
  return () => {
    try {
      const url = `http://localhost:3000/video/update/view_count`;
      const body = {
        id,
      };
      axios.post(url, body);
    } catch (err) {
      alert(err);
    }
  };
};

export const updateVideoApi = (video, categories = null) => {
  return () => {
    try {
      // TODO: refactor this like line :164
      for (const category of categories) {
        delete category.value;
        delete category.label;
      }
      const url = `http://localhost:3000/video/update`;
      const body = {
        video,
        categories,
      };
      axios.post(url, body);
    } catch (err) {
      alert(err);
    }
  };
};

export const generateThumbnailApi = (video, timestamps = null) => {
  return async () => {
    try {
      const url = `http://localhost:3000/thumbnail/generate`;
      const body = {
        video: video,
        timestamps,
      };
      await axios.post(url, body);
      // dispatch({
      //   type: actionTypes.UPDATE_VIDEO,
      //   thumbnail: video.thumbnail,
      // });
    } catch (err) {
      alert(err);
    }
  };
};

export const updateFavoriteApi = (id) => {
  return () => {
    try {
      const url = `http://localhost:3000/video/update/favorite`;
      const body = { id };
      axios.post(url, body);
      // dispatch({
      //   type: actionTypes.UPDATE_FAVORITE,
      //   favorite: favorite,
      // });
    } catch (err) {
      alert(err);
    }
  };
};

export const searchVideoApi = (search, selectedCategories = null) => {
  return async (dispatch) => {
    try {
      let categoriesParam = [];
      for (const category of selectedCategories) {
        categoriesParam.push(category.id);
      }
      const params =
        `search=${search}` +
        (categoriesParam || categoriesParam.length > 0
          ? `&categories=${categoriesParam}`
          : null);
      const url = `http://localhost:3000/video/search?${params}`;
      const res = await axios.get(url);
      const json = res.data;
      dispatch({
        type: actionTypes.SEARCH_VIDEO,
        videos: json,
      });
      return {
        videos: json,
      };
    } catch (err) {
      alert(err);
    }
  };
};

export const getCategoriesApi = () => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:3000/category/load`;
      const res = await axios.get(url);
      const json = res.data;
      dispatch({
        type: actionTypes.GET_CATEGORIES,
        categories: json,
      });
    } catch (err) {
      alert(err);
    }
  };
};

export const getVideoCategoriesApi = (id) => {
  return async () => {
    try {
      const url = `http://localhost:3000/video/category/load?id=${id}`;
      const res = await axios.get(url);
      const json = res.data;
      return [...json];
    } catch (err) {
      alert(err);
    }
  };
};

// TODO: shogo check this one
export const updateVideoCategoriesApi = (id, categories) => {
  return () => {
    try {
      const url = `http://localhost:3000/video/update/categories`;
      const body = { categories };
      axios.post(url, body);
      // dispatch({
      //   type: actionTypes.UPDATE_VIDEO_CATEGORIES,
      //   categories: categories,
      // });
    } catch (err) {
      alert(err);
    }
  };
};
