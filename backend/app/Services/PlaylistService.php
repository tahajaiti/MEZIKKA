<?php

namespace App\Services;

use App\Models\Playlist;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\PlaylistPostRequest;

class PlaylistService {


    public function create(PlaylistPostRequest $request): ?Playlist{
        $user = Auth::user();

        $path = $request->hasFile('cover_file') ? $request->file('cover_file')->store('playlist/covers', 'public') : null;

        $playlist = Playlist::create([
            'title' => $request->title,
            'description' => $request->description,
            'cover' => $path,
            'user_id' => $user->id
        ]);

        return $playlist ? $playlist : null;

    }



}
