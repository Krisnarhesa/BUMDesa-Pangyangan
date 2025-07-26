<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Struktur extends Model
{
    protected $fillable = ['nama', 'jabatan', 'foto', 'urutan'];
}