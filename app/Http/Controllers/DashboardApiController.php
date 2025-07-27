<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Models\UnitUsaha;
use App\Models\Struktur;
use App\Models\Galeri;
use App\Models\Download;
use Illuminate\Http\JsonResponse;
use Throwable;

class DashboardApiController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $stats = [
                'berita' => Berita::count(),
                'unit_usaha' => UnitUsaha::count(),
                'pengurus' => Struktur::count(),
                'galeri' => Galeri::count(),
                'download' => Download::count(),
            ];

            $latestBerita = Berita::with('kategori')
                ->orderBy('tanggal', 'desc')
                ->take(5)
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Dashboard data retrieved successfully',
                'data' => [
                    'stats' => $stats,
                    'latest_berita' => $latestBerita
                ]
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data dashboard: ' . $e->getMessage()
            ], 500);
        }
    }
}
