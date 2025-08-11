<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnitUsaha extends Model
{
    protected $table = 'unit_usaha';
    protected $fillable = ['nama', 'icon', 'deskripsi', 'kontak', 'foto'];
    public function products()
{
    return $this->hasMany(Product::class);
}

}