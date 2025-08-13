import * as yup from 'yup';

export const AddGalleryItemSchema = yup
	.object({
		judul: yup.string().required('Tidak boleh kosong'),
		jenis: yup.mixed().oneOf(['foto', 'link']),
		foto: yup.mixed().when('jenis', {
			is: 'foto',
			then: (schema) =>
				schema
					.test('required', 'Tidak boleh kosong', (value) => {
						if (value instanceof FileList) return value.length > 0;
					})
					.test('file size', 'Ukuran file maks 2mb', (value) => {
						if (value instanceof FileList && value.length > 0) {
							return value[0].size < 2 * 1024 * 1024;
						}
						return true;
					}),
			otherwise: (schema) => schema.nullable(),
		}),
		link_youtube: yup.string().when('jenis', {
			is: 'link',
			then: (schema) => schema.required('Tidak boleh kosong'),
			otherwise: (schema) => schema.nullable(),
		}),
		album_id: yup.number().positive('Tidak boleh kosong').required('Tidak boleh kosong'),
	})
	.required();

export const UpdateGalleryItemSchema = yup
	.object({
		judul: yup.string().required('Tidak boleh kosong'),
		jenis: yup.mixed().oneOf(['foto', 'link']),
		foto: yup.mixed().when('jenis', {
			is: 'foto',
			then: (schema) =>
				schema.test('file size', 'Ukuran file maks 2mb', (value) => {
					if (value instanceof FileList && value.length > 0) {
						return value[0].size < 2 * 1024 * 1024;
					}
					return true;
				}),
			otherwise: (schema) => schema.nullable(),
		}),
		link_youtube: yup.string().when('jenis', {
			is: 'link',
			then: (schema) => schema.required('Tidak boleh kosong'),
			otherwise: (schema) => schema.nullable(),
		}),
		album_id: yup.number().positive('Tidak boleh kosong').required('Tidak boleh kosong'),
	})
	.required();

export const AddNewsSchema = yup
	.object({
		judul: yup.string().required('Tidak boleh kosong'),
		konten: yup.string().required('Tidak boleh kosong'),
		gambar_cover: yup
			.mixed()
			.test('required', 'Tidak boleh kosong', (value) => {
				if (value instanceof FileList) return value.length > 0;
			})
			.test('file size', 'Ukuran file maks 2mb', (value) => {
				if (value instanceof FileList && value.length > 0) {
					return value[0].size < 2 * 1024 * 1024;
				}
				return true;
			}),
		kategori_id: yup.number().positive().required('Tidak boleh kosong'),
	})
	.required();

export const UpdateNewsSchema = yup
	.object({
		judul: yup.string().required('Tidak boleh kosong'),
		konten: yup.string().required('Tidak boleh kosong'),
		gambar_cover: yup.mixed().test('file size', 'Ukuran file maks 2mb', (value) => {
			if (value instanceof FileList && value.length > 0) {
				return value[0].size < 2 * 1024 * 1024;
			}
			return true;
		}),
		kategori_id: yup.number().positive().required('Tidak boleh kosong'),
	})
	.required();

export const AddAlbumSchema = yup
	.object({
		nama: yup.string().required('Tidak boleh kosong'),
	})
	.required();

export const UpdateAlbumSchema = yup
	.object({
		nama: yup.string().required('Tidak boleh kosong'),
	})
	.required();

export const AddUnitUsahaSchema = yup
	.object({
		nama: yup.string().required('Tidak boleh kosong'),
		deskripsi: yup.string().required('Tidak boleh kosong'),
		kontak: yup.string().required('Tidak boleh kosong'),
		foto: yup
			.mixed()
			.test('required', 'Tidak boleh kosong', (value) => {
				if (value instanceof FileList) return value.length > 0;
			})
			.test('file size', 'Ukuran file maks 2mb', (value) => {
				if (value instanceof FileList && value.length > 0) {
					return value[0].size < 2 * 1024 * 1024;
				}
				return true;
			}),
		icon: yup.string().required('Tidak boleh kosong'),
	})
	.required();

export const UpdateUnitUsahaSchema = yup
	.object({
		nama: yup.string().required('Tidak boleh kosong'),
		deskripsi: yup.string().required('Tidak boleh kosong'),
		kontak: yup.string().required('Tidak boleh kosong'),
		foto: yup.mixed().test('file size', 'Ukuran file maks 2mb', (value) => {
			if (value instanceof FileList && value.length > 0) {
				return value[0].size < 2 * 1024 * 1024;
			}
			return true;
		}),
		icon: yup.string().required('Tidak boleh kosong'),
	})
	.required();

export const AddUnitUsahaProdukSchema = yup
	.object({
		nama: yup.string().required('Tidak boleh kosong'),
		harga: yup.number().typeError('Harus angka').positive('Harus angka').required('Tidak boleh kosong'),
		deskripsi: yup.string().required('Tidak boleh kosong'),
		gambar: yup
			.mixed()
			.test('required', 'Tidak boleh kosong', (value) => {
				if (value instanceof FileList) return value.length > 0;
			})
			.test('file size', 'Ukuran file maks 2mb', (value) => {
				if (value instanceof FileList && value.length > 0) {
					return value[0].size < 2 * 1024 * 1024;
				}
				return true;
			}),
		unit_usaha_id: yup.number().positive().required('Tidak boleh kosong'),
	})
	.required();

export const UpdateUnitUsahaProdukSchema = yup
	.object({
		nama: yup.string().required('Tidak boleh kosong'),
		harga: yup.number().typeError('Harus angka').positive('Harus angka').required('Tidak boleh kosong'),
		deskripsi: yup.string().required('Tidak boleh kosong'),
		gambar: yup.mixed().test('file size', 'Ukuran file maks 2mb', (value) => {
			if (value instanceof FileList && value.length > 0) {
				return value[0].size < 2 * 1024 * 1024;
			}
			return true;
		}),
	})
	.required();

export const AddStructureSchema = yup
	.object({
		nama: yup.string().required('Tidak boleh kosong'),
		foto: yup
			.mixed()
			.test('required', 'Tidak boleh kosong', (value) => {
				if (value instanceof FileList) return value.length > 0;
			})
			.test('file size', 'Ukuran file maks 2mb', (value) => {
				if (value instanceof FileList && value.length > 0) {
					return value[0].size < 2 * 1024 * 1024;
				}
				return true;
			}),
		jabatan_id: yup.number().positive().required('Tidak boleh kosong'),
	})
	.required();

export const UpdateStructureSchema = yup
	.object({
		nama: yup.string().required('Tidak boleh kosong'),
		foto: yup.mixed().test('file size', 'Ukuran file maks 2mb', (value) => {
			if (value instanceof FileList && value.length > 0) {
				return value[0].size < 2 * 1024 * 1024;
			}
			return true;
		}),
		jabatan_id: yup.number().positive().required('Tidak boleh kosong'),
	})
	.required();

export const UpdateProfileSchema = yup
	.object({
		nama_bumdes: yup.string().required('Tidak boleh kosong'),
		deskripsi: yup.string().required('Tidak boleh kosong'),
		visi: yup.string().required('Tidak boleh kosong'),
		misi: yup.string().required('Tidak boleh kosong'),
		slogan: yup.string().required('Tidak boleh kosong'),
		telp: yup.string().required('Tidak boleh kosong'),
		email: yup.string().required('Tidak boleh kosong'),
		alamat: yup.string().required('Tidak boleh kosong'),
		logo: yup.mixed().test('file size', 'Ukuran file maks 2mb', (value) => {
			if (value instanceof FileList && value.length > 0) {
				return value[0].size < 2 * 1024 * 1024;
			}
			return true;
		}),
		foto_profil: yup.mixed().test('file size', 'Ukuran file maks 2mb', (value) => {
			if (value instanceof FileList && value.length > 0) {
				return value[0].size < 2 * 1024 * 1024;
			}
			return true;
		}),
	})
	.required();

export const AddCarouselSchema = yup
	.object({
		image: yup
			.mixed()
			.test('required', 'Tidak boleh kosong', (value) => {
				if (value instanceof FileList) return value.length > 0;
			})
			.test('file size', 'Ukuran file maks 2mb', (value) => {
				if (value instanceof FileList && value.length > 0) {
					return value[0].size < 2 * 1024 * 1024;
				}
				return true;
			}),
	})
	.required();

export const UpdateCarouselSchema = yup
	.object({
		image: yup.mixed().test('file size', 'Ukuran file maks 2mb', (value) => {
			if (value instanceof FileList && value.length > 0) {
				return value[0].size < 2 * 1024 * 1024;
			}
			return true;
		}),
	})
	.required();
