<?php

namespace App\Http\Controllers;

use App\Contracts\ILikeService;
use App\Helpers\Res;

class LikeController extends Controller
{
    private ILikeService $likeService;

    public function __construct(ILikeService $likeService)
    {
        $this->likeService = $likeService;
    }


    public function index() {
        $likes = $this->likeService->index();
        return Res::success($likes);
    }

    public function getLikedSongs()
    {
        $likes = $this->likeService->getLikedSongs();
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
