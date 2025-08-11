<?php

namespace App\Http\Controllers;

use App\Models\Profil;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProfilController extends Controller
{
  public function index()
  {
    return Inertia::render('Admin/Profil/index');
  }

  public function edit($id)
  {
    $profile = Profil::find($id);

    return Inertia::render('Admin/Profil/edit', [
      'id' => $id,
      'nama_bumdes' => $profile->nama_bumdes,
      'deskripsi' => $profile->deskripsi,
      'visi' => $profile->visi,
      'misi' => $profile->misi,
      'slogan' => $profile->slogan,
      'telp' => $profile->telp,
      'email' => $profile->email,
      'alamat' => $profile->alamat,
    ]);
  }
}
