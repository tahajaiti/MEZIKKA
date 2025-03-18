<?php

namespace App\Http\Controllers;

use App\Facades\JWT;
use App\Helpers\Res;
use App\Http\Requests\ProfileUpdateRequest;
use App\Services\ProfileService;

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
            return Res::error('Unauthorized', 401);
        }

        return Res::success($user->profile);
    }

    public function update(ProfileUpdateRequest $request){
        $result = $this->profileService->update($request);

        if ($result) {
            return Res::success($result, 'Profile updated successfully');
        }

        return Res::error('Failed to update profile',400);
    }


}