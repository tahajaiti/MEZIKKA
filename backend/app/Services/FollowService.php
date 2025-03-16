<?php

namespace App\Services;

use App\Facades\JWT;
use App\Models\Follow;
use App\Models\Profile;


class FollowService {



    public function follow(string $id): bool{
        $user = JWT::user();

        $toFollow = Profile::with('user')->where('id', $id)->first();

        $follow = Follow::create([
            'follower_id' => $user->id,
            'following_id' => $toFollow->user->id
        ]);

        return $follow ? true : false;
    }

    public function unfollow(string $id): bool{
        $user = JWT::user();

        $toFollow = Profile::with('user')->where('id', $id)->first();

        $follow = Follow::where('follower_id', $user->id)
            ->where('following_id', $toFollow->user->id)
            ->delete();

        return $follow ? true : false;
    }

    public function myFollows(){
        $user = JWT::user();
        $follows = $user->following()->get();
        return $follows;
    }

    public function myFollowers(){
        $user = JWT::user();
        $follows = $user->followers()->get();
        return $follows;
    }


}
