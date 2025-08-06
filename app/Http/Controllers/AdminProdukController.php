<?php

namespace App\Http\Controllers;

use App\Models\Product;
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

  public function edit($unitId, $productId)
  {
    $product = Product::find($productId);

    return Inertia::render('Admin/UnitUsaha/Product/edit', [
      'name' => $product->nama,
      'price' => $product->harga,
      'desc' => $product->deskripsi,
      'unitId' => $unitId,
      'productId' => $productId
    ]);
  }
}
