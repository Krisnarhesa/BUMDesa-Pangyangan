import { useCookies } from 'react-cookie';
import { route } from 'ziggy-js';

export function useAuth() {
	const [cookies, setCookie, removeCookie] = useCookies(['token']);

	const login = (token: string) => {
		setCookie('token', token, { maxAge: 3600 });
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

export const withAuth = (Component: React.FC<any>) => {
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
