<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    public function up()
    {

        Schema::create("jabatan", function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->timestamps();
        });
        
        Schema::create('structures', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->foreignId('jabatan_id')->constrained('jabatan')->onDelete('cascade');
            $table->string('foto')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('structures');
        Schema::dropIfExists('jabatan');
    }
};