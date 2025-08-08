<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profil extends Model
{
    protected $table = 'profils';

    protected $fillable = [
        'nama_bumdes',
        'deskripsi',
        'slogan',
        'logo',
        'foto_profil',
        'visi',
        'misi',
        'telp',
        'alamat',
        'email'
    ];

}
