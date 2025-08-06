<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Galeri;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminGaleriController extends Controller
{
  public function index()
  {
    return Inertia::render('Admin/Publikasi/Galeri/index');
  }

  public function create()
  {
    $albums = Album::select('id', 'nama')->get();

    return Inertia::render('Admin/Publikasi/Galeri/create', [
      'albums' => $albums
    ]);
  }

  public function edit($id)
  {
    $albums = Album::select('id', 'nama')->get();
    $item = Galeri::find($id);

    return Inertia::render('Admin/Publikasi/Galeri/edit', [
      'albums' => $albums,
      'itemId' => $id,
      'albumId' => $item->album_id,
      'title' => $item->judul,
      'type' => $item->jenis,
      'link' => $item->link_youtube ?? '',
    ]);
  }
}
