<?php

namespace App\Exceptions;

use App\Helpers\Res;
use Exception;
use Illuminate\Http\JsonResponse;

class UnauthorizedException extends Exception
{
    public function render($request): JsonResponse {
        return Res::error( $this->getMessage() ?? 'You are not authorized to perform this action' ,403);
    }
}