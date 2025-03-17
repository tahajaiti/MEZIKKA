<?php

namespace App\Http\Controllers;

use App\Helpers\Res;
use App\Http\Requests\SongPostRequest;
use App\Http\Requests\SongUpdateRequest;
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
            return Res::success($res, 'Song created successfully', 201);
        }

        return Res::error('Failed to create song', 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(Song $song)
    {
        return Res::success($song);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SongUpdateRequest $request, string $songId)
    {
        $res = $this->songService->update($request, $songId);
        return $res ?
            Res::success($res, 'Song updated succesfully', 200)
            : Res::error('Failed to update song', 400);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
