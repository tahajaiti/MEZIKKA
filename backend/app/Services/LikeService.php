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

    public function getLikes()
    {
        $user = Auth::user();

        $liked = $user->likes()->with('likeable')->get()->groupBy('likeable_type');

        return [
            'songs' => optional($liked[Song::class] ?? null)->pluck('likeable')->values(),
            'playlists' => optional($liked[Playlist::class] ?? null)->pluck('likeable')->values(),
        ];
    }

    public function getLike(string $type, string $id)
    {
        $user = Auth::user();
        $likeable = $this->getLikeable($type, $id);

        $userLiked = $user
            ? $likeable->likes()->where('user_id', $user->id)->exists()
            : false;

        return [
            'liked_by_user' => $userLiked,
        ];
    }

    public function getLikeCount(string $type, string $id)
    {
        $likeable = $this->getLikeable($type, $id);

        return [
            'total_likes' => $likeable->likes()->count(),
        ];
    }
}
