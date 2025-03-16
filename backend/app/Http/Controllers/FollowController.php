<?php

namespace App\Http\Controllers;

use App\Facades\JWT;
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

    // public function myFollows(){
    //     $user = JWT::user();

    //     $follows = $user->following()->get();

    //     return $follows
    //         ? Res::success($follows, 'Follows', 200)
    //         : Res::error('Failed to get follows', 500);
    // }

}
