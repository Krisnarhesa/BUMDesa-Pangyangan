import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import '../css/app.css';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import StrukturOrganisasiLayout from './layouts/StrukturOrganisasiLayout';
import UnitUsahaLayout from './layouts/UnitUsahaLayout';

createInertiaApp({
	resolve: (name) => {
		const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
		let page = pages[`./Pages/${name}.tsx`] as any;

		// Set layout
		if (name.startsWith('Public/Struktur/')) {
			page.default.layout = (page: React.ReactNode) => (
				<PublicLayout>
					<StrukturOrganisasiLayout>{page}</StrukturOrganisasiLayout>
				</PublicLayout>
			);
		} else if (name.startsWith('Public/UnitUsaha/')) {
			page.default.layout = (page: React.ReactNode) => (
				<PublicLayout>
					<UnitUsahaLayout>{page}</UnitUsahaLayout>
				</PublicLayout>
			);
		} else if (name.startsWith('Public/')) {
			page.default.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>;
		} else {
			page.default.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
		}

		return page;
	},
	setup({ el, App, props }) {
		createRoot(el).render(<App {...props} />);
	},
});
