<?php

namespace App\Policies;

use App\Exceptions\UnauthorizedException;
use App\Helpers\Res;
use App\Models\User;

class FollowPolicy
{
    public function follow(User $follower, User $following) {
        if ($follower->id === $following->id) {
            return false;
        }
    }

    public function unfollow(User $follower, User $following) {
        if ($follower->id === $following->id) {
            return false;
        }
    }
}
