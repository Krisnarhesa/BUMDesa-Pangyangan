import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import '../css/app.css';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import StrukturOrganisasiLayout from './layouts/StrukturOrganisasiLayout';
import UnitUsahaLayout from './layouts/UnitUsahaLayout';
import GaleriLayout from './layouts/GaleriLayout';
import BeritaLayout from './layouts/BeritaLayout';
import { CookiesProvider } from 'react-cookie';
import ReactQueryProvider from './lib/react-query/Provider';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { ErrorBoundary } from 'react-error-boundary';

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
				<ReactQueryProvider>
					<PublicLayout>
						<ErrorBoundary fallback={<div className='px-4 sm:px-6 md:px-8 lg:pl-72'>Terjadi kesalahan. Coba lagi</div>}>
							<UnitUsahaLayout>{page}</UnitUsahaLayout>
						</ErrorBoundary>
					</PublicLayout>
				</ReactQueryProvider>
			);
		} else if (name.startsWith('Public/Publikasi/Galeri/')) {
			page.default.layout = (page: React.ReactNode) => (
				<PublicLayout>
					<GaleriLayout>
						<ErrorBoundary fallback={<div className='px-4 sm:px-6 md:px-8 lg:pl-72'>Terjadi kesalahan. Coba lagi</div>}>
							{page}
						</ErrorBoundary>
					</GaleriLayout>
				</PublicLayout>
			);
		} else if (name.startsWith('Public/Publikasi/Berita/')) {
			page.default.layout = (page: React.ReactNode) => (
				<PublicLayout>
					<BeritaLayout>{page}</BeritaLayout>
				</PublicLayout>
			);
		} else if (name.startsWith('Public/')) {
			page.default.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>;
		} else {
			const patterns = [/^\/admin\/unit-usaha\/\d+\/produk$/, /^\/admin\/unit-usaha\/[a-zA-Z]+$/];
			const isMatch = patterns.some((reg) => reg.test(window.location.pathname));

			page.default.layout =
				page.default.layout ||
				((page: React.ReactNode) => (
					<ReactQueryProvider>
						<NuqsAdapter>
							<CookiesProvider>
								<AdminLayout>
									<ErrorBoundary
										fallback={<div className='px-4 sm:px-6 md:px-8 lg:pl-72'>Terjadi kesalahan. Coba lagi</div>}
									>
										{page}
									</ErrorBoundary>
								</AdminLayout>
							</CookiesProvider>
						</NuqsAdapter>
					</ReactQueryProvider>
				));
		}

		return page;
	},
	setup({ el, App, props }) {
		createRoot(el).render(<App {...props} />);
	},
});
