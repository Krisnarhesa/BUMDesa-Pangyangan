<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthApiController extends Controller
{
    /**
     * Handle API login request.
     */
    public function login(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Login Failed',
                'data' => $validator->errors()
            ], 422);
        }

        // Coba login
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Login Failed. Email or password is incorrect.',
                'data' => null
            ], 401);
        }

        // Jika login berhasil
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login Success',
            'data' => [
                'token' => $token,
                'name' => $user->name,
                'email' => $user->email,
            ]
        ]);
    }

    /**
     * Handle API logout request.
     */
    public function logout(Request $request)
{
    if (!$request->user()) {
        return response()->json([
            'success' => false,
            'message' => 'Logout failed. Token not provided or invalid.',
        ], 401);
    }

    $accessToken = $request->user()->currentAccessToken();

    if (!$accessToken) {
        return response()->json([
            'success' => false,
            'message' => 'Logout failed. Access token not found.',
        ], 401);
    }

    $accessToken->delete();

    return response()->json([
        'success' => true,
        'message' => 'Logout Success',
    ]);
}

}
