<?php

namespace App\Http\Controllers;

use App\Models\Album;
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
}
