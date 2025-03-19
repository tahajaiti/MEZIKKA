<?php

namespace App\Http\Controllers;

use App\Helpers\Res;
use App\Models\Playlist;
use Illuminate\Http\Request;
use App\Services\PlaylistService;
use App\Http\Requests\PlaylistPostRequest;
use App\Http\Requests\PlaylistUpdateRequest;

class PlaylistController extends Controller
{
    private PlaylistService $playlistService;

    public function __construct(PlaylistService $playlistService)
    {
        $this->playlistService = $playlistService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PlaylistPostRequest $request)
    {
        $res = $this->playlistService->create($request);

        return $res ? Res::success($res, 'Playlist created successfully')
            : Res::error('Failed to create playlist');

    }

    /**
     * Display the specified resource.
     */
    public function show(Playlist $playlist)
    {
        return $playlist;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PlaylistUpdateRequest $request, Playlist $playlist)
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