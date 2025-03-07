<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Profile;
use App\Http\Services\ProfileService;

class ProfileController extends Controller
{

    private ProfileService $profileService;

    public function __construct(ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    public function show(Profile $profile)
    {
        $profile->user;
        return ApiResponse::success($profile);
    }

}
