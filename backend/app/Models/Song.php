<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'file_path',
        'cover_path',
        'description',
        'metadata',
        'genre_id',
        'user_id'
    ];

    protected $casts = [
        'metadata' => 'json',
    ];

    protected $appends = [
        'liked_by_user',
    ];

    public function genre()
    {
        return $this->belongsTo(Genre::class, 'genre_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function playlists()
    {
        return $this->belongsToMany(Playlist::class, 'playlist_items')
            ->withPivot('order')
            ->withTimestamps();
    }

    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    protected function likedByUser(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->likes()->where('user_id', Auth::id())->exists()
        );
    }
}
