/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthActionType } from '../action-types';

import axiosInstance from '../../api/axios';
import { AUTH } from '../../api/api-urls';

import type { UserLoginDto, UserLoginResponse } from './interfaces';
import type { User } from '../../types/user.type';

export const login = createAsyncThunk<
	UserLoginResponse, // fulfilled return type
	UserLoginDto, // argument type
	{ rejectValue: string } // thunk API config
>(AuthActionType.LOGIN, async (query: UserLoginDto, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.post(AUTH.LOGIN, query);

		return data;
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || 'Login failed');
	}
});

export const getCurrentUser = createAsyncThunk<
	User, // fulfilled return type
	undefined, // argument type
	{ rejectValue: string } // thunk API config
>(AuthActionType.GET_AUTH_USER, async (_, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.get(AUTH.GET_AUTH_USER);

		return data;
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || 'Failed to get current user');
	}
});
