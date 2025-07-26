<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'whatsapp',
        'email',
        'alamat',
        'google_maps',
        'facebook',
        'instagram',
        'youtube'
    ];
}