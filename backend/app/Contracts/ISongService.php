<?php

namespace App\Contracts;

use App\Models\Song;
use App\Http\Requests\SongPostRequest;

interface ISongService
{
    public function index($paginate = true);

    public function getMostLiked($paginate = true);

    public function getByGenre(string $genre, $paginate = true);

    public function userSongs(string $id);

    public function show(string $songId): ?Song;

    public function create(SongPostRequest $request): ?Song;


    public function destroy(string $songId): bool;

}
