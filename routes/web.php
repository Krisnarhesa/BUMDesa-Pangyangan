<?php

use App\Http\Controllers\AdminAlbumController;
use App\Http\Controllers\AdminBeritaController;
use App\Http\Controllers\AdminCarouselController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminGaleriController;
use App\Http\Controllers\AdminProdukController;
use App\Http\Controllers\AdminProfilController;
use App\Http\Controllers\AdminStrukturOrganisasiController;
use App\Http\Controllers\AdminUnitUsahaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PublikasiController;
use App\Http\Controllers\StrukturController;
use App\Http\Controllers\UnitUsahaController;

Route::get('/', [HomeController::class, 'index']);

// Public pages

// Galeri
Route::get('/publikasi/galeri', [PublikasiController::class, 'galeriIndex'])->name('publikasi.galeri.index');
Route::get('/publikasi/galeri/{id}/{slug}', [PublikasiController::class, 'galeriShow'])->name('publikasi.galeri.show');

// Berita
Route::get('/publikasi/berita', [PublikasiController::class, 'beritaIndex'])->name('publikasi.berita.index');
Route::get('/publikasi/berita/{id}/{slug}', [PublikasiController::class, 'beritaShow'])->name('publikasi.berita.show');

// Struktur organisasi
Route::get('/struktur-organisasi/{jabatan}', [StrukturController::class, 'show'])->name('struktur.show');
Route::get('/struktur-organisasi/bagan', [HomeController::class, 'strukturOrganisasi'])->name('struktur.bagan');
Route::get('/struktur-organisasi/bendahara', [HomeController::class, 'bendahara'])->name('struktur.bendahara');
Route::get('/struktur-organisasi/sekretaris', [HomeController::class, 'sekretaris'])->name('struktur.sekretaris');
Route::get('/struktur-organisasi/badan-pengawas', [HomeController::class, 'pengawas'])->name('struktur.pengawas');
Route::get('/struktur-organisasi/penasihat', [HomeController::class, 'penasihat'])->name('struktur.penasihat');
Route::get('/struktur-organisasi/direktur', [HomeController::class, 'direktur'])->name('struktur.direktur');

// Unit usaha
Route::get('/unit-usaha', [UnitUsahaController::class, 'index'])->name('unit_usaha.index');
Route::get('/unit-usaha/{id}/{slug}', [UnitUsahaController::class, 'show'])->name('unit_usaha.show');

// Program kerja
Route::get('/program-kerja', [HomeController::class, 'programKerja']);


// Login admin
Route::get('/admin/login', [AdminController::class, 'login'])->name('admin.login');

// Protected admin pages
Route::prefix('admin')->name('admin.')->group(function () {
  Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
  // Galeri
  Route::get('/publikasi/galeri', [AdminGaleriController::class, 'index'])->name('galeri.index');
  Route::get('/publikasi/galeri/create', [AdminGaleriController::class, 'create'])->name('galeri.create');
  Route::get('/publikasi/galeri/{id}/edit', [AdminGaleriController::class, 'edit'])->name('galeri.edit');

  // Album
  Route::get('/publikasi/albums', [AdminAlbumController::class, 'index'])->name('album.index');
  Route::get('/publikasi/albums/create', [AdminAlbumController::class, 'create'])->name('album.create');
  Route::get('/publikasi/albums/{id}/edit', [AdminAlbumController::class, 'edit'])->name('album.edit');

  // Berita
  Route::get('/publikasi/berita', [AdminBeritaController::class, 'index'])->name('berita.index');
  Route::get('/publikasi/berita/create', [AdminBeritaController::class, 'create'])->name('berita.create');
  Route::get('/publikasi/berita/{id}/edit', [AdminBeritaController::class, 'edit'])->name('berita.edit');

  // Unit usaha
  Route::get('/unit-usaha', [AdminUnitUsahaController::class, 'index'])->name('unit.index');
  Route::get('/unit-usaha/create', [AdminUnitUsahaController::class, 'create'])->name('unit.create');
  Route::get('/unit-usaha/{id}/edit', [AdminUnitUsahaController::class, 'edit'])->name('unit.edit');
  Route::get('/unit-usaha/{id}/produk', [AdminProdukController::class, 'index'])->name('unit.produk.index');
  Route::get('/unit-usaha/{id}/produk/create', [AdminProdukController::class, 'create'])->name('unit.produk.create');
  Route::get('/unit-usaha/{unitId}/produk/{productId}/edit', [AdminProdukController::class, 'edit'])->name('unit.produk.edit');

  // Struktur organisasi
  Route::get('/struktur-organisasi', [AdminStrukturOrganisasiController::class, 'index'])->name('struktur.index');
  Route::get('/struktur-organisasi/create', [AdminStrukturOrganisasiController::class, 'create'])->name('struktur.create');
  Route::get('/struktur-organisasi/{id}/edit', [AdminStrukturOrganisasiController::class, 'edit'])->name('struktur.edit');

  // Profil
  Route::get('/profil', [AdminProfilController::class, 'index'])->name('profil.index');
  Route::get('/profil/{id}/edit', [AdminProfilController::class, 'edit'])->name('profil.edit');

  // Carousels
  Route::get('/carousels', [AdminCarouselController::class, 'index'])->name('carousels.index');
  Route::get('/carousels/create', [AdminCarouselController::class, 'create'])->name('carousels.create');
});
