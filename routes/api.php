<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthApiController;
use App\Http\Controllers\{
  HomeController,
  ProfilApiController,
  StrukturApiController,
  UnitUsahaApiController,
  BeritaApiController,
  KategoriBeritaApiController,
  GaleriApiController,
  DownloadApiController,
  SettingApiController,
  AlbumApiController,
  UserApiController,
  DashboardApiController,
  ProductApiController,
  JabatanApiController,
  CarouselApiController
};

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('api.home');
Route::post('/login', [AuthApiController::class, 'login'])->name('api.login');
Route::get('/album', [AlbumApiController::class, 'index'])->name('api.album.index');
Route::get('/unit-usaha', [UnitUsahaApiController::class, 'index'])->name('api.unit.index');
Route::get('/profil', [ProfilApiController::class, 'index'])->name('api.profil.index');
Route::get('/carousel', [CarouselApiController::class, 'index'])->name('api.carousel.index');

// Protected Routes - Require Sanctum Auth
Route::middleware('auth:sanctum')->group(function () {

  Route::post('/logout', [AuthApiController::class, 'logout'])->name('api.logout');
  Route::get('/dashboard', [DashboardApiController::class, 'index'])->name('api.dashboard');

  // Profil
  Route::post('/profil/edit/{id}', [ProfilApiController::class, 'update'])->name('api.profil.update');
  Route::post('/profil/upload', [ProfilApiController::class, 'store'])->name('api.profil.store');
  Route::delete('/profil/delete/{id}', [ProfilApiController::class, 'destroy'])->name('api.profil.destroy');

  // Struktur Organisasi
  Route::get('/struktur', [StrukturApiController::class, 'index'])->name('api.struktur.index');
  Route::post('/struktur', [StrukturApiController::class, 'store'])->name('api.struktur.store');
  Route::post('/struktur/edit/{id}', [StrukturApiController::class, 'update'])->name('api.struktur.update');
  Route::delete('/struktur/delete/{id}', [StrukturApiController::class, 'destroy'])->name('api.struktur.destroy');

  // Jabatan
  Route::get('/jabatan', [JabatanApiController::class, 'index'])->name('api.jabatan.index');
  Route::post('/jabatan/upload', [JabatanApiController::class, 'store'])->name('api.jabatan.store');
  Route::post('/jabatan/edit/{id}', [JabatanApiController::class, 'update'])->name('api.jabatan.update');
  Route::delete('/jabatan/delete/{id}', [JabatanApiController::class, 'destroy'])->name('api.jabatan.destroy');

  // Unit Usaha
  Route::post('/unit-usaha/upload', [UnitUsahaApiController::class, 'store'])->name('api.unit.store');
  Route::post('/unit-usaha/edit/{id}', [UnitUsahaApiController::class, 'update'])->name('api.unit.update');
  Route::delete('/unit-usaha/delete/{id}', [UnitUsahaApiController::class, 'destroy'])->name('api.unit.destroy');

  // Berita
  Route::get('berita', [BeritaApiController::class, 'index'])->name('api.berita.index');
  Route::post('berita/upload', [BeritaApiController::class, 'store'])->name('api.berita.store');
  Route::post('berita/edit/{id}', [BeritaApiController::class, 'update'])->name('api.berita.update');
  Route::delete('berita/delete/{id}', [BeritaApiController::class, 'destroy'])->name('api.berita.destroy');

  // Kategori Berita
  Route::get('/kategori-berita', [KategoriBeritaApiController::class, 'index'])->name('api.kategori.index');
  Route::post('/kategori-berita/upload', [KategoriBeritaApiController::class, 'store'])->name('api.kategori.store');
  Route::put('/kategori-berita/edit/{id}', [KategoriBeritaApiController::class, 'update'])->name('api.kategori.update');
  Route::delete('/kategori-berita/delete/{id}', [KategoriBeritaApiController::class, 'destroy'])->name('api.kategori.destroy');

  // Galeri
  Route::get('/galeri', [GaleriApiController::class, 'index'])->name('api.galeri.index');
  Route::get('/galeri/album/{id}', [GaleriApiController::class, 'getByAlbumId']);
  Route::post('/galeri/upload', [GaleriApiController::class, 'store'])->name('api.galeri.store');
  Route::post('/galeri/edit/{id}', [GaleriApiController::class, 'update'])->name('api.galeri.update');
  Route::delete('/galeri/delete/{id}', [GaleriApiController::class, 'destroy'])->name('api.galeri.destroy');

  // Product
  Route::get('/product', [ProductApiController::class, 'index'])->name('api.products.index');
  Route::get('/product/unit-usaha/{id}', [ProductApiController::class, 'getByUnitUsahaId'])->name('api.products.byUnit');
  Route::post('/product/upload', [ProductApiController::class, 'store'])->name('api.products.store');
  Route::post('/product/edit/{id}', [ProductApiController::class, 'update'])->name('api.products.update');
  Route::delete('/product/delete/{id}', [ProductApiController::class, 'destroy'])->name('api.products.destroy');
  Route::get('/product/detail/{id}', [ProductApiController::class, 'show'])->name('api.products.show');

  // Album
  Route::post('/album/upload', [AlbumApiController::class, 'store'])->name('api.album.store');
  Route::post('/album/edit/{id}', [AlbumApiController::class, 'update'])->name('api.album.update');
  Route::delete('/album/delete/{id}', [AlbumApiController::class, 'destroy'])->name('api.album.destroy');

  // Download
  Route::get('/download', [DownloadApiController::class, 'index'])->name('api.download.index');
  Route::post('/download/upload', [DownloadApiController::class, 'store'])->name('api.download.store');
  Route::post('/download/edit/{id}', [DownloadApiController::class, 'update'])->name('api.download.update');
  Route::delete('/download/delete/{id}', [DownloadApiController::class, 'destroy'])->name('api.download.destroy');
  Route::get('/download/{id}', [DownloadApiController::class, 'downloadFile'])->name('api.download.file');

  // User Management
  Route::get('/pengguna', [UserApiController::class, 'index'])->name('api.user.index');
  Route::post('/pengguna/add', [UserApiController::class, 'store'])->name('api.user.store');
  Route::post('/pengguna/edit/{id}', [UserApiController::class, 'update'])->name('api.user.update');
  Route::delete('/pengguna/delete/{id}', [UserApiController::class, 'destroy'])->name('api.user.destroy');
  Route::post('/pengguna/{id}/reset-password', [UserApiController::class, 'resetPassword'])->name('api.user.reset-password');

  // Sosmedia Settings
  Route::get('/sosmed', [SettingApiController::class, 'index'])->name('api.sosmed.index');
  Route::post('/sosmed/edit/{id}', [SettingApiController::class, 'update'])->name('api.sosmed.update');
  Route::post('/sosmed/upload', [SettingApiController::class, 'store'])->name('api.sosmed.store');
  Route::delete('/sosmed/delete/{id}', [SettingApiController::class, 'destroy'])->name('api.sosmed.destroy');

  // Carousel
  Route::post('/carousel/upload', [CarouselApiController::class, 'store'])->name('api.carousel.store');
  Route::get('/carousel/{id}', [CarouselApiController::class, 'show'])->name('api.carousel.show');
  Route::post('/carousel/edit/{id}', [CarouselApiController::class, 'update'])->name('api.carousel.update');
  Route::delete('/carousel/delete/{id}', [CarouselApiController::class, 'destroy'])->name('api.carousel.destroy');
});
