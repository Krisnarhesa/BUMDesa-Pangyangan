import { route } from 'ziggy-js';
import api from '../api';
import { InferType } from 'yup';
import { AddUnitUsahaSchema, UpdateUnitUsahaSchema } from '../yup/schemas';
import { serialize } from 'object-to-formdata';

type GetUnitUsahaReturnProps = {
	success: boolean;
	message: string;
	data: UnitUsaha[];
};

type PostUnitUsahaReturnProps = {
	success: boolean;
	message: string;
};

type UpdateUnitUsahaReturnProps = {
	success: boolean;
	message: string;
};

type DeleteUnitUsahaReturnProps = {
	success: boolean;
	message: string;
};

// GET unit
export const getUnitUsaha = async () => {
	try {
		const { data } = await api.get<GetUnitUsahaReturnProps>(route('api.unit.index'));
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// POST unit
export const addUnitUsaha = async (data: InferType<typeof AddUnitUsahaSchema>) => {
	const formData = serialize(data);

	if (data.foto instanceof FileList && data.foto.length > 0) {
		formData.append('foto', data.foto[0]); // ✅ only append the first file
	}

	try {
		const res = await api.post<PostUnitUsahaReturnProps>(route('api.unit.store'), formData, {
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

// UPDATE unit
export const updateUnit = async (id: number, data: InferType<typeof UpdateUnitUsahaSchema>) => {
	const formData = serialize(data);

	if (data.foto instanceof FileList && data.foto.length > 0) {
		formData.append('foto', data.foto[0]); // ✅ only append the first file
	}

	try {
		const res = await api.post<UpdateUnitUsahaReturnProps>(route('api.unit.update', { id: id }), formData, {
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

// DELETE unit
export const deleteUnit = async (id: number) => {
	try {
		const { data } = await api.delete<DeleteUnitUsahaReturnProps>(route('api.unit.destroy', { id: id }));

		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
