<?php

namespace App\Services;

use App\Exceptions\DuplicateException;
use App\Exceptions\NotFoundException;
use App\Models\Song;
use App\Models\Playlist;
use App\Models\PlaylistItem;

class PlaylistItemService
{


    public function add(string $playlistId, string $songId)
    {
        $deja = PlaylistItem::where("playlist_id", $playlistId)
            ->where('song_id', $songId)->exists();

        if ($deja) {
            throw new DuplicateException('Song already exists');
        }

        $song = Song::where('id', $songId)->first();

        $nextOrder = PlaylistItem::nextOrder($playlistId);

        $playlistItem = PlaylistItem::create([
            'playlist_id' => $playlistId,
            'song_id' => $song->id,
            'order' => $nextOrder
        ]);

        $playlist = Playlist::with('songs')->where('id', $playlistId)->first();

        return $playlistItem ? $playlist : null;
    }

    public function remove(string $playlistId, string $songId)
    {
        $playlistItem = PlaylistItem::where("playlist_id", $playlistId)
            ->where('song_id', $songId)->first();

        if (!$playlistItem) {
            throw new NotFoundException('Song does not exist in the playlist');
        }

        $deletedOrder = $playlistItem->order;

        $res = $playlistItem->delete();

        PlaylistItem::where('playlist_id', $playlistId)
                ->where('order', '>', $deletedOrder)
                ->decrement('order');

        return $res ? true : false;
    }


}
