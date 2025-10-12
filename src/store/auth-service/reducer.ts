import { createSlice } from '@reduxjs/toolkit';

import { getCurrentUser, login } from './actions';

import { getCurrentUserOperation, loginOperation, pendingOperation, rejectedOperation } from './operations';

import type { AuthState } from './interfaces';

const initialState: AuthState = {
	user: null,
	isAuth: !!localStorage.getItem('token'),
	isLoading: false,
	error: '',
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
	},
});

export default authSlice.reducer;
