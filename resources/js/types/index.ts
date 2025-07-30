type UnitUsahaProduct = {
	id: number;
	nama: string;
	imgUrl: string;
	harga: number;
};

type Album = {
	id: number;
	nama: string;
};

type AlbumItem = {
	id: number;
	nama: string;
	jenis: string;
	foto: string;
	link_youtube: string;
	createdAt: string;
};

type News = {
	id: number;
	judul: string;
	konten: string;
	gambar_cover: string;
	tanggal: string;
	kategori_id: number;
};
