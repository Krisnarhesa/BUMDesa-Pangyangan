<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProdukController extends Controller
{
  public function index($id)
  {
    return Inertia::render('Admin/UnitUsaha/Product/index', [
      'id' => $id
    ]);
  }

  public function create($id)
  {
    return Inertia::render('Admin/UnitUsaha/Product/create', [
      'id' => $id
    ]);
  }
}
