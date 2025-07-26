<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Profil;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;
use Throwable;

class ProfilApiController extends Controller
{
    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'nama_bumdes'   => 'required|max:255',
            'deskripsi'     => 'required',
            'visi_misi'     => 'required',
            'slogan'        => 'required|max:255',
            'logo'          => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'foto_profil'   => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        try {
            $profil = Profil::firstOrNew();

            // Simpan data teks
            $profil->nama_bumdes = $request->nama_bumdes;
            $profil->deskripsi = $request->deskripsi;
            $profil->visi_misi = $request->visi_misi;
            $profil->slogan = $request->slogan;

            // Upload dan resize logo
            if ($request->hasFile('logo')) {
                $logo = $request->file('logo');
                $logoName = 'logo-' . time() . '.' . $logo->getClientOriginalExtension();

                $img = Image::make($logo)->resize(300, null, function ($constraint) {
                    $constraint->aspectRatio();
                });

                $path = storage_path('app/public/profil/' . $logoName);
                $img->save($path);

                // Hapus logo lama jika ada
                if ($profil->logo && file_exists(storage_path('app/public/profil/' . $profil->logo))) {
                    unlink(storage_path('app/public/profil/' . $profil->logo));
                }

                $profil->logo = $logoName;
            }

            // Upload dan resize foto profil
            if ($request->hasFile('foto_profil')) {
                $foto = $request->file('foto_profil');
                $fotoName = 'profil-' . time() . '.' . $foto->getClientOriginalExtension();

                $img = Image::make($foto)->resize(800, 600);
                $img->save(storage_path('app/public/profil/' . $fotoName));

                // Hapus foto lama jika ada
                if ($profil->foto_profil && file_exists(storage_path('app/public/profil/' . $profil->foto_profil))) {
                    unlink(storage_path('app/public/profil/' . $profil->foto_profil));
                }

                $profil->foto_profil = $fotoName;
            }

            $profil->save();

            return response()->json([
                'success' => true,
                'message' => 'Profil berhasil diperbarui',
                'data' => $profil
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui profil: ' . $e->getMessage()
            ], 500);
        }
    }
}
