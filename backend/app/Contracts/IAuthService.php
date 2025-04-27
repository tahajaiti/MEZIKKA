<?php

namespace App\Contracts;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;

interface IAuthService
{
    public function register(RegisterRequest $data);

    public function login(LoginRequest $data);

    public function refresh(Request $request);

    public function logout(Request $request);

}
