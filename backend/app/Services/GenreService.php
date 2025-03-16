<?php

namespace App\Services;

use App\Http\Requests\GenrePostRequest;
use App\Models\Genre;

class GenreService
{



    public function create(GenrePostRequest $request): ?Genre
    {
        $genre = Genre::create($request->validated());
        if ($genre) {
            return $genre;
        }
        return null;
    }

    public function update(GenrePostRequest $request, Genre $genre): ?Genre {
        $res = $genre->update($request->validated());

        if ($res) {
            return $genre;
        }
        return null;
    }

    public function delete(Genre $genre): bool {
        $res = $genre->delete();
        if ($res) {
            return true;
        }

        return false;
    }

}
