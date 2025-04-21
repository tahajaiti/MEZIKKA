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


    public function index() {
        $likes = $this->likeService->index();
        return Res::success($likes);
    }

    public function toggleLike(string $type, string $id)
    {
        $like = $this->likeService->toggleLike($type, $id);

        if ($like) {
            return Res::success(null, "$type $like");
        }
        return Res::error('Something went wrong', 500);
    }

    public function getLikeCount(string $type, string $id)
    {
        $like = $this->likeService->getLikeCount($type, $id);
        if ($like) {
            return Res::success($like);
        }

        return Res::error('Something went wrong', 500);
    }
}
