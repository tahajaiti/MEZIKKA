<?php

namespace App\Http\Controllers;

use App\Helpers\Res;
use App\Services\PlaylistItemService;

class PlaylistItemController extends Controller
{
    private PlaylistItemService $playlistItemService;

    public function __construct(PlaylistItemService $playlistItemService) {
        $this->playlistItemService = $playlistItemService;
    }


    public function add(string $playlistId, string $songId){
        $res = $this->playlistItemService->add($playlistId, $songId);

        return $res ? Res::success($res) : Res::error();
    }

    public function remove(string $playlistId, string $songId){
        $res = $this->playlistItemService->remove($playlistId, $songId);

        return $res ? Res::success($res) : Res::error();
    }
}
