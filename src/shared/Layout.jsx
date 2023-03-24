import React from 'react';
import NavigationBar from '../components/NavigationBar';

function Layout({ children }) {
	return (
		<>
			<NavigationBar />
			{children}
		</>
	);
}

export default Layout;
