import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';

/**
 * Configure the Redux store.
 */
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
