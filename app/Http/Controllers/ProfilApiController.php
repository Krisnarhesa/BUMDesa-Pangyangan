<?php

namespace App\Http\Controllers;


use App\Models\Profil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;
use Throwable;

class ProfilApiController extends Controller
{
    // Ambil data profil
    public function index(): JsonResponse
    {
        $profil = Profil::first();

        if (!$profil) {
            return response()->json([
                'success' => false,
                'message' => 'Profil belum tersedia.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Data profil ditemukan.',
            'data' => $profil
        ]);
    }

    // Simpan data profil baru
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama_bumdes'   => 'required|max:255',
            'deskripsi'     => 'required',
            'visi'          => 'required',
            'misi'          => 'required',
            'slogan'        => 'required|max:255',
            'logo'          => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'foto_profil'   => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        try {
            if (Profil::exists()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data profil sudah ada. Gunakan endpoint update untuk memperbarui.'
                ], 409);
            }

            $profil = new Profil();
            $profil->nama_bumdes = $request->nama_bumdes;
            $profil->deskripsi = $request->deskripsi;
            $profil->visi = $request->visi;
            $profil->misi = $request->misi;
            $profil->slogan = $request->slogan;

            // Upload logo
            if ($request->hasFile('logo')) {
                $path = $request->file('logo')->store("profil/{$request->nama_bumdes}", 'public');
                $profil->logo = $path;
            }

            // Upload foto profil
            if ($request->hasFile('foto_profil')) {
                $path = $request->file('foto_profil')->store("profil/{$request->nama_bumdes}", 'public');
                $profil->foto_profil = $path;
            }

            $profil->save();

            return response()->json([
                'success' => true,
                'message' => 'Profil berhasil dibuat.',
                'data' => $profil
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat profil: ' . $e->getMessage()
            ], 500);
        }
    }

    // Perbarui data profil
    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'nama_bumdes'   => 'required|max:255',
            'deskripsi'     => 'required',
            'visi'          => 'required',
            'misi'          => 'required',
            'slogan'        => 'required|max:255',
            'logo'          => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'foto_profil'   => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        try {
            $profil = Profil::firstOrNew();

            $profil->nama_bumdes = $request->nama_bumdes;
            $profil->deskripsi = $request->deskripsi;
            $profil->visi = $request->visi;
            $profil->misi = $request->misi;
            $profil->slogan = $request->slogan;

            // Ganti logo jika diunggah
            if ($request->hasFile('logo')) {
                if ($profil->logo && Storage::disk('public')->exists($profil->logo)) {
                    Storage::disk('public')->delete($profil->logo);
                }

                $path = $request->file('logo')->store("profil/{$request->nama_bumdes}", 'public');
                $profil->logo = $path;
            }

            // Ganti foto profil jika diunggah
            if ($request->hasFile('foto_profil')) {
                if ($profil->foto_profil && Storage::disk('public')->exists($profil->foto_profil)) {
                    Storage::disk('public')->delete($profil->foto_profil);
                }

                $path = $request->file('foto_profil')->store("profil/{$request->nama_bumdes}", 'public');
                $profil->foto_profil = $path;
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

    // Hapus data profil
    public function destroy(): JsonResponse
    {
        try {
            $profil = Profil::first();

            if (!$profil) {
                return response()->json([
                    'success' => false,
                    'message' => 'Profil tidak ditemukan.'
                ], 404);
            }

            if ($profil->logo && Storage::disk('public')->exists($profil->logo)) {
                Storage::disk('public')->delete($profil->logo);
            }

            if ($profil->foto_profil && Storage::disk('public')->exists($profil->foto_profil)) {
                Storage::disk('public')->delete($profil->foto_profil);
            }

            $profil->delete();

            return response()->json([
                'success' => true,
                'message' => 'Profil berhasil dihapus.'
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus profil: ' . $e->getMessage()
            ], 500);
        }
    }
}