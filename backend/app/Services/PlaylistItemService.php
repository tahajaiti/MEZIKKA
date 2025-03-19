<?php

namespace App\Services;

use App\Models\Song;
use App\Models\Playlist;
use App\Models\PlaylistItem;

class PlaylistItemService {


    public function add(string $playlistId, string $songId){
        $playlist = Playlist::where('id', $playlistId)->first();
        $song = Song::where('id', $songId)->first();

        $nextOrder = PlaylistItem::nextOrder($playlistId);

        return $playlist;
    }


}
