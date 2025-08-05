<?php

namespace App\Http\Controllers;

use App\Models\UnitUsaha;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitUsahaController extends Controller
{
  public function index()
  {
    return Inertia::render('Public/UnitUsaha/index');
  }

  public function show(string $id)
  {
    // Query here
    $unit = UnitUsaha::with('products')->find($id);

    return Inertia::render('Public/UnitUsaha/show', [
      'name' => $unit->nama,
      'contact' => $unit->kontak,
      'desc' => $unit->deskripsi,
      'imgUrl' => $unit->foto,
      'products' => $unit->products
    ]);
  }
}
