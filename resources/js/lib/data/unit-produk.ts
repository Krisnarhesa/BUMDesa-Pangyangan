import { route } from 'ziggy-js';
import api from '../api';
import { InferType } from 'yup';
import { AddUnitUsahaProdukSchema } from '../yup/schemas';
import { serialize } from 'object-to-formdata';

type GetUnitUsahaProdukReturnProps = {
	success: boolean;
	message: string;
	data: UnitUsahaProduk[];
};

type PostUnitUsahaProdukReturnProps = {
	success: boolean;
	message: string;
};

// GET produk
export const getUnitUsahaProduk = async (unitId: number) => {
	try {
		const { data } = await api.get<GetUnitUsahaProdukReturnProps>(route('api.products.byUnit', { id: unitId }));
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// POST produk
export const addUnitUsahaProduk = async (data: InferType<typeof AddUnitUsahaProdukSchema>) => {
	const formData = serialize(data);

	if (data.gambar instanceof FileList && data.gambar.length > 0) {
		formData.append('gambar', data.gambar[0]); // ✅ only append the first file
	}

	try {
		const res = await api.post<PostUnitUsahaProdukReturnProps>(route('api.products.store'), formData, {
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
