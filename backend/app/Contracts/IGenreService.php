<?php

namespace App\Contracts;

use App\Http\Requests\GenrePostRequest;
use App\Models\Genre;

interface IGenreService
{
    public function getImage(string $genre): ?string;

    public function create(GenrePostRequest $request): ?Genre;

    public function update(GenrePostRequest $request, Genre $genre): ?Genre;

    public function delete(Genre $genre): bool;
}
