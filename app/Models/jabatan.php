<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Struktur;

class Jabatan extends Model
{
    protected $table = 'jabatan';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = ['nama'];

    public function struktur(): HasMany
    {
        return $this->hasMany(Struktur::class, 'jabatan_id', 'id');
    }
}
