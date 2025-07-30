<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Berita;
use Carbon\Carbon;

class BeritaSeeder extends Seeder
{
  public function run(): void
  {
    $beritaData = [
      [
        'judul' => 'Pemerintah Desa Umumkan Program Baru',
        'konten' => 'Pemerintah desa mengumumkan program baru untuk mendukung kesejahteraan masyarakat.',
        'gambar_cover' => '/images/berita/program-baru.jpg',
        'tanggal' => Carbon::now()->subDays(10),
        'kategori_id' => 1, // Berita Desa
      ],
      [
        'judul' => 'Pengumuman Jadwal Posyandu Bulan Ini',
        'konten' => 'Posyandu akan dilaksanakan sesuai jadwal berikut, harap warga hadir tepat waktu.',
        'gambar_cover' => '/images/berita/posyandu.jpg',
        'tanggal' => Carbon::now()->subDays(9),
        'kategori_id' => 2, // Pengumuman
      ],
      [
        'judul' => 'BUMDes Menggelar Rapat Tahunan',
        'konten' => 'Rapat tahunan BUMDes membahas evaluasi usaha dan rencana pengembangan.',
        'gambar_cover' => '/images/berita/rapat-bumdes.jpg',
        'tanggal' => Carbon::now()->subDays(8),
        'kategori_id' => 3, // Kegiatan BUMDes
      ],
      [
        'judul' => 'Pelatihan UMKM Untuk Warga Desa',
        'konten' => 'Pelatihan UMKM diberikan agar warga memiliki keterampilan bisnis dan pemasaran.',
        'gambar_cover' => '/images/berita/pelatihan-umkm.jpg',
        'tanggal' => Carbon::now()->subDays(7),
        'kategori_id' => 4, // Pelatihan
      ],
      [
        'judul' => 'Laporan Keuangan Semester Pertama',
        'konten' => 'Laporan keuangan semester pertama kini tersedia untuk transparansi publik.',
        'gambar_cover' => '/images/berita/laporan-keuangan.jpg',
        'tanggal' => Carbon::now()->subDays(6),
        'kategori_id' => 5, // Laporan Keuangan
      ],
      [
        'judul' => 'Peresmian Jalan Baru Desa Pangyangan',
        'konten' => 'Jalan baru telah diresmikan untuk meningkatkan aksesibilitas warga desa.',
        'gambar_cover' => '/images/berita/jalan-baru.jpg',
        'tanggal' => Carbon::now()->subDays(5),
        'kategori_id' => 1,
      ],
      [
        'judul' => 'Pengumuman Libur Hari Raya',
        'konten' => 'Libur hari raya akan berlangsung selama 3 hari, layanan administrasi tutup.',
        'gambar_cover' => '/images/berita/libur.jpg',
        'tanggal' => Carbon::now()->subDays(4),
        'kategori_id' => 2,
      ],
      [
        'judul' => 'BUMDes Luncurkan Produk Baru',
        'konten' => 'BUMDes meluncurkan produk baru untuk mendukung ekonomi desa.',
        'gambar_cover' => '/images/berita/produk-baru.jpg',
        'tanggal' => Carbon::now()->subDays(3),
        'kategori_id' => 3,
      ],
      [
        'judul' => 'Pelatihan Digital Marketing Untuk Pemuda',
        'konten' => 'Pemuda desa mengikuti pelatihan digital marketing untuk memperluas pemasaran.',
        'gambar_cover' => '/images/berita/digital-marketing.jpg',
        'tanggal' => Carbon::now()->subDays(2),
        'kategori_id' => 4,
      ],
      [
        'judul' => 'Laporan Realisasi Anggaran 2024',
        'konten' => 'Realisasi anggaran tahun 2024 dipublikasikan untuk akuntabilitas.',
        'gambar_cover' => '/images/berita/realisasi-anggaran.jpg',
        'tanggal' => Carbon::now()->subDay(),
        'kategori_id' => 5,
      ],
    ];

    foreach ($beritaData as $data) {
      Berita::create($data);
    }
  }
}
