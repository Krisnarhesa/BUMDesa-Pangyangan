<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Galeri;
use App\Models\Profil;
use App\Models\UnitUsaha;
use Inertia\Inertia;

class HomeController extends Controller
{
  public function index()
  {
    $berita = Berita::latest()->take(2)->get();
    $galeri = Galeri::latest()->take(4)->get();
    $profil = Profil::first();
    $unit = UnitUsaha::all();

    return Inertia::render('Public/Home', [
      'title' => 'Halo dari Laravel',
      'description' => 'Ini adalah halaman Home yang dirender dari controller.',
      'berita' => $berita,
      'galeri' => $galeri,
      'visi' => $profil->visi,
      'misi' => $profil->misi,
      'unit' => $unit
    ]);
  }
}
