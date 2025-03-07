<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'string|required|min:3',
            'email' => 'email|required|unique:users',
            'password' => 'string|required|min:6',
            'role' => 'string|required|in:artist,listener'
        ]);

        $token = $this->authService->register($data);

        if (!$token) {
            return ApiResponse::error('Failed to register user', 500);
        }

        return ApiResponse::success($token, 'User registered successfully', 201);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'email|required|exists:users,email',
            'password' => 'required|string',
        ]);

        $token = $this->authService->login($data);

        if (!$token) {
            return ApiResponse::error('Invalid credentials', 401);
        }

        return ApiResponse::success($token, 'Logged in successfully');
    }

    public function logout(Request $request)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return ApiResponse::error('Token not provided', 401);
        }

        // JWT::invalidate($token);
        return ApiResponse::success(null, 'Logged out successfully');
    }
}
