<?php

namespace App\Services;

use App\Facades\JWT;
use App\Models\Song;
use App\Http\Requests\SongPostRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\SongUpdateRequest;
use App\Exceptions\UnauthorizedException;

class SongService
{


    public function create(SongPostRequest $request): ?Song
    {
        $user = JWT::user();
        $data = $request->validated();
        $data['user_id'] = $user->id;

        $song_path = $request->hasFile('song_file') ? $request->file('song_file')->store('songs/files', 'public') : null;
        $cover_path = $request->hasFile('cover_file') ? $request->file('cover_file')->store('songs/covers', 'public') : null;

        $data['file_path'] = $song_path;
        $data['cover_path'] = $cover_path;

        $song = Song::create($data);

        return $song ? $song : null;
    }

    public function update(SongUpdateRequest $request, string $songId): ?Song
    {
        $user = JWT::user();
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
        $user = JWT::user();
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