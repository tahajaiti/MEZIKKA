<?php

namespace App\Services;

use App\Models\Like;
use App\Models\Playlist;
use App\Models\Song;
use Illuminate\Support\Facades\Auth;

class LikeService
{

    public function toggleLike(string $type, string $id): string
    {
        $user = Auth::user();

        $toLike = $type === 'playlist' ?
            Playlist::findOrFail($id) : Song::findOrFail($id);

        $existing = Like::where('user_id', $user->id)
            ->where('likeable_id', $id)
            ->where('likeable_type', get_class($toLike))
            ->first();

        if ($existing) {
            $existing->delete();
            return 'unliked';
        }
        $toLike->likes()->create(['user_id' => $user->id]);
        return 'liked';
    }


}
