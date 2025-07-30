<?php

namespace App\Http\Controllers;

use App\Models\Berita;
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
    $albumItems = [
      [
        'judul' => 'Gambar 1',
        'jenis' => 'foto',
        'foto' => '/assets/test.jpg',
        'link_youtube' => null,
        'album_id' => 1
      ],
      [
        'judul' => 'Video 1',
        'jenis' => 'link',
        'foto' => null,
        'link_youtube' => 'https://www.youtube.com/embed/3KR8_igDs1Y',
        'album_id' => 1
      ],
      [
        'judul' => 'Gambar 2',
        'jenis' => 'foto',
        'foto' => '/assets/test.jpg',
        'link_youtube' => null,
        'album_id' => 1
      ],
    ];

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
