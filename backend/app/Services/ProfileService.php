<?php
namespace App\Services;

use App\Facades\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileService
{


    public function update(Request $request)
    {
        $user = JWT::user();
        $profile = $user->profile;

        $path = $request->hasFile('avatar') ? $request->file('avatar')->store('avatars', 'public') : null;

        if ($profile->avatar && $path) {
            Storage::disk('public')->delete($profile->avatar);
        }

        $profile->avatar = $path;
        $profile->bio = $request->bio;

        $profile->save();

        return $profile;
    }




}