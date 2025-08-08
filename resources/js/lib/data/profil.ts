import { route } from 'ziggy-js';
import api from '../api';
import { InferType } from 'yup';
import { UpdateProfileSchema } from '../yup/schemas';
import { serialize } from 'object-to-formdata';

type GetProfileReturnProps = {
	success: boolean;
	message: string;
	data: Profile;
};

type UpdateProfileReturnProps = {
	success: boolean;
	message: string;
};

// GET profil
export const getProfile = async () => {
	try {
		const { data } = await api.get<GetProfileReturnProps>(route('api.profil.index'));
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// UPDATE profil
export const updateProfile = async (id: number, data: InferType<typeof UpdateProfileSchema>) => {
	const formData = serialize(data);

	if (data.logo instanceof FileList && data.logo.length > 0) {
		formData.append('logo', data.logo[0]); // ✅ only append the first file
	}

	try {
		const res = await api.post<UpdateProfileReturnProps>(route('api.profil.update', { id: id }), formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return res.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
