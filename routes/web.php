<?php

use App\Http\Controllers\AdminBeritaController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminGaleriController;
use App\Http\Controllers\AdminStrukturOrganisasiController;
use App\Http\Controllers\AdminUnitUsahaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PublikasiController;
use App\Http\Controllers\UnitUsahaController;

Route::get('/', [HomeController::class, 'index']);

Route::get('/publikasi/galeri', [PublikasiController::class, 'galeriIndex'])->name('publikasi.galeri.index');
Route::get('/publikasi/galeri/{id}/{slug}', [PublikasiController::class, 'galeriShow'])->name('publikasi.galeri.show');
Route::get('/publikasi/berita', [PublikasiController::class, 'beritaIndex'])->name('publikasi.berita.index');
Route::get('/publikasi/berita/{id}/{slug}', [PublikasiController::class, 'beritaShow'])->name('publikasi.berita.show');

Route::get('/struktur-organisasi/bagan', [HomeController::class, 'strukturOrganisasi'])->name('struktur.bagan');
Route::get('/struktur-organisasi/bendahara', [HomeController::class, 'bendahara'])->name('struktur.bendahara');
Route::get('/struktur-organisasi/sekretaris', [HomeController::class, 'sekretaris'])->name('struktur.sekretaris');
Route::get('/struktur-organisasi/badan-pengawas', [HomeController::class, 'pengawas'])->name('struktur.pengawas');
Route::get('/struktur-organisasi/penasihat', [HomeController::class, 'penasihat'])->name('struktur.penasihat');
Route::get('/struktur-organisasi/direktur', [HomeController::class, 'direktur'])->name('struktur.direktur');

Route::get('/unit-usaha', [UnitUsahaController::class, 'index'])->name('unit_usaha.index');
Route::get('/unit-usaha/{id}/{slug}', [UnitUsahaController::class, 'show'])->name('unit_usaha.show');

Route::get('/program-kerja', [HomeController::class, 'programKerja']);

Route::get('/admin/login', [AdminController::class, 'login'])->name('admin.login');
Route::prefix('admin')->name('admin.')->group(function () {
  Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
  Route::get('/publikasi/galeri', [AdminGaleriController::class, 'index'])->name('galeri.index');
  Route::get('/publikasi/galeri/create', [AdminGaleriController::class, 'create'])->name('galeri.create');
  Route::get('/publikasi/berita', [AdminBeritaController::class, 'index'])->name('berita.index');
  Route::get('/publikasi/berita/create', [AdminBeritaController::class, 'create'])->name('berita.create');
  Route::get('/unit-usaha', [AdminUnitUsahaController::class, 'index'])->name('unit_usaha.index');
  Route::get('/unit-usaha/create', [AdminUnitUsahaController::class, 'create'])->name('unit_usaha.create');
  Route::get('/struktur-organisasi', [AdminStrukturOrganisasiController::class, 'index'])->name('struktur_organisasi.index');
  Route::get('/struktur-organisasi/create', [AdminStrukturOrganisasiController::class, 'create'])->name('struktur_organisasi.create');
});
