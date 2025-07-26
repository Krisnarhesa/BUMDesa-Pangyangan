<?php

namespace App\Http\Controllers;

use App\Models\KategoriBerita;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Throwable;

class KategoriBeritaApiController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $kategoris = KategoriBerita::orderBy('nama')->paginate(10);

            return response()->json([
                'success' => true,
                'message' => 'Daftar kategori berita',
                'data' => $kategoris
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'nama' => 'required|max:255|unique:kategori_berita'
            ]);

            $kategori = KategoriBerita::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Kategori berhasil ditambahkan',
                'data' => $kategori
            ], 201);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $kategori = KategoriBerita::findOrFail($id);

            $validated = $request->validate([
                'nama' => 'required|max:255|unique:kategori_berita,nama,' . $kategori->id
            ]);

            $kategori->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Kategori berhasil diperbarui',
                'data' => $kategori->refresh()
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

    public function destroy(int $id): JsonResponse
{
    try {
        $kategori = KategoriBerita::find($id);

        if (!$kategori) {
            return response()->json([
                'success' => false,
                'message' => 'Kategori tidak ditemukan'
            ], 404);
        }

        if ($kategori->berita()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Kategori tidak dapat dihapus karena sudah digunakan di beberapa berita'
            ], 409);
        }

        $kategori->delete();

        return response()->json([
            'success' => true,
            'message' => 'Kategori berhasil dihapus'
        ]);
    } catch (Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => 'Terjadi kesalahan saat menghapus kategori',
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
}
}
