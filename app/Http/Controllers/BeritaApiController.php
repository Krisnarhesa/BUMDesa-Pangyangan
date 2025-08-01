<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\KategoriBerita;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use Throwable;

class BeritaApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Berita::with('kategori');

            if ($request->has('kategori')) {
                $query->where('kategori_id', $request->input('kategori'));
            }

            if ($request->has('search')) {
                $query->where('judul', 'like', '%' . $request->input('search') . '%');
            }

            $beritas = $query->latest()->paginate(10);
            $beritas->getCollection()->transform(function ($item) {
            return [
                'id' => $item->id,
                'judul' => $item->judul,
                'isi' => $item->isi,
                'kategori_id' => $item->kategori_id,
                'kategori_nama' => $item->kategori->nama ?? null,
                'created_at' => $item->created_at,
                'updated_at' => $item->updated_at,
            ];
        });

            return response()->json([
                'success' => true,
                'message' => 'Daftar berita',
                'data' => [
                    'berita' => $beritas
                ]
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
                'konten' => 'required',
                'gambar_cover' => 'image|mimes:jpeg,png,jpg|max:5048',
                'tanggal' => 'required|date',
                'kategori_id' => 'required|exists:kategori_berita,id'
            ]);

            $filename = null;

            if ($request->hasFile('gambar_cover')) {
                $path = $request->file('gambar_cover')->store("berita/covers/{$request->kategori_id}", 'public');
                $filename = $path;
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
                // Hapus file lama
                if ($berita->gambar_cover && Storage::disk('public')->exists($berita->gambar_cover)) {
                    Storage::disk('public')->delete($berita->gambar_cover);
                }

                // Simpan file baru
                $path = $request->file('gambar_cover')->store("berita/covers/{$request->kategori_id}", 'public');
                $data['gambar_cover'] = $path;
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

            if ($berita->gambar_cover && Storage::disk('public')->exists($berita->gambar_cover)) {
                Storage::disk('public')->delete($berita->gambar_cover);
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
                $kategoriId = $request->kategori_id ?? 'default';
                $path = $request->file('upload')->store("berita/content/{$kategoriId}", 'public');

                return response()->json([
                    'url' => asset("storage/{$path}")
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
