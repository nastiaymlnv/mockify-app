import type { User } from '../../types/user.type';

export interface AuthState {
	user: User | null;
	isAuth: boolean;
	isLoading: boolean;
	error: string;
}

export interface UserLoginDto {
	username: string;
	password: string;
}

export interface UserLoginResponse extends User {
	accessToken: string;
	refreshToken: string;
}
