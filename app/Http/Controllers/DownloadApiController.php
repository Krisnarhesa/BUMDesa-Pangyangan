<?php

namespace App\Http\Controllers\Api;

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
            'file' => 'required|mimes:pdf|max:10240'
        ]);

        try {
            $file = $request->file('file');
            $filename = 'download-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('public/downloads', $filename);

            $download = Download::create([
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'file_path' => str_replace('public/', '', $path)
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

    public function update(Request $request, Download $download): JsonResponse
    {
        $request->validate([
            'judul' => 'required|max:255',
            'deskripsi' => 'required',
            'file' => 'nullable|mimes:pdf|max:10240'
        ]);

        try {
            $data = $request->only(['judul', 'deskripsi']);

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filename = 'download-' . time() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('public/downloads', $filename);

                // Hapus file lama
                Storage::delete('public/' . $download->file_path);

                $data['file_path'] = str_replace('public/', '', $path);
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

    public function destroy(Download $download): JsonResponse
    {
        try {
            Storage::delete('public/' . $download->file_path);
            $download->delete();

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
