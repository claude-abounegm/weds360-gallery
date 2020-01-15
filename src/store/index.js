import { createStore, applyMiddleware, compose } from "redux";
import saga from "redux-saga";

import rootReducer from "../reducers";
import rootSaga from "./../sagas";

export const configureStore = () => {
  const initialState = {};

  const sagaMiddleware = saga();
  const middleware = [sagaMiddleware];

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
