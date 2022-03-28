import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import modeReducer from "./modeReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["changeMode"], //each reducer would go in here
};

const rootReducers = combineReducers({
  changeMode: modeReducer,
});

export default persistReducer(persistConfig, rootReducers);
