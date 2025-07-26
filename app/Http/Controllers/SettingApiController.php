<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Throwable;

class SettingApiController extends Controller
{
    public function show(): JsonResponse
    {
        try {
            $setting = Setting::firstOrNew();

            return response()->json([
                'success' => true,
                'message' => 'Data pengaturan berhasil diambil',
                'data' => $setting
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data pengaturan: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'whatsapp'     => 'required|max:255',
            'email'        => 'required|email',
            'alamat'       => 'required',
            'google_maps'  => 'required',
            'facebook'     => 'nullable|url',
            'instagram'    => 'nullable|url',
            'youtube'      => 'nullable|url'
        ]);

        try {
            $setting = Setting::updateOrCreate(
                ['id' => 1], // atau bisa pakai Setting::firstOrNew()->fill(...)
                $request->only([
                    'whatsapp',
                    'email',
                    'alamat',
                    'google_maps',
                    'facebook',
                    'instagram',
                    'youtube'
                ])
            );

            return response()->json([
                'success' => true,
                'message' => 'Pengaturan berhasil diperbarui',
                'data' => $setting
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui pengaturan: ' . $e->getMessage()
            ], 500);
        }
    }
}
