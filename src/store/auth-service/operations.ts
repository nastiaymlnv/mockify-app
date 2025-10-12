import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, UserLoginResponse } from './interfaces';
import type { User } from '../../types/user.type';

export const pendingOperation = (state: AuthState) => {
	state.isLoading = true;
};

export const rejectedOperation = (state: AuthState) => {
	state.isLoading = false;
};

export const loginOperation = (state: AuthState, { payload }: PayloadAction<UserLoginResponse>) => {
	const { accessToken } = payload;
	localStorage.setItem('token', accessToken);

	state.isLoading = false;
	state.isAuth = true;
};

export const getCurrentUserOperation = (state: AuthState, { payload }: PayloadAction<User>) => {
	state.user = payload;
	state.isLoading = false;
};
