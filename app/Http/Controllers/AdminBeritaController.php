<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminBeritaController extends Controller
{
  public function index()
  {
    return Inertia::render('Admin/publikasi/Berita/index');
  }

  public function create()
  {
    return Inertia::render('Admin/publikasi/Berita/create');
  }
}
