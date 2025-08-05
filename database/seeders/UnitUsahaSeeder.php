<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitUsahaSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('unit_usaha')->insert([
      [
        'id' => 1,
        'nama' => 'simpan pinjam',
        'kontak' => '081123123123',
        'deskripsi' => 'Unit usaha simpan pinjam berfokus pada layanan simpanan dan pinjaman untuk anggota, membantu mereka mengelola keuangan secara lebih mudah dan aman.',
        'foto' => '/assets/test.jpg',
      ],
      [
        'id' => 2,
        'nama' => 'perdagangan',
        'kontak' => '081123123123',
        'deskripsi' => 'Unit usaha perdagangan bergerak dalam aktivitas jual beli barang, menciptakan peluang usaha dan memperluas jaringan pasar bagi anggota.',
        'foto' => '/assets/test.jpg',
      ],
      [
        'id' => 3,
        'nama' => 'jasa',
        'kontak' => '081123123123',
        'deskripsi' => 'Unit usaha jasa menyediakan layanan profesional untuk memenuhi kebutuhan anggota dan masyarakat, mendukung kualitas hidup yang lebih baik.',
        'foto' => '/assets/test.jpg',
      ],
      [
        'id' => 4,
        'nama' => 'pengolahan sampah',
        'kontak' => '081123123123',
        'deskripsi' => 'Unit usaha pengolahan sampah berfokus pada pengelolaan limbah menjadi produk yang lebih bermanfaat, mendukung kelestarian lingkungan.',
        'foto' => '/assets/test.jpg',
      ],
      [
        'id' => 5,
        'nama' => 'ketahanan pangan',
        'kontak' => '081123123123',
        'deskripsi' => 'Unit usaha ketahanan pangan bertujuan untuk menyediakan bahan pangan berkualitas dan menjaga ketersediaannya secara berkelanjutan.',
        'foto' => '/assets/test.jpg',
      ],
      [
        'id' => 6,
        'nama' => 'pariwisata',
        'kontak' => '081123123123',
        'deskripsi' => 'Unit usaha pariwisata mengelola destinasi dan layanan wisata yang menarik, mendukung ekonomi lokal dan memperkenalkan potensi daerah.',
        'foto' => '/assets/test.jpg',
      ],
    ]);
  }
}
