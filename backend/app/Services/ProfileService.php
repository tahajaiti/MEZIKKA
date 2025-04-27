<?php
namespace App\Services;

use App\Contracts\IProfileService;
use App\Helpers\Gen;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileService implements IProfileService
{
    public function update(ProfileUpdateRequest $request)
    {
        $user = Auth::user();

        if (!$user) {
            return false;
        }

        $profile = $user->profile;
        $username = $request->username;

        if ($username !== $profile->username && Gen::check($username)) {
            return false;
        }

        if ($username !== $profile->username) {
            $username = Gen::username($username);
        }

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');

            if ($profile->avatar) {
                Storage::disk('public')->delete($profile->avatar);
            }

            $profile->avatar = $path;
        }

        $profile->username = $username;
        $profile->bio = $request->bio;

        $profile->save();

        return $profile;
    }
}