import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import '../css/app.css';
import MainLayout from './layouts/MainLayout';

createInertiaApp({
	resolve: (name) => {
		const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
		let page = pages[`./Pages/${name}.tsx`] as any;
		page.default.layout = name.startsWith('Admin/')
			? (page: React.ReactNode) => <MainLayout>{page}</MainLayout>
			: undefined;
		return page;
	},
	setup({ el, App, props }) {
		createRoot(el).render(<App {...props} />);
	},
});
