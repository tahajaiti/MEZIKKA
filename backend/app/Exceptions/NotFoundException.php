<?php

namespace App\Exceptions;

use Exception;
use App\Helpers\Res;
use Illuminate\Http\JsonResponse;

class NotFoundException extends Exception
{
    //
    public function render($request): JsonResponse {
        return Res::error( $this->getMessage() ?? 'Resource does not exist' ,404);
    }
}
