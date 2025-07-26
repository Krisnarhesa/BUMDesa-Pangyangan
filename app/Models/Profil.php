<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profil extends Model
{
    protected $table = 'profils';
    public $timestamps = false;

    protected $fillable = [
        'nama_bumdes',
        'deskripsi',
        'visi_misi',
        'slogan',
        'logo',
        'foto_profil'
    ];

    // Akses URL logo
    public function getLogoUrlAttribute()
    {
        if ($this->logo && file_exists(public_path('storage/profil/' . $this->logo))) {
            return asset('storage/profil/' . $this->logo);
        }

        return asset('images/default-logo.png');
    }

    // Akses URL foto profil
    public function getFotoProfilUrlAttribute()
    {
        if ($this->foto_profil && file_exists(public_path('storage/profil/' . $this->foto_profil))) {
            return asset('storage/profil/' . $this->foto_profil);
        }

        return asset('images/default-profil.png'); // pastikan ada file ini di public/images/
    }
}
