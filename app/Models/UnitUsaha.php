<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnitUsaha extends Model
{
    protected $table = 'unit_usaha';
    protected $fillable = ['nama', 'deskripsi', 'kontak', 'foto'];
}