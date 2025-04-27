<?php

namespace App\Contracts;

use App\Models\Playlist;

interface IPlaylistItemService
{
    public function add(string $playlistId, string $songId): ?Playlist;

    public function remove(string $playlistId, string $songId): bool;
}
