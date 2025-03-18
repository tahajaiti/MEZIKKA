<?php

namespace App\Http\Middleware;

use App\Facades\JWT;
use App\Helpers\Res;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $jwt = $request->bearerToken();
        if (empty($jwt)) {
            return Res::error('No Token', 401);
        }

        try {
            JWT::validate($jwt);
            $user = JWT::user();
            Auth::setUser($user);
        } catch (Exception $e) {
            return Res::error('Unauthorized', 401);
        }


        return $next($request);
    }
}
