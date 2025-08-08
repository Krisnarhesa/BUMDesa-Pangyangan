<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCarouselController extends Controller
{
  public function index()
  {
    return Inertia::render('Admin/Carousels/index');
  }

  public function create()
  {
    return Inertia::render('Admin/Carousels/create');
  }
}
