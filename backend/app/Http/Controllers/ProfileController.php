<?php

namespace App\Http\Controllers;

use App\Contracts\IProfileService;
use App\Helpers\Res;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{

    private IProfileService $profileService;

    public function __construct(IProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    public function show()
    {
        $user = Auth::user();

        if (!$user) {
            return Res::error('Unauthorized', 401);
        }

        return Res::success($user->load('profile'));
    }

    public function update(ProfileUpdateRequest $request){
        $result = $this->profileService->update($request);

        if ($result) {
            return Res::success($result, 'Profile updated successfully');
        }

        return Res::error('Failed to update profile',400);
    }


}
