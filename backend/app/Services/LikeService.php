<?php

namespace App\Services;

use App\Models\Like;
use App\Models\Playlist;
use App\Models\Song;
use Illuminate\Support\Facades\Auth;
use InvalidArgumentException;

class LikeService
{

    protected function getLikeable(string $type, string $id)
    {
        return match ($type) {
            'playlist' => Playlist::findOrFail($id),
            'song' => Song::findOrFail($id),
            default => throw new InvalidArgumentException('Invalid type provided.'),
        };
    }

    public function index()
    {
        $user = Auth::user();

        $liked = $user->likes()->get()->groupBy('likeable_type');

        return [
            'songs' => optional($liked[Song::class] ?? null)->pluck('likeable_id'),
            'playlists' => optional($liked[Playlist::class] ?? null)->pluck('likeable_id'),
        ];
    }

    public function getLikedSongs()
    {
        $user = Auth::user();

        $liked = $user->likes()
            ->where('likeable_type', Song::class)
            ->with('likeable')
            ->paginate(2);

        $songs = $liked->getCollection()->map(function ($like) {
            return $like->likeable;
        });

        $liked->setCollection($songs);

        return $liked;
    }

    public function toggleLike(string $type, string $id): string
    {
        $user = Auth::user();
        $likeable = $this->getLikeable($type, $id);

        $existing = Like::where([
            'user_id' => $user->id,
            'likeable_id' => $likeable->id,
            'likeable_type' => get_class($likeable),
        ])->first();

        if ($existing) {
            $existing->delete();
            return 'unliked';
        }

        $likeable->likes()->create(['user_id' => $user->id]);
        return 'liked';
    }

    public function getLikeCount(string $type, string $id)
    {
        $likeable = $this->getLikeable($type, $id);

        return [
            'total_likes' => $likeable->likes()->count(),
        ];
    }
}
