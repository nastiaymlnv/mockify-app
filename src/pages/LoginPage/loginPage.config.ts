import * as yup from 'yup';

export interface LoginFormData {
	username: string;
	password: string;
}

export const defaultValues: LoginFormData = {
	username: '',
	password: '',
};

export const loginSchema = yup.object({
	username: yup.string().min(6, 'Username must have at least 6 characters').required('Username is required'),
	password: yup.string().min(6, 'Password must have at least 6 characters').required('Password is required'),
});
