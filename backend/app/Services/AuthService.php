<?php
namespace App\Services;

use App\Facades\JWT;
use App\Helpers\Gen;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class AuthService {


    public function register(RegisterRequest $data){

        $user = User::create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => Hash::make($data->password),
        ]);

        $username = Gen::username($user->name);

        Profile::create([
            'username' => $username,
            'user_id' => $user->id
        ]);


        $token = JWT::generate($user);

        return $this->toToken($token);
    }


    public function login(LoginRequest $data){
        $user = User::where('email', $data->email)->first();

        if (!$user || !Hash::check($data->password, $user->password)) {
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