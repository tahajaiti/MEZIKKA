<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    //

    protected $fillable = [
        'title',
        'description',
        'cover',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function playlistItems()
    {
        return $this->hasMany(PlaylistItem::class);
    }

    public function songs()
    {
        return $this->belongsToMany(Song::class, 'playlist_items')
            ->withPivot('order')
            ->withTimestamps()
            ->orderBy('playlist_items.order');
    }

    public function likes()
{
    return $this->morphMany(Like::class, 'likeable');
}
}
