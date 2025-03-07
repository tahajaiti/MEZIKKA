<?php

use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;

class JwtService {

    protected string $secret;

    protected string $algo;


    public function __construct(){

        $this->secret = Config::get('app.jwt_secret', env('JWT_SECRET'));
        $this->algo = Config::get('app.jwt_algo', env('JWT_ALGO'));
    }

    public function generate(User $user){
        $payload = $this->getPayload($user);

        return JWT::encode($payload, $this->secret, $this->algo);
    }


    private function getPayload(User $user){
        return [
            'iss' => Config::get('app.name'),
            'sub' => $user->id,
            'iat' => Carbon::now(),
            'exp' => Carbon::now()->addHours(2)->timestamp,
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
        return $decode && isset($decode->sub);
    }

}
