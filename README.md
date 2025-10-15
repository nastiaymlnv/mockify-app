# Mockify App

A React application built with TypeScript, Vite, and Tailwind CSS. Other technologies: Redux Toolkit, react-hook-form, yup

## Demo

https://mockify-app.web.app/

Use credentials to login from https://dummyjson.com/users.

Examples:

- emilys emilyspass
- michaelw michaelwpass
- sophiab sophiabpass

## Key Features & Benefits

- **Modern UI:** Utilizes Tailwind CSS for a responsive and visually appealing user interface.
- **TypeScript:** Ensures type safety and improved code maintainability.
- **Efficient Build:** Powered by Vite for fast development and optimized production builds.
- **API Integration:** Implements a modular API layer for seamless data fetching.
- **Modular Structure:** Organized file structure for scalability and easy navigation.
- **Redux Toolkit:** State management.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

- **Node.js:** (version >= 18 recommended) - [Download Node.js](https://nodejs.org/)
- **npm:** (or yarn, or pnpm) - comes with Node.js

## Installation & Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nastiaymlnv/mockify-app.git
    cd mockify-app
    ```

2.  **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Using yarn:

    ```bash
    yarn install
    ```

    Using pnpm:

    ```bash
    pnpm install
    ```

3.  **Start the development server:**

    Using npm:

    ```bash
    npm run dev
    ```

    Using yarn:

    ```bash
    yarn dev
    ```

    Using pnpm:

    ```bash
    pnpm dev
    ```

    This will start the Vite development server, typically on `http://localhost:5173/`.

## Usage Examples & API Documentation

### API Endpoints

Fake REST API https://dummyjson.com/docs is used in the project

The application uses the following API endpoints, defined in `src/api/api-urls.ts`:

| Endpoint                                  | Description                              | Method | Example Usage                                                            |
| ----------------------------------------- | ---------------------------------------- | ------ | ------------------------------------------------------------------------ |
| `AUTH.LOGIN`                              | Authenticates a user                     | POST   | `axios.post(AUTH.LOGIN, { username, password })`                         |
| `AUTH.GET_AUTH_USER`                      | Retrieves authenticated user information | GET    | `axios.get(AUTH.GET_AUTH_USER)`                                          |
| `PRODUCTS.GET_PRODUCTS`                   | Retrieves all products                   | GET    | `axios.get(PRODUCTS.GET_PRODUCTS)`                                       |
| `PRODUCTS.GET_PRODUCTS_CATEGORIES`        | Retrieves product categories             | GET    | `axios.get(PRODUCTS.GET_PRODUCTS_CATEGORIES)`                            |
| `PRODUCTS.GET_PRODUCTS_BY_CATEGORY(name)` | Retrieves products by category name      | GET    | `axios.get(PRODUCTS.GET_PRODUCTS_BY_CATEGORY('electronics'))`            |
| `PRODUCTS.SEARCH_PRODUCTS`                | Searches for products                    | GET    | `axios.get(PRODUCTS.SEARCH_PRODUCTS, { params: { query: 'keyboard' } })` |
| `PRODUCTS.PLACE_ORDER`                    | Places an order                          | POST   | `axios.post(PRODUCTS.PLACE_ORDER, { orderDetails })`                     |

### Code Snippets

Fetching products:

```typescript
import axios from './api/axios';
import { PRODUCTS } from './api/api-urls';

const fetchProducts = async () => {
	try {
		const response = await axios.get(PRODUCTS.GET_PRODUCTS);
		console.log(response.data);
	} catch (error) {
		console.error('Error fetching products:', error);
	}
};
```

## Configuration Options

- The base URL for API requests is configured in `src/api/axios.ts`. You can modify this to point to your backend API.

```typescript
import axios from 'axios';

const instance = axios.create({
	baseURL: 'YOUR_API_BASE_URL', // Replace with your API URL
	timeout: 10000,
});

export default instance;
```

## License Information

This project is licensed under the MIT License.

## Acknowledgments

- This project utilizes [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [Redux Toolkit](https://redux-toolkit.js.org/), [react-hook-form](https://react-hook-form.com/) and [yup](https://www.npmjs.com/package/yup).
