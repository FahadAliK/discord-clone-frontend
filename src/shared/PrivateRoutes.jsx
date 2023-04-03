import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoutes() {
	const { token } = useSelector((state) => state.auth);
	return token ? <Outlet /> : <Navigate to="/login" />;
}
