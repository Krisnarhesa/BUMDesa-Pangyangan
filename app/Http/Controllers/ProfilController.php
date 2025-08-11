<?php

namespace App\Http\Controllers;

use App\Models\Profil;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilController extends Controller
{
  public function index()
  {
    $profil = Profil::first();

    return Inertia::render('Public/Profil/index', [
      'deskripsi' => $profil->deskripsi
    ]);
  }
}
