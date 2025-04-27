<?php

namespace App\Http\Controllers;

use App\Contracts\IPlaylistItemService;
use App\Helpers\Res;

class PlaylistItemController extends Controller
{
    private IPlaylistItemService $playlistItemService;

    public function __construct(IPlaylistItemService $playlistItemService) {
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
