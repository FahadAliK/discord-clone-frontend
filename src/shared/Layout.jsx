import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

function Layout() {
	return (
		<>
			<NavigationBar />
			<Outlet />
		</>
	);
}

export default Layout;
