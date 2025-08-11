<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Galeri;
use App\Models\UnitUsaha;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
  public function login()
  {
    return Inertia::render('Admin/Login');
  }

  public function dashboard()
  {
    $unitUsahaCount = UnitUsaha::count();
    $galeriCount = Galeri::count();
    $beritaCount = Berita::count();

    return Inertia::render('Admin/Dashboard', [
      'unitUsahaCount' => $unitUsahaCount,
      'galeriCount' => $galeriCount,
      'beritaCount' => $beritaCount
    ]);
  }
}
