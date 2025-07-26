<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Berita;

class KategoriBerita extends Model
{
    protected $table = 'kategori_berita';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = ['nama'];

    public function berita(): HasMany
    {
        return $this->hasMany(Berita::class, 'kategori_id', 'id');
    }
}

