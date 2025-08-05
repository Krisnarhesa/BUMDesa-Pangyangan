<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;
use Throwable;

class GaleriApiController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $galeris = Galeri::with('album')->get();
            // $albums = Album::all();

            return response()->json([
                'success' => true,
                'message' => 'Daftar galeri berhasil diambil',
                'data' => [
                    'galeri' => $galeris,
                    // 'albums' => $albums
                ]
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getByAlbumId($id): JsonResponse
    {
        try {
            $galeris = Galeri::with('album')
                ->where('album_id', $id)
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Daftar galeri berdasarkan album berhasil diambil',
                'data' => $galeris
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'judul' => 'required|max:255',
                'jenis' => 'required|in:foto,link',
                'foto' => 'required_if:jenis,foto|image|mimes:jpeg,png,jpg|max:2048',
                'link_youtube' => 'required_if:jenis,link',
                'album_id' => 'required|exists:albums,id'
            ]);

            $fileName = null;

            if ($request->jenis === 'foto') {
            if ($request->hasFile('foto')) {
                $path = $request->file('foto')->store("galeri/foto/{$request->album_id}", 'public');
                $fileName = $path;
            }
        }

            $galeri = Galeri::create([
            'judul' => $request->judul,
            'jenis' => $request->jenis,
            'foto' => $request->jenis === 'foto' ? $fileName : null,
            'link_youtube' => $request->jenis === 'link' ? $request->link_youtube : null,
            'album_id' => $request->album_id
        ]);

            return response()->json([
                'success' => true,
                'message' => 'Media berhasil diunggah',
                'data' => $galeri
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $galeri = Galeri::findOrFail($id);

            $request->validate([
                'judul' => 'required|max:255',
                'jenis' => 'required|in:foto,link',
                'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
                'link_youtube' => 'nullable|string',
                'album_id' => 'required|exists:albums,id'
            ]);

            $fotoName = $galeri->foto;

            if ($request->jenis === 'foto' && $request->hasFile('foto')) {
            // Hapus foto lama jika ada
            if ($galeri->foto && Storage::disk('public')->exists($galeri->foto)) {
                Storage::disk('public')->delete($galeri->foto);
            }

            // Simpan foto baru ke galeri/foto/{album_id}
            $path = $request->file('foto')->store("galeri/foto/{$request->album_id}", 'public');
            $fotoName = $path;
        }

            // Update data galeri
            $galeri->update([
                'judul' => $request->judul,
                'jenis' => $request->jenis,
                'foto' => $request->jenis === 'foto' ? $fotoName : null,
                'link_youtube' => $request->jenis === 'link' ? $request->link_youtube : null,
                'album_id' => $request->album_id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Media berhasil diperbarui',
                'data' => $galeri
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $galeri = Galeri::findOrFail($id);

            if ($galeri->foto && Storage::exists('public/galeri/foto/' . $galeri->foto)) {
                Storage::delete('public/galeri/foto/' . $galeri->foto);
            }

            $galeri->delete();

            return response()->json([
                'success' => true,
                'message' => 'Media berhasil dihapus'
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
