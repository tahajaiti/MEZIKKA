<?php

namespace App\Http\Controllers;

use App\Helpers\Res;
use App\Models\Playlist;
use App\Services\PlaylistService;
use App\Http\Requests\PlaylistPostRequest;
use App\Http\Requests\PlaylistUpdateRequest;
use Illuminate\Support\Facades\Gate;

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
        $res = $this->playlistService->index();
        if ($res) {
            return Res::success($res, 'Playlists retrieved successfully');
        }
        return Res::error('Failed to retrieve playlists');
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
        Gate::authorize('update', $playlist);
        $res = $this->playlistService->update($request, $playlist);

        return $res ? Res::success($res, 'Playlist updated successfully')
        : Res::error('Failed to update playlist');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Playlist $playlist)
    {
        Gate::authorize('delete', $playlist);
        $res = $this->playlistService->delete($playlist);
        return $res ? Res::success($res, 'Playlist deleted successfully')
        : Res::error('Failed to delete playlist');
    }
}