<?php

namespace App\Http\Controllers;

use App\Models\UnitUsaha;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Throwable;

class UnitUsahaApiController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $units = UnitUsaha::all();

            return response()->json([
                'success' => true,
                'message' => 'Daftar unit usaha',
                'data' => $units
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
                'nama' => 'required|max:255',
                'icon' => 'nullable',
                'deskripsi' => 'required',
                'kontak' => 'required|max:255',
                'foto' => 'image|mimes:jpeg,png,jpg|max:2048'
            ]);

            $data = $request->only(['nama', 'icon', 'deskripsi', 'kontak']);

            if ($request->hasFile('foto')) {
                $path = $request->file('foto')->store("unit-usaha/{$request->input('nama')}", 'public');
                $data['foto'] = $path;
            }

            $unit = UnitUsaha::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Unit usaha berhasil ditambahkan',
                'data' => $unit
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
            $unit = UnitUsaha::findOrFail($id);

            $request->validate([
                'nama' => 'required|max:255',
                'deskripsi' => 'required',
                'icon' => 'nullable',
                'kontak' => 'required|max:255',
                'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
            ]);

            $data = $request->only(['nama', 'icon', 'deskripsi', 'kontak']);

            if ($request->hasFile('foto')) {
                $path = $request->file('foto')->store("unit-usaha/{$request->input('nama')}", 'public');
                $data['foto'] = $path;

                // Hapus foto lama jika ada
                if ($unit->foto && Storage::disk('public')->exists($unit->foto)) {
                    Storage::disk('public')->delete($unit->foto);
                }
            }

            $unit->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Unit usaha berhasil diperbarui',
                'data' => $unit
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
            $unit = UnitUsaha::findOrFail($id);

            if ($unit->foto && Storage::disk('public')->exists($unit->foto)) {
                Storage::disk('public')->delete($unit->foto);
            }

            $unit->delete();

            return response()->json([
                'success' => true,
                'message' => 'Unit usaha berhasil dihapus'
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
