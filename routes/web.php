<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

Route::get('/struktur-organisasi/bendahara', [HomeController::class, 'bendahara'])->name('struktur.bendahara');
Route::get('/struktur-organisasi/sekretaris', [HomeController::class, 'sekretaris'])->name('struktur.sekretaris');
Route::get('/struktur-organisasi/badan-pengawas', [HomeController::class, 'pengawas'])->name('struktur.pengawas');
Route::get('/struktur-organisasi/penasihat', [HomeController::class, 'penasihat'])->name('struktur.penasihat');
Route::get('/struktur-organisasi/direktur', [HomeController::class, 'direktur'])->name('struktur.direktur');
Route::get('/struktur-organisasi', [HomeController::class, 'strukturOrganisasi']);
Route::get('/unit-usaha', [HomeController::class, 'unitUsaha']);
Route::get('/program-kerja', [HomeController::class, 'programKerja']);
Route::get('/', [HomeController::class, 'index']);

Route::get('/admin', function () {
  return Inertia::render('Admin/Dashboard');
});
