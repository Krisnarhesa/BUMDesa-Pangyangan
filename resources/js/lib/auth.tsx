import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { route } from 'ziggy-js';

export function useAuth() {
	const [cookies, setCookie, removeCookie] = useCookies(['token']);

	const login = (token: string) => {
		setCookie('token', token);
		window.location.replace(route('admin.dashboard'));
	};

	const logout = () => {
		removeCookie('token');
		window.location.replace(route('admin.login'));
	};

	const isLoggedIn = () => {
		return !!cookies.token;
	};

	return { login, logout, isLoggedIn };
}

export const withAuth = (Component: React.FC) => {
	const AuthenticatedComponent = ({ ...props }) => {
		const { isLoggedIn } = useAuth();

		if (!isLoggedIn()) {
			window.location.replace(route('admin.login'));
			return null;
		} else {
			return <Component {...props} />;
		}
	};

	return AuthenticatedComponent;
};
