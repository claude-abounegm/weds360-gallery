import { combineReducers } from "redux";

import loadingReducer from "./loadingSlice";
import errorReducer from "./errorSlice";
import galleryReducer from "./gallerySlice";

const rootReducer = combineReducers({
  isLoading: loadingReducer,
  gallery: galleryReducer,
  error: errorReducer
});

export default rootReducer;
