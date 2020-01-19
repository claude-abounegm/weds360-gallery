import { combineReducers } from "redux";

import loadingReducer from "./loadingSlice";
import errorReducer from "./errorSlice";
import galleryReducer from "./gallerySlice";
import titleReducer from "./titleSlice";

const rootReducer = combineReducers({
  isLoading: loadingReducer,
  gallery: galleryReducer,
  error: errorReducer,
  title: titleReducer
});

export default rootReducer;
