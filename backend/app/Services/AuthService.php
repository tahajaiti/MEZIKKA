<?php
namespace App\Services;

use App\Helpers\Gen;
use App\Models\User;
use App\Models\Profile;
use App\Models\RefreshToken;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;


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
            'token' => hash('sha256', $refreshToken),
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

    public function refresh(Request $request)
    {
        $refreshToken = $request->cookie('refresh_token');

        if (!$refreshToken) {
            return false;
        }

        $hashedToken = hash('sha256', $refreshToken);

        $tokenRecord = RefreshToken::where('token', $hashedToken)->first();


        if (!$tokenRecord || $tokenRecord->isExpired()) {
            return false;
        }

        $user = $tokenRecord->user;
        $newToken = $user->createToken();

        return $this->toToken($newToken, $refreshToken, $user);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        $refreshToken = $request->cookie('refresh_token');

        if (!$refreshToken) {
            return null;
        }

        $hashedToken = hash('sha256', $refreshToken);

        $token = RefreshToken::where('token', $hashedToken)
            ->where('user_id', $user->id)
            ->first();

        if ($token) {
            $token->revoke();
        }

        return Cookie::forget('refresh_token');
    }

    private function toToken($token, $refreshToken, User $user)
    {
        $cookie = Cookie::make('refresh_token', $refreshToken, 60 * 24 * 7, '/', null, false, true, false, null);

        return [
            'data' => [
                'user' => $user->with('role', 'profile')->find($user->id),
                'token' => $token,
                'token_type' => 'bearer',
            ],
            'refresh_token_cookie' => $cookie,
        ];
    }
}
