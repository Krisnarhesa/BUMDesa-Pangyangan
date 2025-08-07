<?php

namespace App\Http\Controllers;

use App\Models\Carousel;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Throwable;

class CarouselApiController extends Controller
{
    // Ambil semua data carousel
    public function index(): JsonResponse
    {
        try {
            $carousels = Carousel::all();
            return response()->json([
                'success' => true,
                'data' => $carousels,
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data carousel',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Simpan carousel baru
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $path = $request->file('image')->store('carousels', 'public');

            $carousel = Carousel::create([
                'image' => $path,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Carousel berhasil ditambahkan',
                'data' => $carousel,
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan carousel',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Tampilkan satu data carousel
    public function show($id): JsonResponse
    {
        try {
            $carousel = Carousel::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $carousel,
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan',
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    // Update gambar carousel
    public function update(Request $request, $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $carousel = Carousel::findOrFail($id);

            // Hapus gambar lama jika ada
            if ($carousel->image && Storage::disk('public')->exists($carousel->image)) {
                Storage::disk('public')->delete($carousel->image);
            }

            // Upload gambar baru
            $path = $request->file('image')->store('carousels', 'public');

            $carousel->update([
                'image' => $path,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Carousel berhasil diperbarui',
                'data' => $carousel,
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui carousel',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Hapus carousel
    public function destroy($id): JsonResponse
    {
        try {
            $carousel = Carousel::findOrFail($id);

            // Hapus gambar dari storage
            if ($carousel->image && Storage::disk('public')->exists($carousel->image)) {
                Storage::disk('public')->delete($carousel->image);
            }

            $carousel->delete();

            return response()->json([
                'success' => true,
                'message' => 'Carousel berhasil dihapus',
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus carousel',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}