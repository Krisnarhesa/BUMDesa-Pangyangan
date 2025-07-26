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
                'deskripsi' => 'required',
                'kontak' => 'required|max:255',
                'foto' => 'image|mimes:jpeg,png,jpg|max:5048'
            ]);

            $filename = null;

            if ($request->hasFile('foto')) {
                $foto = $request->file('foto');
                $filename = 'unit-' . time() . '.' . $foto->getClientOriginalExtension();
                $foto->storeAs('public/unit-usaha', $filename);
            }

            $unit = UnitUsaha::create([
                'nama' => $request->input('nama'),
                'deskripsi' => $request->input('deskripsi'),
                'kontak' => $request->input('kontak'),
                'foto' => $filename
            ]);

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
                'kontak' => 'required|max:255',
                'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:5048'
            ]);

            $data = $request->only(['nama', 'deskripsi', 'kontak']);

            if ($request->hasFile('foto')) {
                $foto = $request->file('foto');
                $filename = 'unit-' . time() . '.' . $foto->getClientOriginalExtension();
                $foto->storeAs('public/unit-usaha', $filename);

                // Hapus foto lama jika ada
                if ($unit->foto && Storage::exists('public/unit-usaha/' . $unit->foto)) {
                    Storage::delete('public/unit-usaha/' . $unit->foto);
                }

                $data['foto'] = $filename;
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

            if ($unit->foto && Storage::exists('public/unit-usaha/' . $unit->foto)) {
                Storage::delete('public/unit-usaha/' . $unit->foto);
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
