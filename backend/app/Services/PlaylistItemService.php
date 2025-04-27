<?php

namespace App\Services;

use App\Exceptions\DuplicateException;
use App\Exceptions\NotFoundException;
use App\Models\Song;
use App\Models\Playlist;
use App\Models\PlaylistItem;
use App\Contracts\IPlaylistItemService;

class PlaylistItemService implements IPlaylistItemService
{
    public function add(string $playlistId, string $songId): ?Playlist
    {
        $alreadyExists = PlaylistItem::where('playlist_id', $playlistId)
            ->where('song_id', $songId)
            ->exists();

        if ($alreadyExists) {
            throw new DuplicateException('Song already exists in the playlist.');
        }

        $song = Song::findOrFail($songId);

        $nextOrder = PlaylistItem::nextOrder($playlistId);

        PlaylistItem::create([
            'playlist_id' => $playlistId,
            'song_id' => $song->id,
            'order' => $nextOrder
        ]);

        return Playlist::with('songs')->find($playlistId);
    }

    public function remove(string $playlistId, string $songId): bool
    {
        $playlistItem = PlaylistItem::where('playlist_id', $playlistId)
            ->where('song_id', $songId)
            ->first();

        if (!$playlistItem) {
            throw new NotFoundException('Song does not exist in the playlist.');
        }

        $deletedOrder = $playlistItem->order;

        $playlistItem->delete();

        PlaylistItem::where('playlist_id', $playlistId)
            ->where('order', '>', $deletedOrder)
            ->decrement('order');

        return true;
    }
}
