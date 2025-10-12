import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import ControlledInput from '../../components/elements/ControlledInput';
import Logo from '../../components/elements/Logo';

import { ROUTES } from '../../routes';

import { getCurrentUser, login } from '../../store/auth-service/actions';
import { useAppDispatch } from '../../store/hooks';

import { defaultValues, loginSchema, type LoginFormData } from './loginPage.config';

import EyeOpened from '../../assets/icons/eye-open.svg';
import EyeClosed from '../../assets/icons/eye-crossed.svg';

const LoginPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: yupResolver(loginSchema),
		defaultValues,
	});

	const onSubmit = async (values: LoginFormData) => {
		const { username, password } = values;
		setIsLoading(true);
		setError(null);

		try {
			await dispatch(login({ username, password })).unwrap();
			await dispatch(getCurrentUser());

			navigate(ROUTES.Products, { replace: true });
		} catch (error: unknown) {
			setError(error as string);
		}

		setIsLoading(false);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30 flex items-center justify-center px-4">
			<section className="max-w-md w-full">
				<div className="text-center mb-8">
					<div className="mb-4">
						<Logo />
					</div>
					<h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
					<p className="text-gray-600">Sign in to your account to continue shopping</p>
				</div>

				<article className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{error && (
							<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
								{error}
							</div>
						)}

						<ControlledInput
							control={control}
							label="Username"
							placeholder="Your username"
							name="username"
							error={errors?.username?.message}
						/>

						<ControlledInput
							control={control}
							label="Password"
							placeholder="••••••••"
							type={isPasswordHidden ? 'password' : 'text'}
							name="password"
							error={errors?.password?.message}
							endIcon={
								<div onClick={() => setIsPasswordHidden(!isPasswordHidden)}>
									{isPasswordHidden ? (
										<img src={EyeOpened} alt="show password" />
									) : (
										<img src={EyeClosed} alt="hide password" />
									)}
								</div>
							}
						/>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2"
						>
							{isLoading ? <span>Signing in...</span> : <span>Sign In</span>}
						</button>
					</form>
				</article>
			</section>
		</div>
	);
};

export default LoginPage;
