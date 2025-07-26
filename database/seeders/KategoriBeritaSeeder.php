<?php

namespace Database\Seeders;

use App\Models\KategoriBerita;
use Illuminate\Database\Seeder;

class KategoriBeritaSeeder extends Seeder
{
    public function run()
    {
        $kategoris = [
            'Berita Desa',
            'Pengumuman',
            'Kegiatan BUMDes',
            'Pelatihan',
            'Laporan Keuangan'
        ];

        foreach ($kategoris as $kategori) {
            KategoriBerita::create(['nama' => $kategori]);
        }
    }
}