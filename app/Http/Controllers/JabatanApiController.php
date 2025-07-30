<?php

namespace App\Http\Controllers;

use App\Models\Jabatan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Throwable;

class JabatanApiController extends Controller
{
    // Ambil semua jabatan
    public function index(): JsonResponse
    {
        try {
            $jabatans = Jabatan::all();

            return response()->json([
                'success' => true,
                'message' => 'Daftar jabatan berhasil diambil.',
                'data' => $jabatans
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data jabatan.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Simpan jabatan baru
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama' => 'required|string|max:255'
        ]);

        try {
            $jabatan = Jabatan::create([
                'nama' => $request->nama
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Jabatan berhasil ditambahkan.',
                'data' => $jabatan
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan jabatan.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Ambil detail jabatan
    public function show($id): JsonResponse
    {
        try {
            $jabatan = Jabatan::findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Detail jabatan ditemukan.',
                'data' => $jabatan
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Jabatan tidak ditemukan.',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    // Update jabatan
    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'nama' => 'required|string|max:255'
        ]);

        try {
            $jabatan = Jabatan::findOrFail($id);
            $jabatan->update([
                'nama' => $request->nama
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Jabatan berhasil diperbarui.',
                'data' => $jabatan
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui jabatan.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Hapus jabatan
    public function destroy($id): JsonResponse
    {
        try {
            $jabatan = Jabatan::findOrFail($id);
            $jabatan->delete();

            return response()->json([
                'success' => true,
                'message' => 'Jabatan berhasil dihapus.'
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus jabatan.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
