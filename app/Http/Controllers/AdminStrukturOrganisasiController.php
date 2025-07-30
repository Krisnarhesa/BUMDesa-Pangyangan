<?php

namespace App\Http\Controllers;

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
    return Inertia::render('Admin/StrukturOrganisasi/create');
  }
}
