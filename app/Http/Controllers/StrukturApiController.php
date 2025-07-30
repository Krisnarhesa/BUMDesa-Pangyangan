<?php

namespace App\Http\Controllers;

use App\Models\Struktur;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Throwable;

class StrukturApiController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $strukturs = Struktur::all();

            return response()->json([
                'success' => true,
                'message' => 'Daftar struktur berhasil diambil',
                'data' => $strukturs
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data struktur: ' . $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama' => 'required|max:255',
            'jabatan_id' => 'required|integer',
            'foto' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        try {
            $path = $request->file('foto')->store('struktur', 'public');

            $struktur = Struktur::create([
                'nama' => $request->nama,
                'jabatan_id' => $request->jabatan_id,
                'foto' => $path,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Pengurus berhasil ditambahkan',
                'data' => $struktur
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan pengurus: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
{
    $request->validate([
        'nama' => 'sometimes|required|max:255',
        'jabatan_id' => 'sometimes|required|integer',
        'foto' => 'sometimes|image|mimes:jpeg,png,jpg|max:2048'
    ]);

    try {
        // Ambil model berdasarkan ID
        $struktur = Struktur::findOrFail($id);

        // Jika ada file foto baru, hapus yang lama
        if ($request->hasFile('foto')) {
            if ($struktur->foto && Storage::disk('public')->exists($struktur->foto)) {
                Storage::disk('public')->delete($struktur->foto);
            }

            $path = $request->file('foto')->store('struktur', 'public');
            $struktur->foto = $path;
        }

        // Update field lain jika dikirim
        if ($request->filled('nama')) {
            $struktur->nama = $request->nama;
        }

        if ($request->filled('jabatan_id')) {
            $struktur->jabatan_id = $request->jabatan_id;
        }

        $struktur->save();

        return response()->json([
            'success' => true,
            'message' => 'Data pengurus berhasil diperbarui',
            'data' => $struktur
        ]);
    } catch (Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal memperbarui data pengurus: ' . $e->getMessage()
        ], 500);
    }
}


    public function destroy($id): JsonResponse
    {
        try {
            $struktur = Struktur::findOrFail($id);
            if ($struktur->foto && Storage::disk('public')->exists($struktur->foto)) {
                Storage::disk('public')->delete($struktur->foto);
            }

            $struktur->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pengurus berhasil dihapus'
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus pengurus: ' . $e->getMessage()
            ], 500);
        }
    }
}
