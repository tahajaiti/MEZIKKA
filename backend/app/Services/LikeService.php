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

    public function getLikes(){
        $user = Auth::user();

        $likedPlaylists = $user->likes()->where('likeable_type', Playlist::class)
        ->with('likeable')
        ->get()->pluck('likeable');

        $likedSongs = $user->likes()->where('likeable_type', Song::class)
        ->with('likeable')
        ->get()->pluck('likeable');

        return [
            'songs' => $likedSongs,
            'playlists' => $likedPlaylists
        ];
    }

    public function getLikeCount(string $type, string $id){
        $user = Auth::user();

        $toLike = $type === 'playlist' ?
            Playlist::findOrFail($id) : Song::findOrFail($id);

        $totalLikes = $toLike->likes()->count();

        $userLiked = $user ? $toLike->likes()->where('user_id', $user->id)->exists() : false;

        return [
            'total_likes' => $totalLikes,
            'liked_by_user' => $userLiked
        ];
    }
}
