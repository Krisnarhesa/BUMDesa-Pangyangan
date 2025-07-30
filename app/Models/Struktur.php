<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Jabatan;

use Illuminate\Database\Eloquent\Model;

class Struktur extends Model
{
    protected $table = 'structures';
    protected $fillable = ['nama', 'jabatan_id', 'foto'];
    public function jabatan(): BelongsTo
    {
        return $this->belongsTo(Jabatan::class, 'jabatan_id', 'id');
    }
}