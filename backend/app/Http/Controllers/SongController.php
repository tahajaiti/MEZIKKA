<?php

namespace App\Http\Controllers;

use App\Contracts\ISongService;
use App\Helpers\Res;
use App\Http\Requests\SongPostRequest;
use App\Http\Requests\SongUpdateRequest;
use App\Models\Song;
use Illuminate\Support\Facades\Gate;

class SongController extends Controller
{

    private ISongService $songService;

    public function __construct(ISongService $songService)
    {
        $this->songService = $songService;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $res = $this->songService->index(false);
        if ($res){
            return Res::success($res);
        }

        return Res::error('Failed to get songs');
    }

    public function userSongs(string $id) {
        $res = $this->songService->userSongs($id);
        if ($res){
            return Res::success($res);
        }

        return Res::error('Failed to get user songs');
    }


    public function getByGenre(string $genre) {
        $res = $this->songService->getByGenre($genre);
        if ($res){
            return Res::success($res);
        }
        return Res::error('Failed to get songs by genre');
    }

    public function getMostLiked() {
        $res = $this->songService->getMostLiked(false);
        if ($res){
            return Res::success($res);
        }
        return Res::error('Failed to get most liked songs');
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
    public function show(string $id)
    {
        $res = $this->songService->show($id);

        if ($res){
            return Res::success($res, 'Song retrieved successfully');
        }

        return Res::error('Failed to find song', 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SongUpdateRequest $request, string $songId)
    {
        Gate::authorize('update', Song::where('id', $songId)->first());
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
        Gate::authorize('delete', Song::where('id', $id)->first());
        $res = $this->songService->destroy($id);
        return $res ? Res::success(null, 'Song deleted successfully', 200)
            : Res::error('Failed to delete song', 400);
    }
}