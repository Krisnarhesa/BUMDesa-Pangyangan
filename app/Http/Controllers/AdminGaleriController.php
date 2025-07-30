<?php

namespace App\Http\Controllers;

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
    return Inertia::render('Admin/Publikasi/Galeri/create');
  }
}
