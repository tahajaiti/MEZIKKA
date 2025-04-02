<?php
namespace App\Services;

use App\Helpers\Gen;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileService
{
    public function update(ProfileUpdateRequest $request)
    {
        $user = Auth::user();

        if (!$user) {
            return false;
        }

        $profile = $user->profile;
        $username = $request->username;

        if (!$username || Gen::check($username)) {
            return false;
        }

        $path = $request->hasFile('avatar') ? $request->file('avatar')->store('avatars', 'public') : null;

        if ($profile->avatar && $path) {
            Storage::disk('public')->delete($profile->avatar);
        }

        if ($path) {
            $profile->avatar = $path;
        }

        $profile->username = $username;
        $profile->bio = $request->bio;

        $profile->save();

        return $profile;
    }
}
