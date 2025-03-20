<?php

namespace App\Http\Controllers;

use App\Helpers\Res;
use App\Services\LikeService;

class LikeController extends Controller
{
    private LikeService $likeService;

    public function __construct(LikeService $likeService)
    {
        $this->likeService = $likeService;
    }


    public function toggleLike(string $type, string $id)
    {
        $like = $this->likeService->toggleLike($type, $id);

        if ($like) {
            return Res::success(null, "$type $like");
        }
        return Res::error('Something went wrong', 500);
    }

    public function getLikes()
    {
        $likes = $this->likeService->getLikes();
        return Res::success($likes);
    }

    public function getLikeCount(string $type, string $id)
    {
        $like = $this->likeService->getLikeCount($type, $id);
        if ($like) {
            return Res::success($like, 'Like count retrieved');
        }

        return Res::error('Something went wrong', 500);
    }
}
