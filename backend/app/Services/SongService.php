<?php

namespace App\Services;

use App\Facades\JWT;
use App\Models\Song;
use App\Http\Requests\SongPostRequest;
use App\Http\Requests\SongUpdateRequest;

class SongService {


    public function create(SongPostRequest $request) {
        $user = JWT::user();
        $data = $request->validated();
        $data['user_id'] = $user->id;



        $song_path = $request->hasFile('song_file') ? $request->file('song_file')->store('songs', 'public') : null;
        $cover_path = $request->hasFile('cover_file') ? $request->file('cover_file')->store('covers', 'public') : null;

        $data['file_path'] = $song_path;
        $data['cover_path'] = $cover_path;

        $song = Song::create( $data );

        if ($song) {
            return $song;
        }
        return false;
    }

    public function update(SongUpdateRequest $request, string $songId) {
        $user = JWT::user();
        


    }


}