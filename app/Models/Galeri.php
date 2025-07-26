<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Galeri extends Model
{
    protected $table = 'galeri';
    protected $fillable = [
        'judul', 'jenis', 'foto', 'link_youtube', 'album_id'
    ];

    public function album()
{
    return $this->belongsTo(Album::class);
}

}
