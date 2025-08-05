<?php

namespace App\Http\Controllers;

use App\Models\Jabatan;
use App\Models\Struktur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminStrukturOrganisasiController extends Controller
{
  public function index()
  {
    return Inertia::render('Admin/StrukturOrganisasi/index');
  }

  public function create()
  {
    $titles = Jabatan::all();
    return Inertia::render('Admin/StrukturOrganisasi/create', [
      'titles' => $titles
    ]);
  }

  public function edit($id)
  {
    $struktur = Struktur::find($id);
    $titles = Jabatan::all();

    return Inertia::render('Admin/StrukturOrganisasi/edit', [
      'id' => $id,
      'name' => $struktur->nama,
      'titleId' => $struktur->jabatan_id,
      'titles' => $titles
    ]);
  }
}
