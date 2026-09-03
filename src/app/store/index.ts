import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './rootReducer';

const persistConfig = {
    key: 'root',
    // @ts-expect-error when you are importing storage you expect to have {}:WebStorage, but in runtime for some reason i recieve { __esModule, {}:WebStorage } and have error
    // in node_modules we have this type
    // declare module "redux-persist/es/storage" {
    //   import { WebStorage } from "redux-persist/es/types";

    //   const localStorage: WebStorage;
    //   export default localStorage;
    // }
    // but in js code we have
    // "use strict";

    // exports.__esModule = true; (???)
    // exports.default = void 0;

    // var _createWebStorage = _interopRequireDefault(require("./createWebStorage"));

    // function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    // var _default = (0, _createWebStorage.default)('local');

    // exports.default = _default;
    storage: storage.default,
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/PURGE',
                    'persist/REGISTER',
                    'persist/FLUSH',
                ],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
