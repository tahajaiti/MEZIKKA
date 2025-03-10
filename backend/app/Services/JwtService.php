<?php

namespace App\Services;

use App\Helpers\ApiResponse;
use Exception;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;

class JwtService {

    protected string $secret;

    protected string $algo;

    protected string $token;


    public function __construct(){

        $this->secret = Config::get('jwt.secret', env('JWT_SECRET'));
        $this->algo = Config::get('jwt.algo', env('JWT_ALGO'));
    }

    public function generate(User $user){
        $payload = $this->payload($user);

        return JWT::encode($payload, $this->secret, $this->algo);
    }


    private function payload(User $user){
        return [
            'iss' => Config::get('app.name'),
            'sub' => $user->id,
            'iat' => Carbon::now()->timestamp,
            'exp' => Carbon::now()->addHours(6)->timestamp,
        ];
    }

    public function decode(string $token){
        try {
            return JWT::decode($token, new Key($this->secret, $this->algo));
        } catch (Exception $e) {
            return null;
        }
    }

    public function validate(string $token){
        $decode = $this->decode($token);
        $this->token = $token;

        if (!$decode){
            throw new Exception('Invalid token');
        }

        return true;
    }

    public function user(){

        $decoded = $this->decode($this->token);

        return User::find($decoded->sub);
    }

    // public function get(string $token, string $key){
    //     $decode = $this->decode($token);

    //     if (isset($key)){
    //         return $decode->$key;
    //     }

    //     return $decode;
    // }

}
