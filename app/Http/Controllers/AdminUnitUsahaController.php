<?php

namespace App\Http\Controllers;

use App\Models\UnitUsaha;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUnitUsahaController extends Controller
{
  public function index()
  {
    return Inertia::render('Admin/UnitUsaha/index');
  }

  public function create()
  {
    return Inertia::render('Admin/UnitUsaha/create');
  }

  public function edit($id)
  {
    $unit = UnitUsaha::find($id);

    return Inertia::render('Admin/UnitUsaha/edit', [
      'id' => $id,
      'name' => $unit->nama,
      'desc' => $unit->deskripsi,
      'contact' => $unit->kontak,
    ]);
  }
}
