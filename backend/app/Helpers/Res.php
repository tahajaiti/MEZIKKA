<?php
namespace App\Helpers;


class Res {
    public static function success($data, $message = 'success', $code = 200): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    public static function error($message = 'error', $code = 400): \Illuminate\Http\JsonResponse {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'data' => null,
        ], $code);
    }
}
