<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('profils', function (Blueprint $table) {
      $table->id();
      $table->string('nama_bumdes');
      $table->text('deskripsi');
      $table->text('visi');
      $table->text('misi');
      $table->string('slogan');
      $table->string('logo')->nullable();
      $table->string('foto_profil')->nullable();
      $table->timestamps();
    });

    // Schema::create('structures', function (Blueprint $table) {
    //     $table->id();
    //     $table->string('nama');
    //     $table->string('jabatan');
    //     $table->string('foto')->nullable();
    //     $table->integer('urutan')->default(0);
    //     $table->timestamps();
    // });

    // Unit Usaha
    Schema::create('unit_usaha', function (Blueprint $table) {
      $table->id();
      $table->string('nama');
      $table->text('deskripsi');
      $table->string('kontak');
      $table->string('foto')->nullable();
      $table->timestamps();
    });

    // Tabel Kategori Berita
    Schema::create('kategori_berita', function (Blueprint $table) {
      $table->id();
      $table->string('nama');
      $table->timestamps();
    });

    // Tabel Album
    Schema::create('albums', function (Blueprint $table) {
      $table->id();
      $table->string('nama');
      $table->timestamps();
    });

    // Tabel Galeri
    Schema::create('galeri', function (Blueprint $table) {
      $table->id();
      $table->string('judul');
      $table->enum('jenis', ['foto', 'link']);
      $table->string('foto')->nullable();
      $table->string('link_youtube')->nullable();
      $table->foreignId('album_id')->constrained('albums')->onDelete('cascade');
      $table->timestamps();
    });

    // File Unduhan
    Schema::create('downloads', function (Blueprint $table) {
      $table->id();
      $table->string('judul');
      $table->text('deskripsi');
      $table->string('file_path');
      $table->timestamps();
    });

    Schema::create('settings', function (Blueprint $table) {
      $table->id();
      $table->string('whatsapp')->nullable();
      $table->string('email')->nullable();
      $table->text('alamat')->nullable();
      $table->text('google_maps')->nullable();
      $table->string('facebook')->nullable();
      $table->string('instagram')->nullable();
      $table->string('youtube')->nullable();
      $table->timestamps();
    });

    // Tabel Users
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('email')->unique();
      $table->timestamp('email_verified_at')->nullable();
      $table->string('password');
      $table->rememberToken();
      $table->timestamps();
    });

    // // Tabel Roles (dari Spatie Permission)
    // Schema::create('roles', function (Blueprint $table) {
    //     $table->bigIncrements('id');
    //     $table->string('name')->unique();
    //     $table->string('guard_name');
    //     $table->timestamps();
    // });

    // // Tabel Permissions (dari Spatie Permission)
    // Schema::create('permissions', function (Blueprint $table) {
    //     $table->bigIncrements('id');
    //     $table->string('name');
    //     $table->string('guard_name');
    //     $table->timestamps();
    // });

    // // Tabel Model Has Roles (dari Spatie Permission)
    // Schema::create('model_has_roles', function (Blueprint $table) {
    //     $table->morphs('model');
    //     $table->unsignedBigInteger('role_id');
    //     $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
    //     $table->primary(['role_id', 'model_id', 'model_type']);
    // });

    // // Tabel Role Has Permissions (dari Spatie Permission)
    // Schema::create('role_has_permissions', function (Blueprint $table) {
    //     $table->unsignedBigInteger('permission_id');
    //     $table->unsignedBigInteger('role_id');
    //     $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('cascade');
    //     $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
    //     $table->primary(['permission_id', 'role_id']);
    // });

  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('profils');
    Schema::dropIfExists('structures');
    Schema::dropIfExists('unit_usaha');
    Schema::dropIfExists('kategori_berita');
    Schema::dropIfExists('berita');
    Schema::dropIfExists('albums');
    Schema::dropIfExists('galeri');
    Schema::dropIfExists('downloads');
    Schema::dropIfExists('settings');
    Schema::dropIfExists('users');
    Schema::dropIfExists('roles');
    Schema::dropIfExists('permissions');
    Schema::dropIfExists('model_has_roles');
    Schema::dropIfExists('role_has_permissions');
  }
};
