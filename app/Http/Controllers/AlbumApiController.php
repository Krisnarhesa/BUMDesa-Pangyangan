<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Throwable;

class AlbumApiController extends Controller
{
  public function index(): JsonResponse
  {
    try {
      $albums = Album::orderBy('created_at', 'desc')->get();

      return response()->json([
        'success' => true,
        'message' => 'Daftar album berhasil diambil',
        'data' => $albums
      ]);
    } catch (Throwable $e) {
      return response()->json([
        'success' => false,
        'message' => 'Gagal mengambil daftar album',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  public function store(Request $request): JsonResponse
  {
    $request->validate([
      'nama' => 'required|max:255|unique:albums',
    ]);

    try {
      $album = Album::create($request->only('nama'));

      return response()->json([
        'success' => true,
        'message' => 'Album berhasil dibuat',
        'data' => $album
      ], 201);
    } catch (Throwable $e) {
      return response()->json([
        'success' => false,
        'message' => 'Gagal membuat album',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  public function update(Request $request, $id): JsonResponse
  {
    $request->validate([
      'nama' => 'required|max:255|unique:albums,nama,' . $id,
    ]);

    try {
      $album = Album::findOrFail($id); // Ambil album berdasarkan ID

      $album->update($request->only('nama'));

      return response()->json([
        'success' => true,
        'message' => 'Album berhasil diperbarui',
        'data' => $album
      ]);
    } catch (Throwable $e) {
      return response()->json([
        'success' => false,
        'message' => 'Gagal memperbarui album',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  public function destroy(Album $id): JsonResponse
  {
    try {
      $id->delete();

      return response()->json([
        'success' => true,
        'message' => 'Album berhasil dihapus'
      ]);
    } catch (Throwable $e) {
      return response()->json([
        'success' => false,
        'message' => 'Gagal menghapus album',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  public function show(Album $album): JsonResponse
  {
    return response()->json([
      'success' => true,
      'message' => 'Detail album berhasil diambil',
      'data' => $album
    ]);
  }
}
