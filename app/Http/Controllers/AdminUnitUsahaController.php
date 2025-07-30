<?php

namespace App\Http\Controllers;

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
}
