<?php

namespace App\Http\Controllers;

use App\Helpers\Res;
use App\Http\Requests\PlaylistPostRequest;
use App\Services\PlaylistService;
use Illuminate\Http\Request;

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