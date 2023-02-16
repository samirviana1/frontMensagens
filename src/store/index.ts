import { configureStore } from '@reduxjs/toolkit';

import combineReducer from './rootReducer';

const store = configureStore({
    reducer: combineReducer,
    devTools: process.env.NODE_ENV! === 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
