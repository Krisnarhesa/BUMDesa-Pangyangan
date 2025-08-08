<?php

namespace App\Http\Controllers;

use App\Models\Berita;
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

  public function edit($id)
  {
    $categories = KategoriBerita::select('id', 'nama')->get();
    $news = Berita::find($id);

    return Inertia::render('Admin/Publikasi/Berita/edit', [
      'categories' => $categories,
      'newsId' => $id,
      'title' => $news->judul,
      'content' => $news->konten,
      'categoryId' => $news->kategori_id,
    ]);
  }
}
