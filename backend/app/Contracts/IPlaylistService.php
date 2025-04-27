<?php

namespace App\Contracts;

use App\Models\Playlist;
use App\Http\Requests\PlaylistPostRequest;
use App\Http\Requests\PlaylistUpdateRequest;

interface IPlaylistService
{
    public function index();

    public function show(string $id);

    public function showSongs(string $id);

    public function paginateUserPlaylist(string $id);

    public function create(PlaylistPostRequest $request): ?Playlist;

    public function update(PlaylistUpdateRequest $request, Playlist $playlist);

    public function delete(Playlist $playlist): bool;
}
