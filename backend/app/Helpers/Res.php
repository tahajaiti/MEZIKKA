<?php
namespace App\Helpers;

use Symfony\Component\HttpFoundation\Cookie as CookieInstance;

class Res
{
    public static function success($data, $message = 'success', $code = 200, $cookie = null): \Illuminate\Http\JsonResponse
    {
        $response = response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], $code);

        if ($cookie && $cookie instanceof CookieInstance) {
            $response->withCookie($cookie);
        }

        return $response;
    }

    public static function error($message = 'error', $code = 400): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'data' => null,
        ], $code);
    }
}
