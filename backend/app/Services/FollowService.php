<?php

namespace App\Services;

use App\Models\Follow;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;


class FollowService
{



    public function follow(string $id): bool
    {
        $user = Auth::user();

        $toFollow = Profile::with('user')->where('id', $id)->first();

        $follow = Follow::create([
            'follower_id' => $user->id,
            'following_id' => $toFollow->user->id
        ]);

        return $follow ? true : false;
    }

    public function unfollow(string $id): bool
    {
        $user = Auth::user();

        $toFollow = Profile::with('user')->where('id', $id)->first();

        $follow = Follow::where('follower_id', $user->id)
            ->where('following_id', $toFollow->user->id)
            ->delete();

        return $follow ? true : false;
    }

    public function myFollows()
    {
        $user = Auth::user();
        $follows = $user->following()->get();
        $followCount = $user->following()->count();
        return [
            'follows' => $follows,
            'followCount' => $followCount
        ];
    }

    public function myFollowers()
    {
        $user = Auth::user();
        $follows = $user->followers()->get();
        $followCount = $user->followers()->count();
        return [
            'follows' => $follows,
            'followCount' => $followCount
        ];
    }

    public function follows(){
        $user = Auth::user();
        $follows = $user->following()->get();
        $followCount = $user->following()->count();

        $followers = $user->followers()->get();
        $followerCount = $user->followers()->count();

        return [
            'follows' => $follows,
            'followCount' => $followCount,
            'followers' => $followers,
            'followerCount' => $followerCount
        ];
    }

}
