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

        return $this->toToken($token);
    }


    public function login(array $data){
        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return false;
        }

        $token = JWTAuth::fromUser($user);

        return $this->toToken($token);
    }

    private function toToken($token){
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ];
    }
}