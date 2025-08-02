<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Galeri;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublikasiController extends Controller
{
  public function galeriIndex()
  {
    return Inertia::render('Public/Publikasi/Galeri/index');
  }

  public function galeriShow(string $id)
  {
    // Query here
    $albumItems = Galeri::with('album')
      ->where('album_id', $id)
      ->get();

    return Inertia::render('Public/Publikasi/Galeri/show', [
      'albumItems' => $albumItems,
    ]);
  }

  public function beritaIndex()
  {
    $berita = Berita::orderBy('created_at', 'desc')->get();

    return Inertia::render('Public/Publikasi/Berita/index', [
      'berita' => $berita
    ]);
  }

  public function beritaShow($id)
  {
    $berita = Berita::find($id);

    return Inertia::render('Public/Publikasi/Berita/show', [
      'berita' => $berita
    ]);
  }
}
