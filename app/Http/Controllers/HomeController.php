<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
  public function index()
  {
    return Inertia::render('Public/Home', [
      'title' => 'Halo dari Laravel',
      'description' => 'Ini adalah halaman Home yang dirender dari controller.'
    ]);
  }

  public function strukturOrganisasi()
  {
    return Inertia::render('Public/Struktur/index', [
      'title' => 'Struktur organisasi',
      'description' => 'Struktur organisasi BUMDes Dwi Buana Amertha.'
    ]);
  }

  public function direktur()
  {
    return Inertia::render('Public/Struktur/Direktur', [
      'title' => 'Direktur',
      'description' => 'Direktur BUMDes Dwi Buana Amertha.'
    ]);
  }

  public function penasihat()
  {
    return Inertia::render('Public/Struktur/Penasihat', [
      'title' => 'Penasihat',
      'description' => 'Penasihat BUMDes Dwi Buana Amertha.'
    ]);
  }

  public function pengawas()
  {
    return Inertia::render('Public/Struktur/Pengawas', [
      'title' => 'Badan pengawas',
      'description' => 'Badan pengawas BUMDes Dwi Buana Amertha.'
    ]);
  }

  public function sekretaris()
  {
    return Inertia::render('Public/Struktur/Sekretaris', [
      'title' => 'Sekretaris',
      'description' => 'Sekretaris BUMDes Dwi Buana Amertha.'
    ]);
  }

  public function bendahara()
  {
    return Inertia::render('Public/Struktur/Bendahara', [
      'title' => 'Bendahara',
      'description' => 'Bendahara BUMDes Dwi Buana Amertha.'
    ]);
  }

  public function unitUsaha()
  {
    return Inertia::render('Public/UnitUsaha', [
      'title' => 'Unit usaha',
      'description' => 'Unit usaha BUMDes Dwi Buana Amertha.'
    ]);
  }

  public function programKerja()
  {
    return Inertia::render('Public/ProgramKerja', [
      'title' => 'Program kerja',
      'description' => 'Program kerja BUMDes Dwi Buana Amertha.'
    ]);
  }
}
