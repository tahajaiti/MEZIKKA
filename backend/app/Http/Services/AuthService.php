<?php
namespace App\Http\Services;

use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;


class AuthService {


    public function register(array $data){

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role_id' => $data['role'] === 'artist' ? 2 : 3
        ]);

        Profile::create([
            'user_id' => $user->id
        ]);

        $token = JWTAuth::fromUser($user);

        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ];
    }

}