import { logger } from "redux-logger";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import jobReducer from "app/redux/features/job";
import userReducer from "app/redux/features/user";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import companyReducer from "./features/company";
// import createSagaMiddleware from "redux-saga";

//redux config
const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["user"],
};
// let sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  user: userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // .concat(logger)
  // middleware: [
  //   ...getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
  //   // sagaMiddleware,
  //   // logger,
  // ],
});
// sagaMiddleware.run(rootSaga);
let persistor = persistStore(store);

export function getAccessToken(): string {
  const state: any = store.getState();
  return state.user.token;
}
export { store, persistor };
