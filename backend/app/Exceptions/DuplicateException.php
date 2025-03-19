<?php

namespace App\Exceptions;

use Exception;
use App\Helpers\Res;
use Illuminate\Http\JsonResponse;

class DuplicateException extends Exception
{
    //
    public function render($request): JsonResponse {
        return Res::error( $this->getMessage() ?? 'Resource already exists' ,403);
    }
}