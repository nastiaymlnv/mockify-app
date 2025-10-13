import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth-service/reducer';
import productsReducer from './products-service/reducer';

export const store = configureStore({
	reducer: {
		authStore: authReducer,
		productsStore: productsReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
