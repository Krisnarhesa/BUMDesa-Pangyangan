<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'title' => 'Halo dari Laravel',
            'description' => 'Ini adalah halaman Home yang dirender dari controller.'
        ]);
    }
}
