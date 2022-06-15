import axios from "axios";
import { batch } from "react-redux";
import Config from "../../Utils/Config";
import * as actionTypes from "../../store/actionTypes";

// axios
export const getVideosApi = (
  limit = Config.searchDefault.limit,
  page = Config.searchDefault.page
) => {
  return async (dispatch) => {
    try {
      const params = `?limit=${limit}&page=${page}`;
      const url = `http://localhost:3000/video/get/all${params}`;
      const res = await axios.get(url);
      const videoList = res.data;
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
      return [...json];
    } catch (err) {
      alert(err);
    }
  };
};

export const getVideoCategoriesApi = async (id) => {
  try {
    const url = `http://localhost:3000/video/category/load?id=${id}`;
    const res = await axios.get(url);
    const json = res.data;
    return [...json];
  } catch (err) {
    alert(err);
  }
};

export const updateCategory = async (id, category) => {
  try {
    const url = `http://localhost:3000/category/update`;
    const body = { id, category };
    const res = await axios.put(url, body);
    return res.data;
  } catch (err) {
    alert(err);
  }
};

export const addCategory = async (category) => {
  try {
    const url = `http://localhost:3000/category/create`;
    const body = { category };
    const res = await axios.post(url, body);
    if (res.data.exist) {
      alert("already exists. couldn't add category.");
      return;
    }
    alert("category added.");
    return res.data;
  } catch (err) {
    alert(err);
  }
};
