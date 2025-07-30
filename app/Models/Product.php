<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'unit_usaha_id',
        'nama',
        'harga',
        'deskripsi',
        'gambar',
    ];

    public function unitUsaha()
    {
        return $this->belongsTo(UnitUsaha::class);
    }
}
