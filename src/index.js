import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Redux imports
import { Provider } from 'react-redux';
import store from './app/store';
// App component
import App from './App';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import './index.styles.scss';
import Dashboard from './pages/Dashboard';

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Dashboard />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/register',
		element: <RegisterPage />,
	},
	{
		path: '/dashboard',
		element: <Dashboard />,
	},
]);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}>
				<App />
			</RouterProvider>
		</Provider>
	</React.StrictMode>
);
