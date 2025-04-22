<?php

namespace App\Services;

use App\Models\Playlist;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PlaylistPostRequest;
use App\Http\Requests\PlaylistUpdateRequest;

class PlaylistService {


    public function index(){

        $playlists = Playlist::with([
            'user.profile'
        ])->withCount('likes', 'songs')->get();

        return $playlists;
    }

    public function create(PlaylistPostRequest $request): ?Playlist{
        $user = Auth::user();

        $path = $request->hasFile('cover_file') ? $request->file('cover_file')->store('playlist/covers', 'public') : null;

        $playlist = Playlist::create([
            'title' => $request->title,
            'description' => $request->description ?? '',
            'cover' => $path,
            'user_id' => $user->id
        ]);

        return $playlist ? $playlist : null;
    }

    public function update(PlaylistUpdateRequest $request, Playlist $playlist) {
        $path = $request->hasFile('cover_file') ? $request->file('cover_file')->store('playlist/covers', 'public') : null;

        if ($playlist && $playlist->cover && $path) {
            Storage::disk('public')->delete($playlist->cover);
        }

        $data = $request->validated();
        $data['cover'] = $path;
        $data['title'] = $request->title ?? $playlist->title;
        $data['description'] = $request->description ?? $playlist->description;

        $res = $playlist->update($data);

        return $res ? $request : null;
    }

    public function delete(Playlist $playlist): bool {
        if ($playlist && $playlist->cover) {
            Storage::disk('public')->delete($playlist->cover);
        }

        return $playlist->delete() ? true : false;
    }

}
