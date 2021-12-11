import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist-indexeddb-storage";
import { agendaReducer, authReducer } from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage("tse-db"),
  whitelist: ["auth", "agendas"]
};


export const reducer = combineReducers({
  auth: authReducer,
  agendas: agendaReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);
export const flush = persistor.flush;
