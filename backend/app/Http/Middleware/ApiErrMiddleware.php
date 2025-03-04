<?php

namespace App\Http\Middleware;

use Closure;
use App\Helpers\ApiResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiErrMiddleware
{
    /**
     * Handle an incoming request.
     * Catches any errors and returns an instance of ApiResponse
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            return $next($request);
        } catch (\Throwable $e) {
            return ApiResponse::error($e->getMessage(), 500);
        }
    }
}