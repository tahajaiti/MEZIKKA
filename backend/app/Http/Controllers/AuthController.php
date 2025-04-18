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

        return Res::success($token['data'], 'User registered successfully', 201, $token['refresh_token_cookie']);
    }

    public function login(LoginRequest $request)
    {
        $token = $this->authService->login($request);

        if (!$token) {
            return Res::error('Invalid credentials', 401);
        }

        return Res::success($token['data'], 'Logged in successfully', 200, $token['refresh_token_cookie']);
    }

    public function logout(Request $request)
    {
        $token = $this->authService->logout($request);

        if (!$token) {
            return Res::error('Token not provided', 401);
        }

        // JWT::invalidate($token);
        return Res::success(null, 'Logged out successfully', $token);
    }

    public function refresh(Request $request)
    {
        $token = $this->authService->refresh($request);

        if (!$token) {
            return Res::error('Token not provided', 401);
        }

        return Res::success($token['data'], 'Token refreshed successfully', 200, $token['refresh_token_cookie']);
    }
}
