import type { ReactNode } from 'react';
import { Controller, type FieldValues, type UseControllerProps } from 'react-hook-form';

interface InputProps {
	label?: string;
	type?: string;
	placeholder?: string;
	name: string;
	error?: string;
	endIcon?: ReactNode;
}

export type CustomInputProps<T extends FieldValues = FieldValues> = InputProps & IControllerType<T>;

export type IControllerType<T extends FieldValues = FieldValues> = UseControllerProps<T>;

const ControlledInput = <T extends FieldValues = FieldValues>({
	label,
	type = 'text',
	placeholder,
	name,
	control,
	endIcon,
	...props
}: CustomInputProps<T>) => {
	return (
		<Controller
			control={control}
			name={name}
			{...props}
			render={({ field, fieldState: { error } }) => {
				return (
					<div>
						{label && (
							<label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
								{label}
							</label>
						)}
						<div className="relative">
							<input
								type={type}
								id={name}
								className="focus:outline-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
								placeholder={placeholder}
								{...field}
							/>
							{endIcon && (
								<div className="cursor-pointer w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2">
									{endIcon}
								</div>
							)}
							{error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
						</div>
					</div>
				);
			}}
		/>
	);
};

export default ControlledInput;
