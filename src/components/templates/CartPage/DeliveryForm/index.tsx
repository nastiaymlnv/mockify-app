import { useState, type FC } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ControlledInput from '../../../elements/ControlledInput';

import { defaultValues, deliveryFormSchema, type DeliveryFormData } from './deliveryForm.config';

interface DeliveryFormProps {
	onSubmit: (data: DeliveryFormData) => void;
}

const DeliveryForm: FC<DeliveryFormProps> = ({ onSubmit }) => {
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<DeliveryFormData>({
		resolver: yupResolver(deliveryFormSchema) as Resolver<DeliveryFormData>,
		defaultValues,
	});

	const handleSubmitForm = (data: DeliveryFormData) => {
		onSubmit(data);

		// Show temporary UI feedback (set the submitted state to true,
		// and automatically resets it after 3 seconds.
		setIsFormSubmitted(true);
		setTimeout(() => setIsFormSubmitted(false), 3000);
	};

	return (
		<article className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<h2 className="text-xl font-bold text-gray-900 space-x-2 mb-6">Delivery Information</h2>
			<form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
				{/* first row */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<ControlledInput
						control={control}
						label="Full Name *"
						placeholder="John Doe"
						name="fullName"
						error={errors?.fullName?.message}
					/>

					<ControlledInput
						control={control}
						label="Email *"
						placeholder="email@example.com"
						name="email"
						error={errors?.email?.message}
					/>
				</div>
				{/* second row */}
				<ControlledInput
					control={control}
					label="Phone number *"
					placeholder="+38(012)3456789"
					name="phone"
					error={errors?.phone?.message}
				/>
				{/* third row */}
				<ControlledInput
					control={control}
					label="Address *"
					placeholder="123 Test Street, Apt 123"
					name="address"
					error={errors?.address?.message}
				/>
				{/* fourth row */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<ControlledInput
						control={control}
						label="Country *"
						placeholder="Ukraine"
						name="country"
						error={errors?.country?.message}
					/>
					<ControlledInput
						control={control}
						label="City *"
						placeholder="Kyiv"
						name="city"
						error={errors?.city?.message}
					/>
				</div>
				{/* fifth row */}
				<div>
					<label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
						Delivery Notes (Optional)
					</label>
					<textarea
						{...register('notes')}
						id="notes"
						rows={3}
						className="focus:outline-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
						placeholder="Any special delivery instructions..."
					/>
				</div>
				{/* submit button */}
				<button
					type="submit"
					className={`cursor-pointer w-full py-3 rounded-lg font-semibold transition-all active:scale-95 flex items-center justify-center space-x-2 ${
						isFormSubmitted ? 'bg-emerald-500 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-700'
					}`}
				>
					<span> {isFormSubmitted ? 'Order Placed!' : 'Place Order'} </span>
				</button>
			</form>
		</article>
	);
};

export default DeliveryForm;
