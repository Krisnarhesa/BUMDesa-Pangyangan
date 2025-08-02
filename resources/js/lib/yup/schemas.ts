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
		album_id: yup.number().positive().required('Tidak boleh kosong'),
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
