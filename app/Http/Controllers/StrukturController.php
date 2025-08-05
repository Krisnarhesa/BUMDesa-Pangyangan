<?php

namespace App\Http\Controllers;

use App\Models\Struktur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StrukturController extends Controller
{
  public function show($jabatan)
  {
    $strukturs = Struktur::with('jabatan')
      ->whereHas('jabatan', function ($query) use ($jabatan) {
        $query->where('nama', $jabatan);
      })
      ->get();

    if ($strukturs->count() === 0) {
      return Inertia::render('Public/Struktur/empty');
    }

    if ($strukturs->count() > 1) {
      $strukturs->transform(function ($item) {
        return [
          'id' => $item->id,
          'nama' => $item->nama,
          'foto' => $item->foto,
          'jabatan' => $item->jabatan->nama,
        ];
      });

      return Inertia::render('Public/Struktur/multi', [
        'supervisors' => $strukturs
      ]);
    }

    $struktur = $strukturs->first();

    return Inertia::render('Public/Struktur/show', [
      'name' => $struktur->nama,
      'title' => $struktur->jabatan->nama,
      'imgUrl' => $struktur->foto
    ]);
  }
}
