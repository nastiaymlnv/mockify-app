import { createSlice } from '@reduxjs/toolkit';

import { getCurrentUser, login, logout } from './actions';

import {
	getCurrentUserOperation,
	loginOperation,
	logoutOperation,
	pendingOperation,
	rejectedOperation,
} from './operations';

import type { AuthState } from './interfaces';

const initialState: AuthState = {
	user: null,
	isAuth: !!localStorage.getItem('token'),
	isLoading: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// login
		builder.addCase(login.pending, pendingOperation);
		builder.addCase(login.fulfilled, loginOperation);
		builder.addCase(login.rejected, rejectedOperation);
		// get current auth user
		builder.addCase(getCurrentUser.pending, pendingOperation);
		builder.addCase(getCurrentUser.fulfilled, getCurrentUserOperation);
		builder.addCase(getCurrentUser.rejected, rejectedOperation);
		// logout
		builder.addCase(logout.pending, pendingOperation);
		builder.addCase(logout.fulfilled, logoutOperation);
		builder.addCase(logout.rejected, rejectedOperation);
	},
});

export default authSlice.reducer;
