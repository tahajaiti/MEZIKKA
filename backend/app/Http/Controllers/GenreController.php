<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Helpers\Res;
use App\Http\Requests\GenrePostRequest;
use App\Services\GenreService;

class GenreController extends Controller
{
    private GenreService $genreService;

    public function __construct(GenreService $genreService)
    {
        $this->genreService = $genreService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Res::success(Genre::all());
    }

    public function getImage(string $genre) {
        $res = $this->genreService->getImage($genre);
        if ($res) {
            return Res::success($res);
        }
        return Res::error('Failed to get genre image');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(GenrePostRequest $request)
    {
        $res = $this->genreService->create($request);

        if ($res) {
            return Res::success($res, 'Genre created successfully', 201);
        }

        return Res::error('Failed to create genre', 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(Genre $genre)
    {
        return Res::success($genre);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(GenrePostRequest $request, Genre $genre)
    {
        $res = $this->genreService->update($request, $genre);
        if ($res) {
            return Res::success($genre, 'Genre updated successfully', 200);
        }

        return Res::error('Failed to update genre', 400);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Genre $genre)
    {
        $res = $this->genreService->delete($genre);

        if ($res) {
            return Res::success(null, 'Genre deleted successfully', 200);
        }

        return Res::error('Failed to delete genre', 400);
    }
}
