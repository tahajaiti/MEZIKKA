<?php

namespace App\Http\Middleware;

use Closure;
use Throwable;
use App\Helpers\Res;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiErrMiddleware
{
    /**
     * Handle an incoming request.
     * Catches any errors and returns an instance of Response
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            return $next($request);
        } catch (Throwable $e) {
            return Res::error($e->getMessage(), 500);
        }
    }
}
