<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Helpers\ApiResponse;
use App\Http\Requests\GenrePostRequest;
use Illuminate\Http\Request;
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
        return Genre::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(GenrePostRequest $request)
    {
        $res = $this->genreService->create($request);

        if ($res) {
            return ApiResponse::success($res, 'Genre created successfully', 201);
        }

        return ApiResponse::error('Failed to create genre', 400);


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
