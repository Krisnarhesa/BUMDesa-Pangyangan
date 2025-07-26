<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Spatie\Permission\Models\Role;
use Throwable;

class UserApiController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $users = User::with('roles')->get();
            $roles = Role::all();

            return response()->json([
                'success' => true,
                'message' => 'Daftar user berhasil diambil',
                'data' => [
                    'users' => $users,
                    'roles' => $roles
                ]
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data user: ' . $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
            'role' => 'required|exists:roles,id'
        ]);

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $role = Role::findById($request->role);
            $user->assignRole($role);

            return response()->json([
                'success' => true,
                'message' => 'User berhasil ditambahkan',
                'data' => $user->load('roles')
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan user: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateRole(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'role' => 'required|exists:roles,id'
        ]);

        try {
            $role = Role::findById($request->role);
            $user->syncRoles([$role]);

            return response()->json([
                'success' => true,
                'message' => 'Role user berhasil diperbarui',
                'data' => $user->load('roles')
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui role: ' . $e->getMessage()
            ], 500);
        }
    }

    public function resetPassword(User $user): JsonResponse
    {
        try {
            $newPassword = Str::random(8);
            $user->update(['password' => Hash::make($newPassword)]);

            // Di production, sebaiknya kirim password melalui email, bukan response langsung
            return response()->json([
                'success' => true,
                'message' => 'Password berhasil direset',
                'new_password' => $newPassword
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mereset password: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(User $user): JsonResponse
    {
        try {
            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User berhasil dihapus'
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus user: ' . $e->getMessage()
            ], 500);
        }
    }
}
