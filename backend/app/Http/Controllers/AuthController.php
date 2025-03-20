<?php

namespace App\Http\Controllers;

use App\Helpers\Res;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        $token = $this->authService->register($request);

        if (!$token) {
            return Res::error('Failed to register user', 500);
        }

        return Res::success($token, 'User registered successfully', 201);
    }

    public function login(LoginRequest $request)
    {
        $token = $this->authService->login($request);

        if (!$token) {
            return Res::error('Invalid credentials', 401);
        }

        return Res::success($token, 'Logged in successfully');
    }

    public function logout(Request $request)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return Res::error('Token not provided', 401);
        }

        // JWT::invalidate($token);
        return Res::success(null, 'Logged out successfully');
    }
}
