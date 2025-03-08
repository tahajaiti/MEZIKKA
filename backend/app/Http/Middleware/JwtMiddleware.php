<?php

namespace App\Http\Middleware;

use App\Facades\JWT;
use App\Helpers\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        try {
            JWT::validate($request->bearerToken());
        } catch (JWTException $e) {
            return ApiResponse::error('Unauthorized', 401);
        }


        return $next($request);
    }
}