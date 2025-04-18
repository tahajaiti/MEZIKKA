<?php
namespace App\Services;

use App\Helpers\Gen;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Profile;
use App\Models\RefreshToken;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Request;


class AuthService
{


    public function register(RegisterRequest $data)
    {

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


        $refreshToken = Gen::refreshToken();
        $token = $user->createToken();

        RefreshToken::create([
            'user_id' => $user->id,
            'token' => $refreshToken,
            'expires_at' => now()->addDays(7),
        ]);

        return $this->toToken($token, $refreshToken, $user->load('profile'));
    }


    public function login(LoginRequest $data)
    {
        $user = User::where('email', $data->email)->first();

        if (!$user || !Hash::check($data->password, $user->password)) {
            return false;
        }

        $refreshToken = Gen::refreshToken();
        $token = $user->createToken();

        RefreshToken::create([
            'user_id' => $user->id,
            'token' => hash('sha256', $refreshToken),
            'expires_at' => now()->addDays(7),
        ]);

        return $this->toToken($token, $refreshToken, $user);
    }

    public function refresh(Request $request){
        $refreshToken = $request->get('refresh_token');
        $hashedToken = hash('sha256', $refreshToken);

        $token = RefreshToken::where('token', $hashedToken)
                ->where('expires_at', '>', now())
                ->first();

        if (!$token || $token->isExpired()) {
            return false;
        }

        $user = $token->user;
        $newToken = $user->createToken();

        return $this->toToken($newToken, $refreshToken, $user);
    }

    public function logout(Request $request)
    {
        $refreshToken = $request->get('refresh_token');
        $hashedToken = hash('sha256', $refreshToken);

        $token = RefreshToken::where('token', $hashedToken)->first();

        if ($token && !$token->isExpired()) {
            $token->revoke();
            return true;
        }
        return false;
    }

    private function toToken($token, $refreshToken, User $user)
    {
        return [
            'user' => $user->with('role', 'profile')->find($user->id),
            'token' => $token,
            'refresh_token' => $refreshToken,
            'token_type' => 'bearer',
        ];
    }
}
