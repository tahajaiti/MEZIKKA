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

}