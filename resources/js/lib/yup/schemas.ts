import * as yup from 'yup';

export const AddGalleryItemSchema = yup
	.object({
		judul: yup.string().required('Tidak boleh kosong'),
		jenis: yup.mixed().oneOf(['foto', 'link']),
		foto: yup.mixed().when('jenis', {
			is: 'foto',
			then: (schema) =>
				schema.test('required', 'Tidak boleh kosong', (value) => {
					if (value instanceof FileList) return value.length > 0;
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
		gambar_cover: yup.mixed().test('required', 'Tidak boleh kosong', (value) => {
			if (value instanceof FileList) return value.length > 0;
		}),
		kategori_id: yup.number().positive().required('Tidak boleh kosong'),
	})
	.required();

export const AddAlbumSchema = yup
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
			.required(),
	})
	.required();

export const AddUnitUsahaProdukSchema = yup
	.object({
		nama: yup.string().required('Tidak boleh kosong'),
		harga: yup.number().positive().required('Tidak boleh kosong'),
		deskripsi: yup.string().required('Tidak boleh kosong'),
		gambar: yup.mixed().test('required', 'Tidak boleh kosong', (value) => {
			if (value instanceof FileList) return value.length > 0;
		}),
		unit_usaha_id: yup.number().positive().required('Tidak boleh kosong'),
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
			.required(),
		jabatan_id: yup.number().positive().required('Tidak boleh kosong'),
	})
	.required();

export const UpdateStructureSchema = yup
	.object({
		nama: yup.string().required('Tidak boleh kosong'),
		foto: yup
			.mixed()
			.test('file size', 'Ukuran file maks 2mb', (value) => {
				if (value instanceof FileList && value.length > 0) {
					return value[0].size < 2 * 1024 * 1024;
				}
				return true;
			})
			.nullable(),
		jabatan_id: yup.number().positive().required('Tidak boleh kosong'),
	})
	.required();
