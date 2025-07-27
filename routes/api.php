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
    DashboardApiController
};


// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('api.home');
Route::post('/login', [AuthApiController::class, 'login'])->name('api.login');


// Protected Routes - Require Sanctum Auth
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthApiController::class, 'logout'])->name('api.logout');

    Route::get('/dashboard', [DashboardApiController::class, 'index'])->name('api.dashboard');

    // Profil
    Route::get('/profil', [ProfilApiController::class, 'edit'])->name('api.profil.edit');
    Route::put('/profil', [ProfilApiController::class, 'update'])->name('api.profil.update');

    // Struktur Organisasi
    Route::get('/struktur', [StrukturApiController::class, 'index'])->name('api.struktur.index');
    Route::post('/struktur', [StrukturApiController::class, 'store'])->name('api.struktur.store');
    Route::post('/struktur/edit/{id}', [StrukturApiController::class, 'updateOrder'])->name('api.struktur.reorder');
    Route::delete('/struktur/delete/{id}', [StrukturApiController::class, 'destroy'])->name('api.struktur.destroy');

    // Unit Usaha
    Route::get('/unit-usaha', [UnitUsahaApiController::class, 'index'])->name('api.unit.index');
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
    Route::post('/galeri/upload', [GaleriApiController::class, 'store'])->name('api.galeri.store');
    Route::post('/galeri/edit/{id}', [GaleriApiController::class, 'update'])->name('api.galeri.update');
    Route::delete('/galeri/delete/{id}', [GaleriApiController::class, 'destroy'])->name('api.galeri.destroy');
    Route::get('/galeri/album/{id}', [GaleriApiController::class, 'getByAlbumId']);

    // Album
    Route::get('/album', [AlbumApiController::class, 'index'])->name('api.album.index');
    Route::post('/album/upload', [AlbumApiController::class, 'store'])->name('api.album.store');
    Route::post('/album/edit/{id}', [AlbumApiController::class, 'update'])->name('api.album.update');
    Route::delete('/album/delete/{id}', [AlbumApiController::class, 'destroy'])->name('api.album.destroy');

    // Download
    Route::get('/download', [DownloadApiController::class, 'index'])->name('api.download.index');
    Route::post('/download', [DownloadApiController::class, 'store'])->name('api.download.store');
    Route::put('/download/{id}', [DownloadApiController::class, 'update'])->name('api.download.update');
    Route::delete('/download/{id}', [DownloadApiController::class, 'destroy'])->name('api.download.destroy');

    // Setting
    Route::get('/pengaturan', [SettingApiController::class, 'edit'])->name('api.pengaturan.edit');
    Route::put('/pengaturan', [SettingApiController::class, 'update'])->name('api.pengaturan.update');

    // User Management
    Route::get('/pengguna', [UserApiController::class, 'index'])->name('api.user.index');
    Route::post('/pengguna', [UserApiController::class, 'store'])->name('api.user.store');
    Route::delete('/pengguna/{id}', [UserApiController::class, 'destroy'])->name('api.user.destroy');
    Route::post('/pengguna/{id}/reset-password', [UserApiController::class, 'resetPassword'])->name('api.user.reset-password');
});
