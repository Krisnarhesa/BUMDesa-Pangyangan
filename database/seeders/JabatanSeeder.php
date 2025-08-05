<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Jabatan;

class JabatanSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $jabatan = [
      ['nama' => 'bagan'],
      ['nama' => 'direktur'],
      ['nama' => 'pengawas'],
      ['nama' => 'penasihat'],
      ['nama' => 'sekretaris'],
      ['nama' => 'bendahara'],
    ];

    Jabatan::insert($jabatan);
  }
}
