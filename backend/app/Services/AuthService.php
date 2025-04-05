<?php
namespace App\Services;

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


        $token = $user->createToken();

        return $this->toToken($token, $user);
    }


    public function login(LoginRequest $data){
        $user = User::where('email', $data->email)->first();

        if (!$user || !Hash::check($data->password, $user->password)) {
            return false;
        }

        $token = $user->createToken();

        return $this->toToken($token, $user);
    }


    private function toToken($token, User $user){
        return [
            'user' => $user->with('role')->find($user->id),
            'token' => $token,
            'token_type' => 'bearer',
        ];
    }
}