<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ProductApiController extends Controller
{
    // Ambil semua produk
    public function index(): JsonResponse
    {
        $products = Product::all();

        return response()->json([
            'success' => true,
            'message' => 'Daftar produk berhasil diambil',
            'data' => $products
        ]);
    }

    // Tambah produk baru
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'unit_usaha_id' => 'required|exists:unit_usaha,id',
            'nama' => 'required|string|max:255',
            'harga' => 'required|integer|min:0',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['unit_usaha_id', 'nama', 'harga', 'deskripsi']);

        if ($request->hasFile('gambar')) {
            $path = $request->file('gambar')->store("produk/{$data['unit_usaha_id']}", 'public');
            $data['gambar'] = $path;
        }

        $product = Product::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil ditambahkan',
            'data' => $product
        ]);
    }

    // Tampilkan detail produk
    public function show($id): JsonResponse
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Produk tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail produk berhasil diambil',
            'data' => $product
        ]);
    }

    /// Perbarui produk
public function update(Request $request, $id): JsonResponse
{
    $product = Product::find($id);

    if (!$product) {
        return response()->json([
            'success' => false,
            'message' => 'Produk tidak ditemukan',
        ], 404);
    }

    $request->validate([
        'unit_usaha_id' => 'sometimes|exists:unit_usaha,id',
        'nama' => 'sometimes|string|max:255',
        'harga' => 'sometimes|integer|min:0',
        'deskripsi' => 'nullable|string',
        'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
    ]);

    $data = $request->only(['unit_usaha_id', 'nama', 'harga', 'deskripsi']);

    if ($request->hasFile('gambar')) {
        // Gunakan unit_usaha_id baru jika tersedia, jika tidak pakai yang lama
        $unitUsahaId = $data['unit_usaha_id'] ?? $product->unit_usaha_id;

        // Buat nama file unik
        $fileName = uniqid() . '.' . $request->file('gambar')->getClientOriginalExtension();

        // Simpan file
        $path = $request->file('gambar')->storeAs("produk/{$unitUsahaId}", $fileName, 'public');
        $data['gambar'] = $path;

        // Hapus gambar lama jika ada
        if ($product->gambar && Storage::disk('public')->exists($product->gambar)) {
            Storage::disk('public')->delete($product->gambar);
        }
    }

    $product->update($data);
    $product->refresh();

    return response()->json([
        'success' => true,
        'message' => 'Produk berhasil diperbarui',
        'data' => $product
    ]);
}

    // Hapus produk
    public function destroy($id): JsonResponse
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Produk tidak ditemukan',
            ], 404);
        }

        // Hapus gambar jika ada
        if ($product->gambar && Storage::disk('public')->exists($product->gambar)) {
            Storage::disk('public')->delete($product->gambar);
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil dihapus'
        ]);
    }
}
