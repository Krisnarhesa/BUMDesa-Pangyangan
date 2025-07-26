<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Struktur;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Throwable;

class StrukturApiController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $strukturs = Struktur::orderBy('urutan')->get();

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
            'jabatan' => 'required|max:255',
            'foto' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        try {
            $foto = $request->file('foto');
            $filename = 'struktur-' . time() . '.' . $foto->getClientOriginalExtension();

            $img = Image::make($foto)->resize(400, 500, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            $img->save(storage_path('app/public/struktur/' . $filename));

            $struktur = Struktur::create([
                'nama' => $request->nama,
                'jabatan' => $request->jabatan,
                'foto' => $filename,
                'urutan' => Struktur::max('urutan') + 1
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

    public function updateOrder(Request $request): JsonResponse
    {
        try {
            foreach ($request->order as $index => $id) {
                Struktur::where('id', $id)->update(['urutan' => $index + 1]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Urutan pengurus berhasil diperbarui'
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui urutan: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Struktur $struktur): JsonResponse
    {
        try {
            $path = storage_path('app/public/struktur/' . $struktur->foto);
            if (file_exists($path)) {
                unlink($path);
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
