<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Throwable;

class SettingApiController extends Controller
{
    public function index(): JsonResponse
{
    try {
        $settings = Setting::all();
        return response()->json([
            'success' => true,
            'message' => 'Daftar pengaturan sosial media berhasil diambil',
            'data' => $settings
        ]);
    } catch (Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal mengambil data: ' . $e->getMessage()
        ], 500);
    }
}

public function show($id): JsonResponse
{
    try {
        $setting = Setting::findOrFail($id);
        return response()->json([
            'success' => true,
            'message' => 'Detail pengaturan sosial media berhasil diambil',
            'data' => $setting
        ]);
    } catch (Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal mengambil data: ' . $e->getMessage()
        ], 500);
    }
}

public function store(Request $request): JsonResponse
{
    $request->validate([
        'whatsapp' => 'required',
        'email' => 'required|email',
        'alamat' => 'required',
        'google_maps' => 'required',
        'facebook' => 'nullable|url',
        'instagram' => 'nullable|url',
        'youtube' => 'nullable|url'
    ]);

    try {
        $setting = Setting::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Pengaturan sosial media berhasil disimpan',
            'data' => $setting
        ]);
    } catch (Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal menyimpan data: ' . $e->getMessage()
        ], 500);
    }
}

public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'whatsapp' => 'required',
            'email' => 'required|email',
            'alamat' => 'required',
            'google_maps' => 'required',
            'facebook' => 'nullable|url',
            'instagram' => 'nullable|url',
            'youtube' => 'nullable|url'
        ]);

        try {
            $setting = Setting::findOrFail($id);

            $setting->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Pengaturan sosial media berhasil diperbarui',
                'data' => $setting
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui data: ' . $e->getMessage()
            ], 500);
        }
    }

public function destroy($id): JsonResponse
{
    try {
        $setting = Setting::findOrFail($id);
        $setting->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pengaturan sosial media berhasil dihapus'
        ]);
    } catch (Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal menghapus data: ' . $e->getMessage()
        ], 500);
    }
}

}
