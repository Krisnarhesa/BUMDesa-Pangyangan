<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitUsahaController extends Controller
{
  public function index()
  {
    return Inertia::render('Public/UnitUsaha/index');
  }

  public function show(string $id)
  {
    // Query here
    $title = 'simpan pinjam';
    $desc = 'lorem ipsum';
    $imgUrl = '/assets/test.jpg';
    $products = [
      ['id' => 1, 'nama' => 'produk 1', 'harga' => 10000, 'imgUrl' => '/assets/test.jpg'],
      ['id' => 2, 'nama' => 'produk 2', 'harga' => 15000, 'imgUrl' => '/assets/test.jpg'],
      ['id' => 3, 'nama' => 'produk 3', 'harga' => 20000, 'imgUrl' => '/assets/test.jpg'],
      ['id' => 4, 'nama' => 'produk 4', 'harga' => 25000, 'imgUrl' => '/assets/test.jpg'],
    ];

    return Inertia::render('Public/UnitUsaha/show', [
      'title' => $title,
      'desc' => $desc,
      'imgUrl' => $imgUrl,
      'products' => $products
    ]);
  }
}
