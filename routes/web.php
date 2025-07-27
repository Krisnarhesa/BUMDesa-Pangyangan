<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UnitUsahaController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', [HomeController::class, 'index']);

Route::get('/struktur-organisasi/bagan', [HomeController::class, 'strukturOrganisasi'])->name('struktur.bagan');
Route::get('/struktur-organisasi/bendahara', [HomeController::class, 'bendahara'])->name('struktur.bendahara');
Route::get('/struktur-organisasi/sekretaris', [HomeController::class, 'sekretaris'])->name('struktur.sekretaris');
Route::get('/struktur-organisasi/badan-pengawas', [HomeController::class, 'pengawas'])->name('struktur.pengawas');
Route::get('/struktur-organisasi/penasihat', [HomeController::class, 'penasihat'])->name('struktur.penasihat');
Route::get('/struktur-organisasi/direktur', [HomeController::class, 'direktur'])->name('struktur.direktur');

Route::get('/unit-usaha', [UnitUsahaController::class, 'index'])->name('unit_usaha.index');
Route::get('/unit-usaha/{id}/{slug}', [UnitUsahaController::class, 'show'])->name('unit_usaha.show');

Route::get('/program-kerja', [HomeController::class, 'programKerja']);
Route::get('/', [HomeController::class, 'index']);

Route::get('/admin', function () {
  return Inertia::render('Admin/Dashboard');
});
