<?php

namespace App\Services;

use App\Facades\JWT;
use App\Models\Song;
use App\Http\Requests\SongPostRequest;

class SongService {


    public function create(SongPostRequest $request) {
        $user = JWT::user();
        $data = $request->validated();
        $data['user_id'] = $user->id;

        $song = Song::create( $data );

        if ($song) {
            return true;
        }
        return false;
    }


}
