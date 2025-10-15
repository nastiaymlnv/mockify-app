import type { DeliveryFormData } from '../../components/templates/CartPage/DeliveryForm/deliveryForm.config';

import type { CartProduct } from '../../types/products.type';

export interface CartState {
	cart: CartProduct[];
	totalPrice: number;
	isLoading: boolean;
}

export interface CartActionResponse {
	cart: CartProduct[];
	totalPrice: number;
}

export interface PlaceOrderDto extends DeliveryFormData {
	items: CartProduct[];
}
