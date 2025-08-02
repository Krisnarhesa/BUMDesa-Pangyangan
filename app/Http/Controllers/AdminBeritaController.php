<?php

namespace App\Http\Controllers;

use App\Models\KategoriBerita;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminBeritaController extends Controller
{
  public function index()
  {
    return Inertia::render('Admin/Publikasi/Berita/index');
  }

  public function create()
  {
    $categories = KategoriBerita::select('id', 'nama')->get();

    return Inertia::render('Admin/Publikasi/Berita/create', [
      'categories' => $categories
    ]);
  }
}
