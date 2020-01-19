import saga from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../features";
import rootSaga from "./../sagas";

export const config = () => {
  const sagaMiddleware = saga();
  const middleware = [sagaMiddleware];

  const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: true
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default config();
