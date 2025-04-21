<?php

namespace App\Services;

use App\Models\Song;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\SongPostRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\SongUpdateRequest;
use App\Exceptions\UnauthorizedException;

class SongService
{

    public function index()
    {
        $user = Auth::user();

        $songs = Song::with(['user.profile', 'genre'])
            ->withCount('likes')
            ->latest()->limit(10)->get();

        if ($user) {
            $likedSongIds = $user->likes()
                ->where('likeable_type', Song::class)
                ->pluck('likeable_id')->toArray();

            $songs->each(function ($song) use ($likedSongIds) {
                $song->liked_by_user = in_array($song->id, $likedSongIds);
            });
        } else {
            $songs->each(function ($song) {
                $song->liked_by_user = false;
            });
        }

        return $songs;
    }


    public function userSongs(string $id)
    {
        $user = User::findOrFail($id);
        $songs = Song::where('user_id', $user->id)->paginate(10);

        return $songs;
    }

    public function show(string $songId): ?Song
    {
        $song = Song::with(['user.profile', 'genre'])
            ->withCount('likes')
            ->findOrFail($songId);

        return $song ?? null;
    }


    public function create(SongPostRequest $request): ?Song
    {
        $user = Auth::user();
        $data = $request->validated();
        $data['user_id'] = $user->id;

        $song_path = $request->hasFile('song_file') ? $request->file('song_file')->store('songs/files', 'public') : null;
        $cover_path = $request->hasFile('cover_file') ? $request->file('cover_file')->store('songs/covers', 'public') : null;

        $data['file_path'] = $song_path;
        $data['cover_path'] = $cover_path;
        $data['metadata'] = json_decode($data['metadata']);
        $data['description'] = $request->has('description') ? $request->input('description') : null;
        $data['genre_id'] = $request->has('genre_id') ? $request->input('genre_id') : null;

        $song = Song::create($data);

        return $song ?? null;
    }

    public function update(SongUpdateRequest $request, string $songId): ?Song
    {
        $user = Auth::user();
        $song = Song::where('id', $songId)->where('user_id', $user->id)->first();

        if (!$song) {
            throw new UnauthorizedException();
        }

        $data = $request->validated();

        if ($request->hasFile('cover_file')) {
            $data['cover_path'] = $request->file('cover_file')->store('covers', 'public');
        }

        $updated = $song->update($data);

        return $updated ? $song : null;
    }

    public function destroy(string $songId): bool
    {
        $user = Auth::user();
        $song = Song::where('id', $songId)->where('user_id', $user->id)->first();

        if (!$song) {
            throw new UnauthorizedException();
        }

        $res = $song->delete();
        Storage::disk('public')->delete($song->file_path);
        Storage::disk('public')->delete($song->cover_path);

        return $res ? true : false;
    }

}
