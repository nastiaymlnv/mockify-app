import * as yup from 'yup';

import { PhoneRegExp } from '../../../../constants/regexp';

export interface DeliveryFormData {
	fullName: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	country: string;
	notes?: string;
}

export const defaultValues: DeliveryFormData = {
	fullName: '',
	email: '',
	phone: '',
	address: '',
	city: '',
	country: '',
	notes: '',
};

export const deliveryFormSchema = yup.object({
	fullName: yup.string().required('Full name is required'),
	email: yup.string().email('Invalid email address').required('Email is required'),
	phone: yup.string().matches(PhoneRegExp, 'Invalid phone number').required('Phone number is required'),
	address: yup.string().required('Address is required'),
	city: yup.string().required('City is required'),
	country: yup.string().required('Country is required'),
	notes: yup.string(),
});
