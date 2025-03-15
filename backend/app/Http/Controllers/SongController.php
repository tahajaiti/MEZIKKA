<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\SongPostRequest;
use App\Models\Song;
use App\Services\SongService;
use Illuminate\Http\Request;

class SongController extends Controller
{

    private SongService $songService;

    public function __construct(SongService $songService)
    {
        $this->songService = $songService;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Song::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SongPostRequest $request)
    {
        $res = $this->songService->create($request);

        if ($res) {
            return ApiResponse::success($res, 'Song created successfully', 201);
        }

        return ApiResponse::error('Failed to create song', 400);
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
