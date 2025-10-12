import type { RootState } from '../store';

export const selectorGetIsAuthStatus = (store: RootState) => store.authStore.isAuth;
