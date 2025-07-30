<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Download;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;
use Throwable;

class DownloadApiController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $downloads = Download::all();
            return response()->json([
                'success' => true,
                'message' => 'Daftar download berhasil diambil',
                'data' => $downloads
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
{
    $request->validate([
        'judul' => 'required|max:255',
        'deskripsi' => 'required',
        'file_path' => 'required|mimes:pdf|max:10240' // validasi 'file' bukan 'file_path'
    ]);

    try {
        // Simpan file ke folder 'downloads'
        $path = $request->file('file_path')->store('downloads', 'public');

        // Simpan path relatif ke database
        $download = Download::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'file_path' => $path
        ]);

        return response()->json([
            'success' => true,
            'message' => 'File berhasil diunggah',
            'data' => $download
        ]);
    } catch (Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal mengunggah file: ' . $e->getMessage()
        ], 500);
    }
}

public function update(Request $request, $id): JsonResponse
{
    $request->validate([
        'judul' => 'required|max:255',
        'deskripsi' => 'required',
        'file_path' => 'nullable|mimes:pdf|max:10240'
    ]);

    try {
        $download = Download::findOrFail($id);

        $data = $request->only(['judul', 'deskripsi']);

        if ($request->hasFile('file_path')) {
            // Hapus file lama
            Storage::disk('public')->delete($download->file_path);

            // Simpan file baru
            $path = $request->file('file_path')->store('downloads', 'public');
            $data['file_path'] = $path;
        }

        $download->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Data download berhasil diperbarui',
            'data' => $download
        ]);
    } catch (Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal memperbarui data: ' . $e->getMessage()
        ], 500);
    }
}

    public function downloadFile($id)
    {
        try {
            $download = Download::findOrFail($id);

            $filePath = storage_path('app/public/' . $download->file_path);

            if (!file_exists($filePath)) {
                return response()->json([
                    'success' => false,
                    'message' => 'File tidak ditemukan.'
                ], 404);
            }

            return response()->download($filePath);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengunduh file: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Download $id): JsonResponse
    {
        try {
            Storage::delete('public/' . $id->file_path);
            $id->delete();

            return response()->json([
                'success' => true,
                'message' => 'File berhasil dihapus'
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus file: ' . $e->getMessage()
            ], 500);
        }
    }
}
