type Album = {
	id: number;
	nama: string;
};

type AlbumItem = {
	id: number;
	judul: string;
	jenis: string;
	foto: string;
	link_youtube: string;
	created_at: string;
};

type News = {
	id: number;
	judul: string;
	konten: string;
	gambar_cover: string;
	kategori_id: number;
	kategori_nama: string;
	created_at: string;
};

type NewsCategory = {
	id: number;
	nama: string;
};

type UnitUsaha = {
	id: number;
	nama: string;
	deskripsi: string;
	kontak: string;
	foto: string;
	icon: string;
};

type UnitUsahaProduk = {
	id: number;
	nama: string;
	harga: number;
	deskripsi: string;
	gambar: string;
	unit_usaha_id: number;
};

type Structure = {
	id: number;
	nama: string;
	foto: string;
	jabatan: string;
};

type JobTitle = {
	id: number;
	nama: string;
};

type Profile = {
	id: number;
	nama_bumdes: string;
	deskripsi: string;
	visi: string;
	misi: string;
	slogan: string;
	logo: string;
	telp: string;
	email: string;
	alamat: string;
};

type Carousel = {
	id: number;
	image: string;
};
