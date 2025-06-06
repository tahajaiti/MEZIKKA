<?php

namespace App\Services;

use App\Models\User;
use App\Models\Playlist;
use App\Contracts\IPlaylistService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PlaylistPostRequest;
use App\Http\Requests\PlaylistUpdateRequest;

class PlaylistService implements IPlaylistService
{


    public function index()
    {
        $user = Auth::user();

        $playlists = Playlist::where('user_id', $user->id)->with([
            'user.profile'
        ])->withCount('likes', 'songs')->get();

        return $playlists;
    }

    public function show(string $id)
    {

        $playlist = Playlist::with([
            'user.profile',
        ])
            ->withCount(['likes', 'songs'])
            ->findOrFail($id);


        return $playlist ?? null;
    }

    public function showSongs(string $id)
    {
        $playlist = Playlist::where('id', $id)->first();

        $songs = $playlist->songs()->with('user.profile')->paginate(6);
        return $songs ?? null;
    }

    public function paginateUserPlaylist(string $id)
    {
        $user = User::where('id', $id)->first();

        if (!$user) {
            return null;
        }

        $playlists = Playlist::where('user_id', $user->id)->paginate(10);

        return $playlists;
    }

    public function create(PlaylistPostRequest $request): ?Playlist
    {
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

    public function update(PlaylistUpdateRequest $request, Playlist $playlist)
    {
        $data = $request->validated();

        if ($request->hasFile('cover_file')) {
            if ($playlist->cover) {
                Storage::disk('public')->delete($playlist->cover);
            }
            $data['cover'] = $request->file('cover_file')->store('playlist/covers', 'public');
        }

        $data['title'] = $data['title'] ?? $playlist->title;
        $data['description'] = $data['description'] ?? $playlist->description;

        $updated = $playlist->update($data);

        return $updated ? $playlist : null;
    }


    public function delete(Playlist $playlist): bool
    {
        if ($playlist && $playlist->cover) {
            Storage::disk('public')->delete($playlist->cover);
        }

        return $playlist->delete() ? true : false;
    }

}
