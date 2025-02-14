import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import './App.scss';
import Header from './components/header/Header';
import { useAppStore } from './store/app.store';

export default function App() {
	const { pathname } = useLocation();
	const { isAuthenticated, logout } = useAppStore(); 

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);



	return (
		<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
			<Header  isAuthenticated={isAuthenticated} handleLogout={logout}/>
			<Outlet />
		</MantineProvider>
	);
}
