<?php

namespace App\Http\Controllers;

use App\Helpers\Res;
use App\Services\FollowService;

class FollowController extends Controller
{

    private FollowService $followService;

    public function __construct(FollowService $followService)
    {
        $this->followService = $followService;
    }

    public function follow(string $id)
    {
        $res = $this->followService->follow($id);

        return $res
            ? Res::success(null, 'Followed', 200)
            : Res::error('Failed to follow user', 500);
    }

    public function unfollow(string $id)
    {
        $res = $this->followService->unfollow($id);

        return $res
            ? Res::success(null, 'Unfollowed', 200)
            : Res::error('Failed to unfollow user', 500);
    }

    public function myFollows(){
        $follows = $this->followService->myFollows();

        return $follows
            ? Res::success($follows, 'Follows', 200)
            : Res::error('Failed to get follows', 500);
    }

    public function myFollowers(){
        $follows = $this->followService->myFollowers();

        return $follows
            ? Res::success($follows, 'Followers', 200)
            : Res::error('Failed to get followers', 500);
    }

}
