<?php
namespace App\Services;

use App\Facades\JWT;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


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

        $token = JWT::generate($user);

        return $this->toToken($token);
    }


    public function login(array $data){
        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return false;
        }

        $token = JWT::generate($user);

        return $this->toToken($token);
    }


    private function toToken($token){
        return [
            'token' => $token,
            'token_type' => 'bearer',
        ];
    }
}