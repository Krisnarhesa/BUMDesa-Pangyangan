<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\KategoriBerita;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Throwable;

class BeritaApiController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Berita::query();

            if ($request->has('kategori')) {
                $query->where('kategori_id', $request->input('kategori'));
            }

            if ($request->has('search')) {
                $query->where('judul', 'like', '%' . $request->input('search') . '%');
            }

            $beritas = $query->latest()->paginate(10);
            $kategoris = KategoriBerita::all();

            return response()->json([
                'success' => true,
                'message' => 'Daftar berita',
                'data' => [
                    'berita' => $beritas,
                    'kategori' => $kategoris,
                ]
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
            $request->validate([
                'judul' => 'required|max:255',
                'konten' => 'required',
                'gambar_cover' => 'image|mimes:jpeg,png,jpg|max:5048',
                'tanggal' => 'required|date',
                'kategori_id' => 'required|exists:kategori_berita,id'
            ]);

            $cover = $request->file('gambar_cover');
            $filename = null;

            if ($cover) {
                $filename = 'cover-' . time() . '.' . $cover->getClientOriginalExtension();
                $cover->storeAs('public/berita/covers', $filename);
            }

            $stored = $cover->storeAs('public/berita/covers', $filename);
            if (!$stored) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal menyimpan file ke direktori!'
                ], 500);
            }
            
            $berita = Berita::create([
                'judul' => $request->input('judul'),
                'konten' => $request->input('konten'),
                'gambar_cover' => $filename,
                'tanggal' => $request->input('tanggal'),
                'kategori_id' => $request->input('kategori_id'),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Berita berhasil ditambahkan',
                'data' => $berita
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $berita = Berita::findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Detail berita',
                'data' => $berita
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }
    }

    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $berita = Berita::findOrFail($id);

            $request->validate([
                'judul' => 'required|max:255',
                'konten' => 'required',
                'gambar_cover' => 'nullable|image|mimes:jpeg,png,jpg|max:5048',
                'tanggal' => 'required|date',
                'kategori_id' => 'required|exists:kategori_berita,id'
            ]);

            $data = $request->only(['judul', 'konten', 'tanggal', 'kategori_id']);

            if ($request->hasFile('gambar_cover')) {
                $cover = $request->file('gambar_cover');
                $filename = 'cover-' . time() . '.' . $cover->getClientOriginalExtension();
                $cover->storeAs('public/berita/covers', $filename);

                // Hapus file lama
                if ($berita->gambar_cover && file_exists(storage_path('app/public/berita/covers/' . $berita->gambar_cover))) {
                    unlink(storage_path('app/public/berita/covers/' . $berita->gambar_cover));
                }

                $data['gambar_cover'] = $filename;
            }

            $berita->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Berita berhasil diperbarui',
                'data' => $berita
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $berita = Berita::findOrFail($id);

            if ($berita->gambar_cover && file_exists(storage_path('app/public/berita/covers/' . $berita->gambar_cover))) {
                unlink(storage_path('app/public/berita/covers/' . $berita->gambar_cover));
            }

            $berita->delete();

            return response()->json([
                'success' => true,
                'message' => 'Berita berhasil dihapus'
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan atau gagal dihapus'
            ], 500);
        }
    }

    public function upload(Request $request): JsonResponse
    {
        try {
            if ($request->hasFile('upload')) {
                $file = $request->file('upload');
                $filename = 'content-' . time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/berita/content', $filename);

                return response()->json([
                    'url' => asset("storage/berita/content/$filename")
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'File tidak ditemukan'
            ], 400);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
