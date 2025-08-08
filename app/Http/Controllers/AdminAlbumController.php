<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminAlbumController extends Controller
{
  public function index()
  {
    return Inertia::render('Admin/Publikasi/Album/index');
  }

  public function create()
  {
    return Inertia::render('Admin/Publikasi/Album/create');
  }

  public function edit($id)
  {
    $album = Album::find($id);

    return Inertia::render('Admin/Publikasi/Album/edit', [
      'id' => $id,
      'name' => $album->nama
    ]);
  }
}
