<?php

namespace App\Http\Controllers;

use App\Facades\JWT;
use App\Helpers\ApiResponse;
use App\Services\ProfileService;
use Illuminate\Http\Request;

class ProfileController extends Controller
{

    private ProfileService $profileService;

    public function __construct(ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    public function show()
    {
        $user = JWT::user();

        if (!$user) {
            return ApiResponse::error('Unauthorized', 401);
        }

        return ApiResponse::success($user->profile);
    }


}