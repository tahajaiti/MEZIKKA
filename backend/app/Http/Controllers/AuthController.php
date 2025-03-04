<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    protected AuthService $authService;

    public function __construct(AuthService $authService){
        $this->authService = $authService;
    }



    public function register(Request $request){
        $data = $request->validate([
            'name' => 'string|required|min:3',
            'email' => 'email|required|unique:users',
            'password' => 'string|required|min:6'
        ]);

        $user = !$this->authService->register($data);

        if (!$user){
            return ApiResponse::error('Failed to register user', 500);
        }

        return ApiResponse::success($user,'User registered successfully', 201);
    }
}