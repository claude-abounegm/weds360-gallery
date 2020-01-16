import { combineReducers } from "redux";

import loadingReducer from "./loadingSlice";
import errorReducer from "./errorSlice";
import pageReducer from "./pageSlice";
import imagesReducer from "./imagesSlice";

const rootReducer = combineReducers({
  isLoading: loadingReducer,
  images: imagesReducer,
  error: errorReducer,
  page: pageReducer
});

export default rootReducer;
