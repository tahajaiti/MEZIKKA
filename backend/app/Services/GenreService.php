<?php

namespace App\Services;

use App\Http\Requests\GenrePostRequest;
use App\Models\Genre;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class GenreService
{

    public function getImage(string $genre)
    {

        $cacheKey = "pexels_img_$genre";

        $imgUrl = Cache::remember($cacheKey, now()->addDays(7), function () use ($genre) {
            $request = Http::withHeaders([
                'Authorization' => env('PIXELS_API_KEY'),
            ])->get('https://api.pexels.com/v1/search', [
                        'query' => $genre,
                        'per_page' => 1,
                    ]);

            if ($request->successful()) {
                $photo = $request->json('photos.0.src.landscape');
                return $photo;
            }

            return null;
        });



        return $imgUrl;
    }

    public function create(GenrePostRequest $request): ?Genre
    {
        $genre = Genre::create($request->validated());
        if ($genre) {
            return $genre;
        }
        return null;
    }

    public function update(GenrePostRequest $request, Genre $genre): ?Genre
    {
        $res = $genre->update($request->validated());

        if ($res) {
            return $genre;
        }
        return null;
    }

    public function delete(Genre $genre): bool
    {
        $res = $genre->delete();
        if ($res) {
            return true;
        }

        return false;
    }

}
