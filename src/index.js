import React from 'react';
import { createRoot } from 'react-dom/client';
// Redux imports
import { Provider } from 'react-redux';
import store from './app/store';
// App component
import App from './App';

import './index.styles.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
